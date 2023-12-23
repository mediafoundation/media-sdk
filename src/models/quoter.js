const QuoterV2 = require('@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json');
const { parseUnits, formatUnits }  = require('viem')

const addresses = require("./../../contractAddresses.json");
const { getConfig } = require("../config/config");

class Quoter {
  constructor() {
    this.config = getConfig();

    if (
      addresses["QuoterV2"][this.config.publicClient.chain.id] ===
      undefined
    ) {
      throw new Error(
        "Quoter address not found for network id: " +
          this.config.publicClient.chain.id
      );
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: addresses["QuoterV2"][this.config.publicClient.chain.id],
        abi: QuoterV2.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  async quote(tokens) {
    const quotedAmountOut = await this.view("quoteExactInputSingle", [{
      tokenIn: tokens.in.address,
      tokenOut: tokens.out.address,
      amountIn: parseUnits(
        tokens.amountIn,
        tokens.in.decimals
      ).toString(),
      fee: tokens.poolFee,
      sqrtPriceLimitX96: 0,
    }]);
    console.log(quotedAmountOut);
    return formatUnits(quotedAmountOut[0], tokens.out.decimals)
  }
  
}

module.exports = Quoter;