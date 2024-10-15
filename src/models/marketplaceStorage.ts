import Addresses from "../../contractAddresses.json";
import {Sdk, SdkConfig} from "../config/sdk";
import abi from "../../abis/MarketplaceStorage.json";
import {InitializeMarketplaceParams} from "../types/modelTypes";

const ContractAddresses: typeof Addresses = Addresses;
const MarketplaceStorageABI: typeof abi = abi;

/**
 * Class representing the MarketplaceStorage contract.
 */
export class MarketplaceStorage {
  private config: SdkConfig;

  /**
   * Creates an instance of Marketplace.
   * @param {Sdk} sdkInstance - An instance of the SDK containing configuration details.
   * @throws Will throw an error if the marketplace address is not found for the current network ID.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config;

    if (
      ContractAddresses.MarketplaceStorage[this.config.publicClient.chain!.id] === undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
        this.config.publicClient.chain!.id
      );
    }
  }

  /**
   * Calls a read-only function on the MarketplaceStorage contract.
   * @param {string} functionName - The name of the contract function to call.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The result of the contract function.
   * @throws Will throw an error if the contract read operation fails.
   */
  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.MarketplaceStorage[this.config.publicClient.chain!.id],
        abi: MarketplaceStorageABI.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Executes a state-changing function on the MarketplaceStorage contract.
   * @param {string} functionName - The name of the contract function to execute.
   * @param {any[]} args - The arguments to pass to the contract function.
   * @returns {Promise<any>} - The transaction receipt.
   * @throws Will throw an error if the contract execution fails.
   */
  async execute(functionName: string, args: any[]): Promise<any> {
    try {
      const {request} = await this.config.publicClient.simulateContract({
        address: ContractAddresses.MarketplaceStorage[this.config.publicClient.chain!.id],
        abi: MarketplaceStorageABI.abi,
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
   * Initializes the marketplace with the required parameters.
   * @param {requiredStake} requiredStake - The required stake to register as provider.
   * @param {marketFeeTo} marketFeeTo - The address to receive the market fee.
   * @param {marketFeeRate} marketFeeRate - The rate of the market fee. (e.g. 50000 for 5%)
   * @returns {Promise<any>} - The transaction receipt.
   */
  async initializeMarketplace({requiredStake, marketFeeTo, marketFeeRate, metadata}: InitializeMarketplaceParams): Promise<any> {
    return await this.execute("initializeMarketplace", [
      requiredStake,
      marketFeeTo,
      marketFeeRate,
      metadata
    ])
  }

}