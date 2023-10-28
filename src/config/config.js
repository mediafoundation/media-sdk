const viem = require("viem");
const accounts = require("viem/accounts");
let _config = {
    walletClient: undefined,
    publicClient: undefined,
    marketPlaceId: 1,
    networkId: 1
};


const generatePublicClient = (options, rpcUrl) => {
    let customChain = {
        id: 1,
        name: 'Ethereum Mainnet',
        network: 'Ethereum Mainnet',
        nativeCurrency: {
            decimals: 18,
            name: 'Ether',
            symbol: 'ETH',
        },
        ...options
    };

    return viem.createPublicClient({
        transport: viem.http(rpcUrl),
        chain: customChain
    })
}

const generateWalletClient = (privateKey, options, rpcUrl) => {
    let customChain = {
        id: 1,
        name: 'Ethereum Mainnet',
        network: 'Ethereum Mainnet',
        nativeCurrency: {
            decimals: 18,
            name: 'Ether',
            symbol: 'ETH',
        },
        ...options
    }


    return viem.createWalletClient({
        account: accounts.privateKeyToAccount(`0x${privateKey}`),
        transport: viem.http(rpcUrl),
        chain: customChain
    })
}

module.exports.init = (privateKey, chainOptions, rpcUrl, walletClient) => {
    if(privateKey === undefined && walletClient === undefined){
        throw "Either privateKey or walletClient must be provided"
    }

    if(walletClient === undefined && privateKey !== undefined){
        walletClient = generateWalletClient(privateKey, chainOptions, rpcUrl)
    }

    _config = {
        walletClient: walletClient,
        publicClient: generatePublicClient(chainOptions, rpcUrl),
        marketPlaceId: chainOptions.marketPlaceId,
        chainId: chainOptions.id
    };
};

module.exports.getConfig = () => {
    return _config;
};