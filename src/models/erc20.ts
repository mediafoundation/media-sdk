import {Sdk, SdkConfig} from "../config/sdk";
import abi from "../../abis/ERC20.json";
import {Address} from "viem";

const ERC20ABI: typeof abi = abi

/**
 * Class representing the ERC20 contract interactions.
 */
export class ERC20 {
  /**
   * @private
   * @type {SdkConfig}
   */
  private config: SdkConfig

  /**
   * Creates an instance of ERC20.
   * @param {Sdk} sdkInstance - An instance of the SDK.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  /**
   * Reads data from the ERC20 contract.
   * @param {Address} address - The address of the contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @returns {Promise<any>} The result of the contract call.
   * @throws Will throw an error if the contract call fails.
   */
  async view(address: Address, functionName: string, args: any): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: address,
        abi: ERC20ABI.abi,
        functionName: functionName,
        args: args
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Executes a transaction on the ERC20 contract.
   * @param {Address} address - The address of the contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @returns {Promise<any>} The result of the transaction.
   * @throws Will throw an error if the transaction fails.
   */
  async execute(address: Address, functionName: string, args: any): Promise<any> {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: address,
        abi: ERC20ABI.abi,
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
   * Retrieves the balance of a specified address.
   * @param {Address} address - The address to query the balance of.
   * @returns {Promise<any>} The balance of the address.
   */
  async balanceOf(address: Address): Promise<any> {
    try {
      return await this.view(address, "balanceOf", [
        this.config.walletClient.account!.address,
      ])
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves the allowance of a spender for a specified token.
   * @param {Address} token - The address of the token.
   * @param {Address} spender - The address of the spender.
   * @returns {Promise<any>} The allowance of the spender.
   */
  async allowance(token: Address, spender: Address): Promise<any> {
    try {
      return await this.view(token, "allowance", [
        this.config.walletClient.account!.address,
        spender,
      ])
    } catch (error) {
      throw error
    }
  }

  /**
   * Approves a spender to spend a specified amount of tokens.
   * @param {Address} address - The address of the contract.
   * @param {Address} spender - The address of the spender.
   * @param {string} amount - The amount of tokens to approve.
   * @returns {Promise<any>} The result of the transaction.
   */
  async approve(address: Address, spender: Address, amount: string): Promise<any> {
    try {
      return await this.execute(address, "approve", [spender, amount])
    } catch (error) {
      throw error
    }
  }

  /**
   * Transfers tokens to a specified address.
   * @param {Address} address - The address of the contract.
   * @param {Address} to - The address to transfer tokens to.
   * @param {string} amount - The amount of tokens to transfer.
   * @returns {Promise<any>} The result of the transaction.
   */
  async transfer(address: Address, to: Address, amount: string): Promise<any> {
    try {
      return await this.execute(address, "transfer", [to, amount])
    } catch (error) {
      throw error
    }
  }

  /**
   * Transfers tokens from one address to another.
   * @param {Address} address - The address of the contract.
   * @param {Address} from - The address to transfer tokens from.
   * @param {Address} to - The address to transfer tokens to.
   * @param {string} amount - The amount of tokens to transfer.
   * @returns {Promise<any>} The result of the transaction.
   * @throws Will throw an error if the transaction fails.
   */
  async transferFrom(address: Address, from: Address, to: Address, amount: string): Promise<any> {
    try {
      return await this.execute(address, "transferFrom", [from, to, amount])
    } catch (error) {
      throw error
    }
  }
}
