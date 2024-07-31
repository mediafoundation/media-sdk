import Addresses from "../../contractAddresses.json";
import {Sdk, SdkConfig} from "../config/sdk";
import abi from "../../abis/Marketplace.json"
import {Deal, ProviderMetadata} from "../types";
import {
  CancelDealsParams,
  CreateDealParams,
  CreateDealsParams,
  DealOperationParams,
  DeleteOfferParams, InitializeMarketplaceParams, OfferOperationParams, ProviderOperationParams,
  UpdateOfferParams
} from "../types/modelTypes";

const ContractAddresses: typeof Addresses = Addresses
const MarketplaceABI: typeof abi = abi

interface CreateOfferParams  {
  marketplaceId: number
  maximumDeals: number
  autoAccept: boolean
  pricePerSecond: number
  minDealDuration: number
  billFullPeriods: boolean
  singlePeriodOnly: boolean
  metadata: string
}

export class Marketplace {
  private config: SdkConfig
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      ContractAddresses.Marketplace[this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
  }

  async view(functionName: string, args: any[]) {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.Marketplace[this.config.publicClient.chain!.id],
        abi: MarketplaceABI.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async execute(functionName: string, args: any[]) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: ContractAddresses.Marketplace[this.config.publicClient.chain!.id],
        abi: MarketplaceABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
      })
      return await this.config.walletClient.writeContract(request)
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
  }: CreateOfferParams) {
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
  }: UpdateOfferParams) {
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

  async deleteOffer({ marketplaceId, offerId }: DeleteOfferParams) {
    return await this.execute("deleteOffer", [marketplaceId, offerId])
  }

  async createDeal({
    marketplaceId,
    resourceId,
    offerId,
    blockedBalance,
    sharedKeyCopy,
  }: CreateDealParams) {
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
  }: CreateDealsParams) {
    return await this.execute("createDeals", [
      marketplaceId,
      resourceId,
      offersId,
      blockedBalance,
      sharedKeyCopies,
    ])
  }

  async acceptDeal({ marketplaceId, dealId }: DealOperationParams) {
    return await this.execute("acceptDeal", [marketplaceId, dealId])
  }

  async rejectDeal({ marketplaceId, dealId }: DealOperationParams) {
    return await this.execute("rejectDeal", [marketplaceId, dealId])
  }

  async cancelDeal({ marketplaceId, dealId }: DealOperationParams) {
    return await this.execute("cancelDeal", [marketplaceId, dealId])
  }

  async cancelAllDeals({ marketplaceId, resourceId }: CancelDealsParams) {
    return await this.execute("cancelAllDeals", [marketplaceId, resourceId])
  }

  async getDealById({ marketplaceId, dealId }: DealOperationParams): Promise<Deal | null> {
    return await this.view("getDeal", [marketplaceId, dealId]) as Deal
  }

  async getOfferById({marketplaceId, offerId}: OfferOperationParams) {
    await this.view("getOffer", [marketplaceId, offerId])
  }

  async initializeMarketplace({ requiredStake, marketFeeTo, marketFeeRate }: InitializeMarketplaceParams) {
    return await this.execute("initializeMarketplace", [
      requiredStake,
      marketFeeTo,
      marketFeeRate,
    ])
  }

  async getProvider({marketplaceId, provider}: ProviderOperationParams): Promise<ProviderMetadata> {
    return await this.view("getProvider", [
      marketplaceId,
      provider
    ]) as ProviderMetadata
  }

  static getDealDetails(deal: any) {
    const unixTime = BigInt(Math.floor(Date.now() / 1000))
    let metadata: {[index: string | number | symbol]: any}
    try {
      metadata = JSON.parse(deal.terms.metadata)
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