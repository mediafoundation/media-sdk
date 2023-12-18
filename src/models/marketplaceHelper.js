const addresses = require("../../contractAddresses.json");
const MarketplaceHelperAbi = require("./../../abis/MarketplaceHelper.json").abi;
const { getConfig } = require("../config/config");
const Uniswap = require("../utils/uniswap");

class MarketplaceHelper {
  constructor() {
    this.config = getConfig();

    if (
      addresses.MarketplaceHelper[this.config.publicClient.chain.id] ===
      undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain.id
      );
    }
  }

  wethToMedia() {
    return Uniswap.encodePath([
      addresses.WETH9[this.config.publicClient.chain.id], 
      addresses.MediaERC20[this.config.publicClient.chain.id]
    ], [500]);
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
  async addLiquidityAndRegisterWithETH({
    marketplaceId,
    label,
    publicKey,
    minMediaAmountOut,
    slippage,
    amount,
  }) {
    return await this.execute(
      "addLiquidityAndRegisterWithETH",
      [marketplaceId, label, publicKey, minMediaAmountOut, this.wethToMedia(), slippage],
      amount
    );
  }

  async swapAndCreateDealWithETH({
    marketplaceId,
    resourceId,
    offerId,
    sharedKeyCopy,
    minMediaAmountOut,
    amount,
  }) {
    return await this.execute(
      "swapAndCreateDealWithETH",
      [
        marketplaceId,
        resourceId,
        offerId,
        sharedKeyCopy,
        minMediaAmountOut,
        this.wethToMedia(),
      ],
      amount
    );
  }
}

module.exports = MarketplaceHelper;
