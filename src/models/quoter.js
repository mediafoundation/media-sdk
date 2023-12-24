const QuoterV2 = require("@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json");
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;
const { Token, WETH9 } = require("@uniswap/sdk-core");
const { Pool, Position, FeeAmount } = require("@uniswap/v3-sdk");

const Addresses = require("./../../contractAddresses.json");
const { getConfig } = require("../config/config");

class Quoter {
  constructor() {
    this.config = getConfig();
    this.chainId = this.config.publicClient.chain.id;
    this.MEDIA_TOKEN = new Token(
      this.chainId,
      Addresses.MediaERC20[this.chainId],
      18,
      "MEDIA",
      "Media Token"
    );
    this.WETH_TOKEN = () => {
      if(this.chainId == 84531) {
        return new Token(
          84531,
          Addresses.WETH9["84531"],
          18,
          "WETH",
          "Wrapped Ether"
        )
      } else {
        return WETH9[this.chainId];
      }
    }
    if (Addresses["QuoterV2"][this.chainId] === undefined) {
      throw new Error(
        "Quoter address not found for network id: " + this.chainId
      );
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: Addresses["QuoterV2"][this.chainId],
        abi: QuoterV2.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }  
  
  async viewPool(address, functionName, args) {
    try {
      console.log(this.config.publicClient)
      return await this.config.publicClient.readContract({
        address: address,
        abi: IUniswapV3PoolABI,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  async getPoolData(address) {
    try {
      const [liquidity, slot0] = await Promise.all([
        this.viewPool(address, "liquidity", []),
        this.viewPool(address, "slot0", []),
      ]);
      return {
        liquidity: liquidity,
        slot0: slot0
      }
    } catch (error) {
      console.log(error);
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
    ]);
    console.log(quotedAmountOut);
    return quotedAmountOut[0];
  }

  async getQuote(inputToken, amountIn, outputToken) {
    const initialState = { quote: 0, fee: 0, route: "" };
    const poolFees = [100, 500, 3000, 10000];

    const generateTradeParams = ({
      inputToken,
      amountIn,
      outputToken,
      poolFee,
    }) => ({
      in: inputToken,
      amountIn: BigInt(amountIn),
      out: outputToken,
      poolFee: poolFee,
    });
    console.log("inputToken.address",inputToken.address)
    console.log("outputToken.address",outputToken.address)
    if (!amountIn || inputToken.address === outputToken.address) {
      return { quote: BigInt(amountIn), fee: 0, route: "None" };
    }

    let best = { ...initialState };
    let bestViaWeth = { ...initialState };

    const getBestQuote = async (inToken, outToken, amount, updateBest) => {
      for (const fee of poolFees) {
        const tradeParams = generateTradeParams({
          inputToken: inToken,
          amountIn: amount,
          outputToken: outToken,
          poolFee: fee,
        });
        try {
          const quote = await this.quote(tradeParams);
          if (quote > updateBest.quote) {
            updateBest.quote = quote;
            updateBest.fee = fee;
            updateBest.route =
              inToken.symbol === outToken.symbol
                ? ""
                : `${inToken.symbol} -> ${outToken.symbol} (${fee})`;
          }
        } catch (_) {}
      }
    };

    // Direct quote from inputToken to outputToken
    await getBestQuote(inputToken, outputToken, amountIn, best);

    // Quote from inputToken to WETH
    await getBestQuote(inputToken, this.WETH_TOKEN(), amountIn, bestViaWeth);

    // If quote via WETH is possible, check for a quote from WETH to outputToken
    if (bestViaWeth.quote > 0) {
      let bestWethToOutput = { ...initialState };
      await getBestQuote(
        this.WETH_TOKEN(),
        outputToken,
        bestViaWeth.quote,
        bestWethToOutput
      );

      if (bestWethToOutput.quote > best.quote) {
        return {
          quote: bestWethToOutput.quote,
          fee: bestViaWeth.fee, // Fee for inputToken to WETH
          route: `${inputToken.symbol} -> ${this.WETH_TOKEN().symbol} (${
            bestViaWeth.fee
          }) -> ${outputToken.symbol} (${bestWethToOutput.fee})`,
        };
      }
    }

    return best;
  }

  async uniswapCalculator(
    liquidity,
    token0,
    token1,
    fee = FeeAmount.LOW
  ){
    try {
      const tickLower = -887000;
      const tickUpper = 887000;
    
      const poolAddress = Pool.getAddress(token0, token1, fee, undefined, Addresses.UniswapV3Factory[this.chainId]);
      console.log("poolAddress", token0, token1, fee,poolAddress);
      let poolData = await this.getPoolData(poolAddress);
      console.log("poolData", poolData);
    
      const pool = new Pool(
        token0,
        token1,
        fee,
        poolData.slot0[0].toString(),
        0,
        poolData.slot0[1],
        []
      );
      const liquidityPosition = new Position({
        pool: pool,
        liquidity: liquidity,
        tickLower: tickLower,
        tickUpper: tickUpper,
      });
    
      return {
        token0: liquidityPosition.pool.token0,
        token1: liquidityPosition.pool.token1,
        ...liquidityPosition.mintAmounts
      }
    } catch (error) {
      console.log(error);
      return {
        token0: token0,
        token1: token1,
        amount0: 0,
        amount1: 0
      }
    }
  }
}

module.exports = Quoter;