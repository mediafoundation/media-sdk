import {Sdk, SdkConfig} from "../config/sdk";

import {abi as ERC20ABI} from "../../abis/ERC20.json";
import {Address} from "viem";

export class ERC20 {
  private config: SdkConfig
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config
  }

  async view(address: Address, functionName: string, args: any) {
    try {
      return await this.config.publicClient.readContract({
        address: address,
        abi: ERC20ABI,
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
        abi: ERC20ABI,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account!.address,
      })
      return await this.config.walletClient.writeContract(request)
    } catch (error) {
      throw error
    }
  }

  async balanceOf(address: Address) {
    try {
      return await this.view(address, "balanceOf", [
        this.config.walletClient.account!.address,
      ])
    } catch (error) {
      throw error
    }
  }

  async allowance(token: Address, spender: Address) {
    try {
      return await this.view(token, "allowance", [
        this.config.walletClient.account!.address,
        spender,
      ])
    } catch (error) {
      throw error
    }
  }

  async approve(address: Address, spender: Address, amount: string) {
    try {
      return await this.execute(address, "approve", [spender, amount])
    } catch (error) {
      throw error
    }
  }

  async transfer(address: Address, to: Address, amount: string) {
    try {
      return await this.execute(address, "transfer", [to, amount])
    } catch (error) {
      throw error
    }
  }

  async transferFrom(address: Address, from: Address, to: Address, amount: string) {
    try {
      return await this.execute(address, "transferFrom", [from, to, amount])
    } catch (error) {
      throw error
    }
  }
}
