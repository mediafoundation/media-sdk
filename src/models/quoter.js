const QuoterV2ABI = require("@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json").abi
const IUniswapV3PoolABI =
  require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi
const { Token } = require("@uniswap/sdk-core")
const { Pool, Position, FeeAmount } = require("@uniswap/v3-sdk")

const Addresses = require("./../../contractAddresses.json")
const { getConfig } = require("../config/config")

const { formatUnits } = require("viem")

class Quoter {
  constructor() {
    this.config = getConfig()
    this.chainId = this.config.publicClient.chain.id
    this.MEDIA_TOKEN = new Token(
      this.chainId,
      Addresses.MediaERC20[this.chainId],
      18,
      "MEDIA",
      "Media Token"
    )
    this.WETH_TOKEN = new Token(
      this.chainId,
      Addresses.WETH9[this.chainId],
      18,
      "WETH",
      "Wrapped Ether"
    )
    if (Addresses.QuoterV2[this.chainId] === undefined) {
      throw new Error(
        "Quoter address not found for network id: " + this.chainId
      )
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: Addresses.QuoterV2[this.chainId],
        abi: QuoterV2ABI,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async viewPool(address, functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: address,
        abi: IUniswapV3PoolABI,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async getPoolData(address) {
    try {
      const [liquidity, slot0] = await Promise.all([
        this.viewPool(address, "liquidity", []),
        this.viewPool(address, "slot0", []),
      ])
      return {
        liquidity: liquidity,
        slot0: slot0,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async quote(tokens) {
    const quotedAmountOut = await this.view("quoteExactInputSingle", [
      {
        tokenIn: tokens.in.address,
        tokenOut: tokens.out.address,
        amountIn: tokens.amountIn,
        fee: tokens.poolFee,
        sqrtPriceLimitX96: 0,
      },
    ])
    return quotedAmountOut[0]
  }

  async getQuote(inputToken, amountIn, outputToken) {
    const initialState = {
      quote: BigInt(0),
      fee: 0,
      path: [],
      fees: [],
    }
    const poolFees = [100, 500, 3000, 10000]

    const generateTradeParams = ({
      inputToken,
      amountIn,
      outputToken,
      poolFee,
    }) => ({
      in: inputToken,
      amountIn: amountIn,
      out: outputToken,
      poolFee: poolFee,
    })
    if (!amountIn) {
      return { quote: BigInt(0), fee: 0, route: "None", path: [], fees: [] }
    }
    if (inputToken.address === outputToken.address) {
      return { quote: BigInt(String(amountIn)), fee: 0, route: "None", path: [], fees: [] }
    }

    let best = { ...initialState }
    let bestViaWeth = { ...initialState }

    const getBestQuote = async (inToken, outToken, amount, updateBest) => {
      for (const fee of poolFees) {
        const tradeParams = generateTradeParams({
          inputToken: inToken,
          amountIn: amount,
          outputToken: outToken,
          poolFee: fee,
        })
        try {
          const quote = await this.quote(tradeParams)
          if (quote > updateBest.quote) {
            updateBest.quote = quote
            updateBest.fee = fee
            updateBest.route =
              inToken.symbol === outToken.symbol
                ? ""
                : `${inToken.symbol} -> ${outToken.symbol} (${fee})`
            updateBest.path = [inToken, outToken]
            updateBest.fees = [fee]
          }
        } catch (_) {}
      }
    }

    // Direct quote from inputToken to outputToken
    await getBestQuote(inputToken, outputToken, amountIn, best)

    // Quote from inputToken to WETH
    await getBestQuote(inputToken, this.WETH_TOKEN, amountIn, bestViaWeth)

    // If quote via WETH is possible, check for a quote from WETH to outputToken
    if (bestViaWeth.quote > 0) {
      let bestWethToOutput = { ...initialState }
      await getBestQuote(
        this.WETH_TOKEN,
        outputToken,
        bestViaWeth.quote,
        bestWethToOutput
      )

      if (bestWethToOutput.quote > best.quote) {
        return {
          quote: bestWethToOutput.quote,
          fee: bestViaWeth.fee, // Fee for inputToken to WETH
          path: [inputToken, this.WETH_TOKEN, outputToken],
          fees: [bestViaWeth.fee, bestWethToOutput.fee],
        }
      }
    }

    return best
  }

  fancyRoute = (path, fees) => {
    if (!path.length || path.length !== fees.length + 1) {
      return ""
    }

    return path
      .map((token, index) => {
        return index < path.length - 1
          ? `${token.symbol} (${fees[index] / 10000}%)`
          : token.symbol
      })
      .join(" -> ")
  }

  async mintAmounts(liquidity, token0, token1, fee = FeeAmount.LOW) {
    try {
      const tickLower = -887000
      const tickUpper = 887000

      const poolAddress = Pool.getAddress(
        token0,
        token1,
        fee,
        undefined,
        Addresses.UniswapV3Factory[this.chainId]
      )
      let poolData = await this.getPoolData(poolAddress)

      const pool = new Pool(
        token0,
        token1,
        fee,
        poolData.slot0[0].toString(),
        0,
        poolData.slot0[1],
        []
      )
      const liquidityPosition = new Position({
        pool: pool,
        liquidity: liquidity,
        tickLower: tickLower,
        tickUpper: tickUpper,
      })

      return {
        token0: liquidityPosition.pool.token0,
        token1: liquidityPosition.pool.token1,
        ...liquidityPosition.mintAmounts,
      }
    } catch (error) {
      console.log(error)
      return {
        token0: token0,
        token1: token1,
        amount0: 0,
        amount1: 0,
      }
    }
  }

  //abstract calculate so it can be reused
  async calculate(liquidity, inputToken, fee = FeeAmount.LOW) {

    let { token0, token1, amount0, amount1 } = await this.mintAmounts(
      liquidity,
      this.MEDIA_TOKEN,
      this.WETH_TOKEN,
      fee
    )
    let required0Half = await this.getQuote(token0, amount0, inputToken)
    let required1Half = await this.getQuote(token1, amount1, inputToken)

    return {
      requiredAmounts: {
        amount0: formatUnits(amount0.toString(), token0.decimals),
        amount1: formatUnits(amount1.toString(), token1.decimals),
        token0: token0.symbol,
        token1: token1.symbol
      },
      totalRequired: required0Half.quote + required1Half.quote,
    }
  }

}

module.exports = Quoter