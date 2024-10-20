import {Sdk, SdkConfig} from "../config/sdk";
import abi from "../../abis/RatingSystem.json"
import Addresses from "../../contractAddresses.json"
import {GetAverageRatingParams, RateProviderParams, RemoveRatingParams} from "../types/modelTypes"

const RatingSystemABI: typeof abi = abi
const ContractAddresses: typeof Addresses = Addresses;

export class RatingSystem {
    private config: SdkConfig
    constructor(sdkInstance: Sdk) {
        this.config = sdkInstance.config
    }

    async view(functionName: string, args: any) {
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
            const { request } = await this.config.publicClient.simulateContract({
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

    async rateProvider({marketplaceId, dealId, rating}: RateProviderParams) {
        return await this.execute("rateProvider", [marketplaceId, dealId, rating])
    }

    async removeRating({marketplaceId, dealId}: RemoveRatingParams) {
        return await this.execute("removeRating", [marketplaceId, dealId])
    }

    async getAverageRating({marketplaceId, provider}: GetAverageRatingParams) {
        return await this.view("getAverageRating", [marketplaceId, provider])
    }
}