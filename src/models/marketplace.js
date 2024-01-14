const Addresses = require("./../../contractAddresses.json")
const MarketplaceABI = require("./../../abis/Marketplace.json").abi
const { getConfig } = require("../config/config")

class Marketplace {
  constructor() {
    this.config = getConfig()

    if (
      Addresses.Marketplace[this.config.publicClient.chain.id] === undefined
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
        address: Addresses.Marketplace[this.config.publicClient.chain.id],
        abi: MarketplaceABI,
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
        address: Addresses.Marketplace[this.config.publicClient.chain.id],
        abi: MarketplaceABI,
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

  static getDealDetails(deal) {
    const unixTime = BigInt(Math.floor(Date.now() / 1000))
    let metadata
    try {
      metadata = JSON.parse(deal.metadata)
    } catch (e) {
      console.log("Error parsing metadata: ", e)
      metadata = {}
    }
    const elapsedTime = unixTime - deal.status.billingStart
    const totalTime = BigInt(deal.blockedBalance / deal.terms.pricePerSecond)
    const remainingTime = totalTime - elapsedTime
    const remainingBalance = remainingTime * deal.terms.pricePerSecond
    const pendingPayment =
      elapsedTime * deal.terms.pricePerSecond > deal.blockedBalance
        ? deal.blockedBalance
        : elapsedTime * deal.terms.pricePerSecond

    const calculatedEnd = Number(deal.status.billingStart + totalTime) * 1000
    const maxDate = 8640000000000000

    const d = new Date(calculatedEnd > maxDate ? maxDate : calculatedEnd)
    const pad2 = (n) => {
      return (n < 10 ? "0" : "") + n
    }
    const formattedCalculatedEnd =
      pad2(d.getDate()) +
      "/" +
      pad2(d.getMonth() + 1) +
      "/" +
      pad2(d.getFullYear()) +
      " · " +
      pad2(d.getHours()) +
      ":" +
      pad2(d.getMinutes())

    return {
      metadata,
      elapsedTime,
      totalTime,
      remainingTime,
      remainingBalance,
      pendingPayment,
      calculatedEnd,
      formattedCalculatedEnd,
    }
  }
}

module.exports = Marketplace
