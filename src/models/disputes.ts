import {Sdk} from "../config/sdk";
import {abi as DisputesABI} from "../../abis/Disputes.json"
import {Address} from "viem";

export class Disputes {
    private config

    constructor(sdkInstance: Sdk) {
        this.config = sdkInstance.config
    }

    async view(address: Address, functionName: string, args: any) {
        try {
            return await this.config.publicClient.readContract({
                address: address,
                abi: DisputesABI,
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
                abi: DisputesABI,
                functionName: functionName,
                args: args,
                account: this.config.walletClient.account.address,
            })
            return await this.config.walletClient.writeContract(request)
        } catch (error) {
            throw error
        }
    }
}