import {Sdk, SdkConfig} from "../config/sdk";
import Addresses from "../../contractAddresses.json";
import abi from "../../abis/MarketplaceViewer.json"
import {Deal} from "../types";
import {Offer} from "../types";
import {DealPaginationParams, PaginationParams} from "../types/modelTypes";

const ContractAddresses: typeof Addresses = Addresses
const MarketplaceViewerABI: typeof abi = abi


/**
 * Class representing the MarketplaceViewer contract.
 */
export class MarketplaceViewer {
  private config: SdkConfig

  /**
   * Creates an instance of MarketplaceViewer.
   * @param {Sdk} sdkInstance - An instance of the SDK containing configuration details.
   * @throws Will throw an error if the MarketplaceViewer address is not found for the current network ID.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      ContractAddresses.MarketplaceViewer[this.config.publicClient.chain!.id] ===
      undefined
    ) {
      console.error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
  }

  /**
   * Calls a read-only function on the MarketplaceViewer contract.
   * @param {string} functionName - The name of the contract function to call.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The result of the contract function.
   * @throws Will throw an error if the contract read operation fails.
   */
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

  /**
   * Retrieves paginated offers from the marketplace.
   * @param {PaginationParams} params - The parameters for pagination (marketplaceId, start, steps).
   * @returns {Promise<Offer[]>} - A promise that resolves to an array of offers.
   */
  async getPaginatedOffers({ marketplaceId, start = 0, steps = 20 }: PaginationParams): Promise<Offer[]> {
    return await this.view("getPaginatedOffers", [marketplaceId, start, steps]) as Offer[]
  }

  /**
   * Retrieves all offers from the marketplace by paginating through them.
   * @param {PaginationParams} params - The parameters for pagination (marketplaceId, start, steps).
   * @returns {Promise<Offer[]>} - A promise that resolves to an array of all offers.
   */
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

  /**
   * Retrieves paginated deals from the marketplace.
   * @param {DealPaginationParams} params - The parameters for deal pagination (marketplaceId, address, isProvider, start, steps).
   * @returns {Promise<Deal[]>} - A promise that resolves to an array of deals.
   */
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

  /**
   * Retrieves all deals from the marketplace by paginating through them.
   * @param {DealPaginationParams} params - The parameters for deal pagination (marketplaceId, address, isProvider, start, steps).
   * @returns {Promise<Deal[]>} - A promise that resolves to an array of all deals.
   */
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