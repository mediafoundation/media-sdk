import * as Addresses from "../../contractAddresses.json";

import ResourcesABI from "../../abis/Resources.json"

import {Sdk} from "../config/sdk";

export class Resources {
  private config
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (Addresses.Resources[this.config.publicClient.chain.id] === undefined) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain.id
      )
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: Addresses.Resources[this.config.publicClient.chain.id],
        abi: ResourcesABI.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async execute(functionName, args) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: Addresses.Resources[this.config.publicClient.chain.id],
        abi: ResourcesABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
      })
      return await this.config.walletClient.writeContract(request)
    } catch (error) {
      throw error
    }
  }

  async getResource({ id, address }) {
    try {
      return await this.view("getResource", [id, address])
    } catch (error) {
      throw error
    }
  }

  async addResource({ encryptedData, sharedKeyCopy, ownerKeys }) {
    return await this.execute("addResource", [
      encryptedData,
      sharedKeyCopy,
      ownerKeys,
    ])
  }

  async updateResource({ id, encryptedData }) {
    return await this.execute("updateResource", [id, encryptedData])
  }

  async removeResource({ id, ownerKeys }) {
    return await this.execute("removeResource", [id, ownerKeys])
  }

  async getPaginatedResources({ address, start = 0, steps = 20 }) {
    try {
      return await this.view("getPaginatedResources", [address, start, steps])
    } catch (_) {
      return []
    }
  }

  async getAllResourcesPaginating({ address, start = 0, steps = 20 }) {
    let resources: any[] = []

    let _steps = BigInt(steps)
    let _start = BigInt(start)

    let result = await this.view("getPaginatedResources", [
      address,
      _start,
      _steps,
    ])
    resources.push(...result[0])

    if (result[1] > resources.length) {
      let totalResources = result[1]
      for (let i = BigInt(1); i * _steps < totalResources; i++) {
        let result = await this.view("getPaginatedResources", [
          address,
          _start + i * _steps,
          _steps,
        ])
        resources.push(...result[0])
      }

      if (totalResources > resources.length) {
        let result = await this.view("getPaginatedResources", [
          address,
          _start + totalResources,
          totalResources - BigInt(resources.length),
        ])
        resources.push(...result[0])
      }
    }

    return resources
  }

  async getOwnerKeys({ address }) {
    try {
      return await this.view("getOwnerKeys", [address])
    } catch (_) {
      return []
    }
  }

}
