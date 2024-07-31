import { Sdk, SdkConfig } from "../config/sdk";
import abi from "../../abis/Disputes.json"
import { Address } from "viem";

const DisputesABI: typeof abi = abi

/**
 * Class representing the Disputes contract interactions.
 */
export class Disputes {
    private config: SdkConfig

    /**
     * Creates an instance of Disputes.
     * @param {Sdk} sdkInstance - An instance of the SDK.
     */
    constructor(sdkInstance: Sdk) {
        this.config = sdkInstance.config
    }

    /**
     * Reads data from the Disputes contract.
     * @param {Address} address - The contract address.
     * @param {string} functionName - The name of the function to call.
     * @param {any} args - The arguments to pass to the function.
     * @returns {Promise<any>} The result of the contract call.
     * @throws Will throw an error if the contract call fails.
     */
    async view(address: Address, functionName: string, args: any): Promise<any> {
        try {
            return await this.config.publicClient.readContract({
                address: address,
                abi: DisputesABI.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
        }
    }

    /**
     * Executes a transaction on the Disputes contract.
     * @param {Address} address - The contract address.
     * @param {string} functionName - The name of the function to call.
     * @param {any} args - The arguments to pass to the function.
     * @returns {Promise<any>} The result of the transaction.
     * @throws Will throw an error if the transaction fails.
     */
    async execute(address: Address, functionName: string, args: any): Promise<any> {
        try {
            const { request } = await this.config.publicClient.simulateContract({
                address: address,
                abi: DisputesABI.abi,
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