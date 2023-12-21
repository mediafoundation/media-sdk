const viem = require("viem");
const chains = require("viem/chains");
const accounts = require("viem/accounts");
const {goerli, baseGoerli} = require("viem/chains");

const defaultChain = chains.goerli;

module.exports.validChains = {
  5: goerli,
  84531: baseGoerli
}

const generatePublicClient = ({
  chain,
  transport,
}) =>
  viem.createPublicClient({
    chain: chain,
    transport: viem.http(transport),
  });

const generateWalletClient = ({
  chain,
  transport,
  privateKey,
  mnemonic,
}) => {
  let account = privateKey
    ? accounts.privateKeyToAccount(`0x${privateKey}`)
    : accounts.mnemonicToAccount(mnemonic);
  return viem.createWalletClient({
    account: account,
    chain: chain,
    transport: viem.http(transport),
  });
};

let _config = {
  walletClient: undefined,
  publicClient: generatePublicClient({ 
    chain: defaultChain,
    transport: defaultChain.rpcUrls.default.http
  }),
};

module.exports.initSdk = ({
  chain = defaultChain,
  transport = undefined,
  privateKey = undefined,
  mnemonic = undefined,
  walletClient = undefined,
}) => {
  transport = transport || chain.rpcUrls.default.http;
  if (privateKey || mnemonic) {
    walletClient = generateWalletClient({ chain, transport, privateKey, mnemonic });
  }
  _config = {
    walletClient: walletClient,
    publicClient: generatePublicClient({ chain, transport }),
  };
};

module.exports.getConfig = () => _config;
