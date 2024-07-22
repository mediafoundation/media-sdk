import {baseSepolia, goerli, sepolia} from "viem/chains";


interface SdkConstructor {
    chain?: Chain,
    transport?: string[] | undefined,
    privateKey?: string | undefined,
    mnemonic?: string | undefined,
    walletClient?: any | undefined,
}

export type SdkConfig = {
    walletClient: WalletClient,
    publicClient: PublicClient
}

const defaultChain = goerli

import {
    Chain,
    createPublicClient,
    createWalletClient,
    fallback,
    http,
    publicActions, PublicClient,
    Transport,
    WalletClient, webSocket
} from "viem";
import {mnemonicToAccount, privateKeyToAccount} from "viem/accounts";

export class Sdk {
    public config: SdkConfig
    constructor({
        chain = defaultChain,
        transport = undefined,
        privateKey = undefined,
        mnemonic = undefined,
        walletClient = undefined,
    }: SdkConstructor = {}) {
        const transportForClient = transport ? transport.map((transport) => this.createTransport(transport)) : [http(chain?.rpcUrls.default.http[0])]

        if ((privateKey || mnemonic) && !walletClient) {
            walletClient = this.generateWalletClient({
                chain,
                transports: transportForClient,
                privateKey,
                mnemonic,
            })
        }
        let publicClient = walletClient
            ? walletClient.extend(publicActions)
            : this.generatePublicClient({chain, transports: transportForClient})
        this.config = {
            walletClient: walletClient,
            publicClient: publicClient,
        }
    }

    generatePublicClient({
        chain,
        transports
    }: {
        chain: Chain,
        transports: Transport[],
    }) {
        return createPublicClient({
            chain: chain,
            transport: fallback(transports),
        })
    }

    generateWalletClient({
        chain,
        transports,
        privateKey,
        mnemonic
    }: {
        chain: Chain,
        transports: Transport[],
        privateKey: string | undefined,
        mnemonic: string | undefined
    }) {
        let account = privateKey
            ? privateKeyToAccount(`0x${privateKey}`)
            : mnemonicToAccount(mnemonic!)
        return createWalletClient({
            account: account,
            chain: chain,
            transport: fallback(transports),
        })
    }

    private createTransport = (transport: string) => {
         // Assuming the transport string indicates the type (e.g., starts with 'ws' or 'http')
        if (transport.startsWith('ws')) {
            return webSocket(transport); // Replace with the actual WebSocket creation logic
        }
        return http(transport);
    };
}

export const validChains = {
    11155111: sepolia,
    84532: baseSepolia,
}
