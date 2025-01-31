import Addresses from "../../contractAddresses.json";
import {Sdk} from "../config/sdk";
import ISwapRouter from "../../abis/SwapRouter02.json"

const SwapRouterABI: typeof ISwapRouter = ISwapRouter
const ContractAddresses: typeof Addresses = Addresses


export class SwapRouter {
  private config
  private chainId

  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
    this.chainId = this.config.publicClient.chain.id

    if (ContractAddresses.SwapRouter02[this.chainId] === undefined) {
      throw new Error(
        "SwapRouter02 address not found for network id: " + this.chainId
      )
    }
  }

  /**
   * Executes a transaction on the SwapRouter02 contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @param {bigint} value - The value to send with the transaction.
   * @returns {Promise<any>} The result of the transaction.
   * @throws Will throw an error if the transaction fails.
   */
  async execute(functionName: string, args: any[], value: bigint = 0n): Promise<any> {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: ContractAddresses.SwapRouter02[this.chainId],
        abi: SwapRouterABI.abi,
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

}
