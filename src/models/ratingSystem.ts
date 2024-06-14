import {Sdk, SdkConfig} from "../config/sdk";
import {Address} from "viem";
import RatingSystemABI from "../../abis/RatingSystem.json"

export class RatingSystem {
    private config: SdkConfig
    constructor(sdkInstance: Sdk) {
        this.config = sdkInstance.config
    }

    async view(address: Address, functionName: string, args: any) {
        try {
            return await this.config.publicClient.readContract({
                address: address,
                abi: RatingSystemABI.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
        }
    }

    async execute(address: Address, functionName: string, args: any) {
        try {
            const { request } = await this.config.publicClient.simulateContract({
                address: address,
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
}