import Addresses from "../../contractAddresses.json";
import {Sdk, SdkConfig} from "../config/sdk";
import abi from "../../abis/Marketplace.json";
import {Deal, Offer, ProviderMetadata} from "../types";
import {
  CancelDealsParams,
  CreateDealParams,
  CreateDealsParams,
  CreateOfferParams,
  DealOperationParams,
  DeleteOfferParams,
  OfferOperationParams,
  ProviderOperationParams,
  UpdateOfferParams
} from "../types/modelTypes";

const ContractAddresses: typeof Addresses = Addresses;
const MarketplaceABI: typeof abi = abi;

/**
 * Class representing the Marketplace contract.
 */
export class Marketplace {
  private config: SdkConfig;

  /**
   * Creates an instance of Marketplace.
   * @param {Sdk} sdkInstance - An instance of the SDK containing configuration details.
   * @throws Will throw an error if the marketplace address is not found for the current network ID.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config;

    if (
      ContractAddresses.Marketplace[this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
        this.config.publicClient.chain!.id
      );
    }
  }

  /**
   * Calls a read-only function on the Marketplace contract.
   * @param {string} functionName - The name of the contract function to call.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The result of the contract function.
   * @throws Will throw an error if the contract read operation fails.
   */
  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.Marketplace[this.config.publicClient.chain!.id],
        abi: MarketplaceABI.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Executes a state-changing function on the Marketplace contract.
   * @param {string} functionName - The name of the contract function to execute.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The transaction receipt.
   * @throws Will throw an error if the contract execution fails.
   */
  async execute(functionName: string, args: any[]): Promise<any> {
    try {
      const {request} = await this.config.publicClient.simulateContract({
        address: ContractAddresses.Marketplace[this.config.publicClient.chain!.id],
        abi: MarketplaceABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
      });
      return await this.config.walletClient.writeContract(request);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new offer on the marketplace.
   * @param {CreateOfferParams} params - The parameters required to create an offer.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async createOffer({
      marketplaceId,
      maximumDeals,
      autoAccept,
      pricePerSecond,
      minDealDuration,
      billFullPeriods,
      singlePeriodOnly,
      metadata,
    }: CreateOfferParams): Promise<any> {
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

  /**
   * Updates an existing offer on the marketplace.
   * @param {UpdateOfferParams} params - The parameters required to update an offer.
   * @returns {Promise<any>} - The transaction receipt.
   */
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
    }: UpdateOfferParams): Promise<any> {
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

  /**
   * Deletes an offer from the marketplace.
   * @param {DeleteOfferParams} params - The parameters required to delete an offer.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async deleteOffer({marketplaceId, offerId}: DeleteOfferParams): Promise<any> {
    return await this.execute("deleteOffer", [marketplaceId, offerId])
  }

  /**
   * Creates a new deal on the marketplace.
   * @param {CreateDealParams} params - The parameters required to create a deal.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async createDeal({
      marketplaceId,
      resourceId,
      offerId,
      blockedBalance,
      sharedKeyCopy,
    }: CreateDealParams): Promise<any> {
    return await this.execute("createDeal", [
      marketplaceId,
      resourceId,
      offerId,
      blockedBalance,
      sharedKeyCopy,
    ])
  }

  /**
   * Creates multiple deals on the marketplace.
   * @param {CreateDealsParams} params - The parameters required to create multiple deals.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async createDeals({
      marketplaceId,
      resourceId,
      offersId,
      blockedBalance,
      sharedKeyCopies,
    }: CreateDealsParams): Promise<any> {
    return await this.execute("createDeals", [
      marketplaceId,
      resourceId,
      offersId,
      blockedBalance,
      sharedKeyCopies,
    ])
  }

  /**
   * Accepts a deal on the marketplace.
   * @param {DealOperationParams} params - The parameters required to accept a deal.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async acceptDeal({marketplaceId, dealId}: DealOperationParams): Promise<any> {
    return await this.execute("acceptDeal", [marketplaceId, dealId])
  }

  /**
   * Rejects a deal on the marketplace.
   * @param {DealOperationParams} params - The parameters required to reject a deal.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async rejectDeal({marketplaceId, dealId}: DealOperationParams): Promise<any> {
    return await this.execute("rejectDeal", [marketplaceId, dealId])
  }

  /**
   * Cancels a deal on the marketplace.
   * @param {DealOperationParams} params - The parameters required to cancel a deal.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async cancelDeal({marketplaceId, dealId}: DealOperationParams): Promise<any> {
    return await this.execute("cancelDeal", [marketplaceId, dealId])
  }

  /**
   * Cancels all deals for a given resource on the marketplace.
   * @param {CancelDealsParams} params - The parameters required to cancel all deals.
   * @returns {Promise<any>} - The transaction receipt.
   */
  async cancelAllDeals({marketplaceId, resourceId}: CancelDealsParams): Promise<any> {
    return await this.execute("cancelAllDeals", [marketplaceId, resourceId])
  }

  /**
   * Retrieves a deal by its ID from the marketplace.
   * @param {DealOperationParams} params - The parameters required to get a deal.
   * @returns {Promise<Deal | null>} - The deal information or null if not found.
   */
  async getDealById({marketplaceId, dealId}: DealOperationParams): Promise<Deal | null> {
    return await this.view("getDeal", [marketplaceId, dealId]) as Deal
  }

  /**
   * Retrieves an offer by its ID from the marketplace.
   * @param {OfferOperationParams} params - The parameters required to get an offer.
   * @returns {Promise<Offer | null>} - The offer information.
   */
  async getOfferById({marketplaceId, offerId}: OfferOperationParams): Promise<Offer | null> {
    return await this.view("getOffer", [marketplaceId, offerId]) as Offer
  }

  /**
   * Retrieves provider metadata from the marketplace.
   * @param {ProviderOperationParams} params - The parameters required to get the provider.
   * @returns {Promise<ProviderMetadata>} - The provider metadata.
   */
  async getProvider({marketplaceId, provider}: ProviderOperationParams): Promise<ProviderMetadata> {
    return await this.view("getProvider", [
      marketplaceId,
      provider
    ]) as ProviderMetadata
  }

  /**
   * Static method to calculate deal details based on the provided deal data.
   * @param {any} deal - The deal object containing necessary deal data.
   */
  static getDealDetails(deal: any) {
    const unixTime = BigInt(Math.floor(Date.now() / 1000))
    let metadata: { [index: string | number | symbol]: any }
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