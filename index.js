import {createPublicClient, createWalletClient, http} from "viem";
import Marketplace from "./media-core/models/marketplace.js";
import {privateKeyToAccount} from "viem/accounts";

export default class MediaSdk extends Marketplace {
    constructor(privateKey, chainOptions, rpcUrl) {

        console.log("options", chainOptions)

        super(
            generateWalletClient(privateKey, chainOptions, rpcUrl),
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
