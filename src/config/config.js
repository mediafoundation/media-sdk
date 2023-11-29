const viem = require("viem");
const chains = require("viem/chains");
const accounts = require("viem/accounts");

const defaultChain = chains.goerli;

const generatePublicClient = (chain = defaultChain) =>
  viem.createPublicClient({
    transport: viem.http(chain.rpcUrls.default.http),
    chain: chain,
  });

const generateWalletClient = ({
  privateKey,
  mnemonic,
  chain = defaultChain,
}) => {
  let account = privateKey
    ? accounts.privateKeyToAccount(`0x${privateKey}`)
    : accounts.mnemonicToAccount(mnemonic);
  return viem.createWalletClient({
    account: account,
    transport: viem.http(chain.rpcUrls.default.http),
    chain: chain,
  });
};

let _config = {
  walletClient: undefined,
  publicClient: generatePublicClient(),
};

module.exports.initSdk = ({
  chain = defaultChain,
  privateKey = undefined,
  mnemonic = undefined,
  walletClient = undefined,
}) => {
  if (privateKey || mnemonic) {
    walletClient = generateWalletClient({ privateKey, mnemonic, chain });
  }
  _config = {
    walletClient: walletClient,
    publicClient: generatePublicClient(chain),
  };
};

module.exports.getConfig = () => _config;
