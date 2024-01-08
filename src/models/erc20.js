const ERC20ABI = require("../../abis/ERC20.json").abi
const { getConfig } = require("../config/config")

class ERC20 {
  constructor() {
    this.config = getConfig()
  }

  async view(address, functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: address,
        abi: ERC20ABI,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  async execute(address, functionName, args) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: address,
        abi: ERC20ABI,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account.address,
      })
      const hash = await this.config.walletClient.writeContract(request)
      return hash
    } catch (error) {
      throw error
    }
  }

  async balanceOf(address) {
    try {
      return await this.view(address, "balanceOf", [
        this.config.walletClient.account.address,
      ])
    } catch (error) {
      throw error
    }
  }

  async allowance(token, spender) {
    try {
      return await this.view(token, "allowance", [
        this.config.walletClient.account.address,
        spender,
      ])
    } catch (error) {
      throw error
    }
  }

  async approve(address, spender, amount) {
    try {
      return await this.execute(address, "approve", [spender, amount])
    } catch (error) {
      throw error
    }
  }

  async transfer(address, to, amount) {
    try {
      return await this.execute(address, "transfer", [to, amount])
    } catch (error) {
      throw error
    }
  }

  async transferFrom(address, from, to, amount) {
    try {
      return await this.execute(address, "transferFrom", [from, to, amount])
    } catch (error) {
      throw error
    }
  }
}

module.exports = ERC20
