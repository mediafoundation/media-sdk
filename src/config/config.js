const viem = require("viem");
const chains = require("viem/chains");

let defaultChain = chains.goerli;

const generatePublicClient = (chain = defaultChain) => {
    return viem.createPublicClient({
        transport: viem.http(chain.rpcUrls.default.http),
        chain: chain
    })
}

const generateWalletClient = (privateKey, chain = defaultChain) => {
    return viem.createWalletClient({
        account: viem.accounts.privateKeyToAccount(`0x${privateKey}`),
        transport: viem.http(chain.rpcUrls.default.http),
        chain: chain
    })
}

let _config = {
  walletClient: undefined,
  publicClient: generatePublicClient(defaultChain),
};

module.exports.initSdk = ({ 
  chain = defaultChain,
  privateKey = undefined, 
  walletClient = undefined
}) => {
    if(privateKey !== undefined){
        walletClient = generateWalletClient(privateKey, chain)
    }
    _config = {
        walletClient: walletClient,
        publicClient: generatePublicClient(chain)
    };
};

module.exports.getConfig = () => {
    return _config;
};