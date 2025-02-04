import Addresses from "../../contractAddresses.json";
import {Sdk} from "../config/sdk";
import abi from "../../abis/WETH9.json"

const WETH9ABI: typeof abi = abi
const ContractAddresses: typeof Addresses = Addresses


export class WETH9 {
  private config
  private chainId

  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
    this.chainId = this.config.publicClient.chain.id

    if (ContractAddresses.WETH9[this.chainId] === undefined) {
      console.error(
        "WETH9 address not found for network id: " + this.chainId
      )
    }
  }

  /**
   * Executes a transaction on the WETH9 contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @param {bigint} value - The value to send with the transaction.
   * @returns {Promise<any>} The result of the transaction.
   * @throws Will throw an error if the transaction fails.
   */
  async execute(functionName: string, args: any[], value: bigint = 0n): Promise<any> {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: ContractAddresses.WETH9[this.chainId],
        abi: WETH9ABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
        value: value,
      })
      return await this.config.walletClient.writeContract(request)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Calls a read-only function on the WETH9 contract.
   * @param {string} functionName - The name of the contract function to call.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The result of the contract function.
   * @throws Will throw an error if the contract read operation fails.
   */
  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.WETH9[this.config.publicClient.chain!.id],
        abi: WETH9ABI.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

}
