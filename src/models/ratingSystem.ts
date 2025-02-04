import Addresses from "../../contractAddresses.json";
import { Sdk, SdkConfig } from "../config/sdk";
import abi from "../../abis/RatingSystem.json";
import {GetAverageRatingParams, RateProviderParams, Rating, RemoveRatingParams} from "../types/modelTypes"

const ContractAddresses: typeof Addresses = Addresses;
const RatingSystemABI: typeof abi = abi;

export class RatingSystem {
  private config: SdkConfig;

  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config;

    if (
        ContractAddresses.RatingSystem[this.config.publicClient.chain!.id] ===
        undefined
    ) {
      console.error(
          "RatingSystem address not found for network id: " +
          this.config.publicClient.chain!.id
      );
    }
  }

  async view(functionName: string, args: any): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.RatingSystem[this.config.publicClient.chain!.id],
        abi: RatingSystemABI.abi,
        functionName: functionName,
        args: args
      })
    } catch (error) {
      throw error
    }
  }

  async execute(functionName: string, args: any) {
    try {
      const {request} = await this.config.publicClient.simulateContract({
        address: ContractAddresses.RatingSystem[this.config.publicClient.chain!.id],
        abi: RatingSystemABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account!.address,
      })
      return await this.config.walletClient.writeContract(request)
    } catch (error) {
      throw error
    }
  }

  /**
   * Rates a provider for a specific deal in a marketplace.
   * @param {RateProviderParams} params - The parameters for rating a provider.
   * @param {string | number | bigint} params.marketplaceId - The ID of the marketplace.
   * @param {string | number | bigint} params.dealId - The ID of the deal.
   * @param {string | number | bigint} params.rating - The rating to be given.
   * @returns {Promise<any>} - The result of the contract execution.
   */
  async rateProvider({marketplaceId, dealId, rating}: RateProviderParams) {
    return await this.execute("rateProvider", [marketplaceId, dealId, rating])
  }

  /**
   * Removes a rating for a specific deal in a marketplace.
   * @param {RemoveRatingParams} params - The parameters for removing a rating.
   * @param {string | number | bigint} params.marketplaceId - The ID of the marketplace.
   * @param {string | number | bigint} params.dealId - The ID of the deal.
   * @returns {Promise<any>} - The result of the contract execution.
   */
  async removeRating({marketplaceId, dealId}: RemoveRatingParams) {
    return await this.execute("removeRating", [marketplaceId, dealId])
  }

  /**
   * Retrieves the average rating of a provider in a marketplace calculated in the blockchain.
   * @param {GetAverageRatingParams} params - The parameters for getting the average rating.
   * @param {string | number | bigint} params.marketplaceId - The ID of the marketplace.
   * @param {Address} params.provider - The account of the provider.
   * @returns {Promise<any>} - The average rating of the provider.
   */
  async getAverageRating({marketplaceId, provider}: GetAverageRatingParams) {
    return await this.view("getAverageRating", [marketplaceId, provider])
  }

  /**
   * Retrieves the rating details of a provider in a marketplace.
   * @param {GetAverageRatingParams} params - The parameters for getting the provider rating.
   * @param {string | number | bigint} params.marketplaceId - The ID of the marketplace.
   * @param {Address} params.provider - The account of the provider.
   * @returns {Promise<Rating>} - An object containing the sum of ratings and the count of ratings.
   */
  async getProviderRating({marketplaceId, provider}: GetAverageRatingParams): Promise<Rating> {
    const rating = await this.view("providerRatings", [marketplaceId, provider])

    return {
        sum: BigInt(rating[0]),
        count: BigInt(rating[1])
    }
  }
}
