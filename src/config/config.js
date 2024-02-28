const viem = require("viem")
const chains = require("viem/chains")
const accounts = require("viem/accounts")
const { sepolia, baseSepolia } = require("viem/chains")

const defaultChain = chains.sepolia

module.exports.validChains = {
  11155111: sepolia,
  84532: baseSepolia,

}

const generatePublicClient = ({ chain, transport }) =>
  viem.createPublicClient({
    chain: chain,
    transport: viem.http(transport),
  })

const generateWalletClient = ({ chain, transport, privateKey, mnemonic }) => {
  let account = privateKey
    ? accounts.privateKeyToAccount(`0x${privateKey}`)
    : accounts.mnemonicToAccount(mnemonic)
  return viem.createWalletClient({
    account: account,
    chain: chain,
    transport: viem.http(transport),
  })
}

let config = {
  walletClient: undefined,
  publicClient: generatePublicClient({
    chain: defaultChain,
    transport: defaultChain.rpcUrls.default.http,
  }),
}

module.exports.initSdk = function ({
  chain = defaultChain,
  transport = undefined,
  privateKey = undefined,
  mnemonic = undefined,
  walletClient = undefined,
} = {}) {
  transport = transport || chain.rpcUrls.default.http
  if (privateKey || mnemonic) {
    walletClient = generateWalletClient({
      chain,
      transport,
      privateKey,
      mnemonic,
    })
  }
  let publicClient = walletClient
    ? walletClient.extend(viem.publicActions)
    : generatePublicClient({ chain, transport })
  config = {
    walletClient: walletClient,
    publicClient: publicClient,
  }
}

module.exports.getConfig = () => config
