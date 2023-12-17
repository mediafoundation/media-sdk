const addresses = require("../../contractAddresses.json");
const MarketplaceHelperAbi = require("./../../abis/MarketplaceHelper.json").abi;
const { getConfig } = require("../config/config");
const Uniswap = require("../utils/uniswap");

class MarketplaceHelper {
  constructor() {
    this.config = getConfig();

    if (addresses.MarketplaceHelper[this.config.publicClient.chain.id] === undefined) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain.id
      );
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: addresses.MarketplaceHelper[this.config.publicClient.chain.id],
        abi: MarketplaceHelperAbi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }
  async execute(functionName, args, value = 0) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: addresses.MarketplaceHelper[this.config.publicClient.chain.id],
        abi: MarketplaceHelperAbi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
        value: value,
      });
      const hash = await this.config.walletClient.writeContract(request);
      return hash;
    } catch (error) {
      throw error;
    }
  }
    /*     
solidity function

    function addLiquidityAndRegisterWithETH(
        uint256 marketplaceId,
        string memory label,
        string memory publicKey,
        uint256 minMediaAmountOut,
        bytes memory path,
        uint256 slippage // 500 = 0.5%
    ) external payable returns (
        uint nftId, 
        uint128 liquidity, 
        uint amount0, 
        uint amount1
	  ) { */
  async addLiquidityAndRegisterWithETH({ marketplaceId, label, publicKey, minMediaAmountOut, slippage, amount }) {

    let path = Uniswap.encodePath([
      addresses.WETH9[this.config.publicClient.chain.id], 
      addresses.MediaERC20[this.config.publicClient.chain.id]
    ], [500]);

    return await this.execute("addLiquidityAndRegisterWithETH", [marketplaceId, label, publicKey, minMediaAmountOut, path, slippage], amount);
  }

}

module.exports = MarketplaceHelper;
