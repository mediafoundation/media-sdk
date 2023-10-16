import {createPublicClient, createWalletClient, http} from "viem";
import MarketplaceViewer from "./media-core/models/marketplaceViewer.js";
import {privateKeyToAccount} from "viem/accounts";

export default class MediaSdk extends MarketplaceViewer {
    constructor(privateKey, chainOptions, rpcUrl, walletClient) {
        if(privateKey === undefined && walletClient === undefined){
            throw "Either privateKey or walletClient must be provided"
        }

        if(walletClient === undefined && privateKey !== undefined){
            walletClient = generateWalletClient(privateKey, chainOptions, rpcUrl)
        }

        super(
            walletClient,
            generatePublicClient(chainOptions, rpcUrl),
            chainOptions.marketPlaceId,
            chainOptions.id
        );
    }
}

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

    return createPublicClient({
        transport: http(rpcUrl),
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


    return createWalletClient({
        account: privateKeyToAccount(`0x${privateKey}`),
        transport: http(rpcUrl),
        chain: customChain
    })
}
