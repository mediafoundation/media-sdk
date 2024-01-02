const ERC20ABI = require("../../abis/ERC20.json").abi
const { getConfig } = require("../config/config")

class ERC20 {

  static async view(address, functionName, args) {
    try {
      return await getConfig().publicClient.readContract({
        address: address,
        abi: ERC20ABI,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  static async execute(address, functionName, args) {
    try {
      const { request } = await getConfig().publicClient.simulateContract({
        address: address,
        abi: ERC20ABI,
        functionName: functionName,
        args: args,
        account: getConfig().walletClient.account.address,
      })
      const hash = await getConfig().walletClient.writeContract(request)
      return hash
    } catch (error) {
      throw error
    }
  }

  static async balanceOf(address) {
    try {
      return await this.view(address, "balanceOf", [getConfig().walletClient.account.address])
    } catch (error) {
      throw error
    }
  }

  static async allowance(token, spender) {
    console.log("token", token)
    console.log("owner", getConfig().walletClient.account.address)
    console.log("spender", spender)
    try {
      return await this.view(token, "allowance", [getConfig().walletClient.account.address, spender])
    } catch (error) {
      throw error
    }
  }

  static async approve(address, spender, amount) {
    try {
      return await this.execute(address, "approve", [spender, amount])
    } catch (error) {
      throw error
    }
  }

  static async transfer(address, to, amount) {
    try {
      return await this.execute(address, "transfer", [to, amount])
    } catch (error) {
      throw error
    }
  }

  static async transferFrom(address, from, to, amount) {
    try {
      return await this.execute(address, "transferFrom", [from, to, amount])
    } catch (error) {
      throw error
    }
  }

  

}

module.exports = ERC20
