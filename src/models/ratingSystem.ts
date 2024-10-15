import Addresses from "../../contractAddresses.json";
import { Sdk, SdkConfig } from "../config/sdk";
import abi from "../../abis/RatingSystem.json";

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
      throw new Error(
        "RatingSystem address not found for network id: " +
          this.config.publicClient.chain!.id
      );
    }
  }

  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.RatingSystem[this.config.publicClient.chain!.id],
        abi: RatingSystemABI.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  async execute(functionName: string, args: any[]): Promise<any> {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: ContractAddresses.RatingSystem[this.config.publicClient.chain!.id],
        abi: RatingSystemABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
      });
      return await this.config.walletClient.writeContract(request);
    } catch (error) {
      throw error;
    }
  }
}
