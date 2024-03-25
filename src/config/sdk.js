const viem = require("viem");
const accounts = require("viem/accounts");
const chains = require("viem/chains");
const { sepolia, baseSepolia } = require("viem/chains")

const defaultChain = chains.goerli

class Sdk {
  constructor({
    chain = defaultChain,
    transport = undefined,
    privateKey = undefined,
    mnemonic = undefined,
    walletClient = undefined,
  } = {}) {
    transport = transport || chain.rpcUrls.default.http
    if (privateKey || mnemonic) {
      walletClient = this.generateWalletClient({
        chain,
        transport,
        privateKey,
        mnemonic,
      })
    }
    let publicClient = walletClient
      ? walletClient.extend(viem.publicActions)
      : this.generatePublicClient({chain, transport})
    this.config = {
      walletClient: walletClient,
      publicClient: publicClient,
    }
  }

  generatePublicClient({chain, transport}) {
    return viem.createPublicClient({
      chain: chain,
      transport: viem.http(transport),
    })
  }

  generateWalletClient({chain, transport, privateKey, mnemonic}) {
    let account = privateKey
      ? accounts.privateKeyToAccount(`0x${privateKey}`)
      : accounts.mnemonicToAccount(mnemonic)
    return viem.createWalletClient({
      account: account,
      chain: chain,
      transport: viem.http(transport),
    })
  }
}

module.exports.Sdk = Sdk

module.exports.validChains = {
  11155111: sepolia,
  84532: baseSepolia,
}