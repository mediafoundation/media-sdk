import {Sdk, SdkConfig} from "../config/sdk";
import Addresses from "../../contractAddresses.json";
import abi from "../../abis/MarketplaceViewer.json"
import {Deal} from "../types";
import {Offer} from "../types";

const ContractAddresses: typeof Addresses = Addresses
const MarketplaceViewerABI: typeof abi = abi

type PaginationParams = {
    marketplaceId: string
    start?: number
    steps?: number
}

type DealPaginationParams = {
    marketplaceId: string
    address: string
    isProvider?: boolean
    start?: number
    steps?: number
}

export class MarketplaceViewer {
  private config: SdkConfig
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      ContractAddresses.MarketplaceViewer[this.config.publicClient.chain!.id] ===
      undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
  }

  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.MarketplaceViewer[this.config.publicClient.chain!.id],
        abi: MarketplaceViewerABI.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async getPaginatedOffers({ marketplaceId, start = 0, steps = 20 }: PaginationParams): Promise<Offer[]> {
    return await this.view("getPaginatedOffers", [marketplaceId, start, steps]) as Offer[]
  }

  async getAllOffersPaginating({ marketplaceId, start = 0, steps = 20 }: PaginationParams): Promise<Offer[]> {
    let offers: any[] = []
    let _steps = BigInt(steps)
    let _start = BigInt(start)

    while (true) {
      let result = await this.view("getPaginatedOffers", [
        marketplaceId,
        _start,
        _steps,
      ])

      let fetchedOffers = result[0]
      let lastAccessedId = BigInt(result[1])
      let totalItems = BigInt(result[3])

      offers.push(...fetchedOffers)

      // Check if all offers have been fetched
      if (
        lastAccessedId >= totalItems - BigInt(1) ||
        fetchedOffers.length === 0
      ) {
        break
      }

      // Update _start for the next iteration
      _start = lastAccessedId + BigInt(1)
    }

    return offers as Offer[]
  }

  async getPaginatedDeals({
    marketplaceId,
    address,
    isProvider = false,
    start = 0,
    steps = 20,
  }: DealPaginationParams): Promise<Deal[]> {
    return await this.view("getPaginatedDeals", [
      marketplaceId,
      address,
      isProvider,
      start,
      steps,
    ]) as Deal[]
  }

  async getAllDealsPaginating({
    marketplaceId,
    address,
    isProvider = false,
    start = 0,
    steps = 20,
  }: DealPaginationParams): Promise<Deal[]> {
    let deals: any[] = []

    let _steps = BigInt(steps)
    let _start = BigInt(start)

    let result = await this.view("getPaginatedDeals", [
      marketplaceId,
      address,
      isProvider,
      _start,
      _steps,
    ])
    deals.push(...result[0])

    if (result[1] > deals.length) {
      let totalDeals = result[1]
      for (let i = BigInt(1); i * _steps < totalDeals; i++) {
        let result = await this.view("getPaginatedDeals", [
          marketplaceId,
          address,
          isProvider,
          _start + i * _steps,
          _steps,
        ])
        deals.push(...result[0])
      }

      if (totalDeals > deals.length) {
        let result = await this.view("getPaginatedDeals", [
          marketplaceId,
          address,
          isProvider,
          _start + totalDeals,
          totalDeals - BigInt(deals.length),
        ])
        deals.push(...result[0])
      }
    }

    return deals as Deal[]
  }
}