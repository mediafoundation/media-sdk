const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;

const { getConfig } = require("../config/config");

class Pool {
  constructor() {
    this.config = getConfig();
  }

  async view(address, functionName, args) {
    try {
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
/*   const [liquidity, slot0] =
  await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]) */
  async getPoolData(address) {
    try {
      const [liquidity, slot0] = await Promise.all([
        this.view(address, "liquidity", []),
        this.view(address, "slot0", []),
      ]);
      return {
        liquidity: liquidity,
        slot0: slot0
      }
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = Pool;