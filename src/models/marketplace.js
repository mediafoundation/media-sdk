const addresses = require("./../../contractAddresses.json")
const MarketplaceAbi = require("./../../abis/Marketplace.json")
const { getConfig } = require("../config/config")

class Marketplace {
  constructor() {
    this.config = getConfig()

    if (
      addresses.Marketplace[this.config.publicClient.chain.id] === undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain.id
      )
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: addresses.Marketplace[this.config.publicClient.chain.id],
        abi: MarketplaceAbi.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async execute(functionName, args) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: addresses.Marketplace[this.config.publicClient.chain.id],
        abi: MarketplaceAbi.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
      })
      const hash = await this.config.walletClient.writeContract(request)
      return hash
    } catch (error) {
      throw error
    }
  }

  async createOffer({
    marketplaceId,
    maximumDeals,
    autoAccept,
    pricePerSecond,
    minDealDuration,
    billFullPeriods,
    singlePeriodOnly,
    metadata,
  }) {
    return await this.execute("createOffer", [
      marketplaceId,
      maximumDeals,
      autoAccept,
      pricePerSecond,
      minDealDuration,
      billFullPeriods,
      singlePeriodOnly,
      metadata,
    ])
  }

  async updateOffer({
    marketplaceId,
    offerId,
    maximumDeals,
    autoAccept,
    pricePerSecond,
    minDealDuration,
    billFullPeriod,
    singlePeriodOnly,
    metadata,
  }) {
    return await this.execute("updateOffer", [
      marketplaceId,
      offerId,
      maximumDeals,
      autoAccept,
      pricePerSecond,
      minDealDuration,
      billFullPeriod,
      singlePeriodOnly,
      metadata,
    ])
  }

  async deleteOffer({ marketplaceId, offerId }) {
    return await this.execute("deleteOffer", [marketplaceId, offerId])
  }

  async createDeal({
    marketplaceId,
    resourceId,
    offerId,
    blockedBalance,
    sharedKeyCopy,
  }) {
    return await this.execute("createDeal", [
      marketplaceId,
      resourceId,
      offerId,
      blockedBalance,
      sharedKeyCopy,
    ])
  }

  async createDeals({
    marketplaceId,
    resourceId,
    offersId,
    blockedBalance,
    sharedKeyCopies,
  }) {
    return await this.execute("createDeals", [
      marketplaceId,
      resourceId,
      offersId,
      blockedBalance,
      sharedKeyCopies,
    ])
  }

  async acceptDeal({ marketplaceId, dealId }) {
    return await this.execute("acceptDeal", [marketplaceId, dealId])
  }

  async rejectDeal({ marketplaceId, dealId }) {
    return await this.execute("rejectDeal", [marketplaceId, dealId])
  }

  async cancelDeal({ marketplaceId, dealId }) {
    return await this.execute("cancelDeal", [marketplaceId, dealId])
  }

  async cancelAllDeals({ marketplaceId, resourceId }) {
    return await this.execute("cancelAllDeals", [marketplaceId, resourceId])
  }

  async getDealById({ marketplaceId, dealId }) {
    return await this.view("getDeal", [marketplaceId, dealId])
  }

  async initializeMarketplace({ requiredStake, marketFeeTo, marketFeeRate }) {
    return await this.execute("initializeMarketplace", [
      requiredStake,
      marketFeeTo,
      marketFeeRate,
    ])
  }
}

module.exports = Marketplace
