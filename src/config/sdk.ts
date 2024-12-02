import { mnemonicToAccount, privateKeyToAccount} from "viem/accounts";

import { baseSepolia, sepolia } from "viem/chains";

import {
    Chain,
    createPublicClient,
    CustomTransportConfig,
    fallback,
    HttpTransportConfig,
    publicActions, PublicClient,
    Transport,
    WalletClient, WebSocketTransportConfig
} from "viem";

import {http as httpTransport} from "viem"
import {custom as customTransport} from "viem"
import {webSocket as webSocketTransport} from "viem"
import {createWalletClient as generateWalletClient} from "viem";

/**
 * Interface for SDK constructor parameters.
 */
interface SdkConstructor {
    chain?: Chain,
    transport?: Transport[],
    privateKey?: string | undefined,
    mnemonic?: string | undefined,
    walletClient?: any | undefined,
}

/**
 * Type for SDK configuration.
 */
export type SdkConfig = {
    walletClient: WalletClient,
    publicClient: PublicClient
}
const defaultChain = sepolia

/**
 * SDK class for managing blockchain interactions.
 */
export class Sdk {
    public config: SdkConfig

    /**
     * Constructor for the SDK class.
     * @param {SdkConstructor} param0 - The constructor parameters.
     */
    constructor({
        chain = defaultChain,
        transport = undefined,
        privateKey = undefined,
        mnemonic = undefined,
        walletClient = undefined,
    }: SdkConstructor = {}) {
        if ((privateKey || mnemonic) && !walletClient) {
            walletClient = Sdk.createWalletClient({
                chain,
                transports: transport || [http(chain?.rpcUrls.default.http[0])],
                privateKey,
                mnemonic,
            })
        }
        let publicClient = walletClient
            ? walletClient.extend(publicActions)
            : Sdk.generatePublicClient({ chain, transports: transport || [http(chain?.rpcUrls.default.http[0])] })
        this.config = {
            walletClient: walletClient,
            publicClient: publicClient,
        }
    }

    /**
     * Generates a public client.
     * @param {Object} param0 - The parameters for generating a public client.
     * @param {Chain} param0.chain - The blockchain chain.
     * @param {Transport[]} param0.transports - The transport methods.
     * @returns {PublicClient} The public client.
     */
    static generatePublicClient({
        chain,
        transports
    }: {
        chain: Chain,
        transports: Transport[],
    }): PublicClient {
        return createPublicClient({
            chain: chain,
            transport: fallback(transports),
        })
    }

    /**
     * Generates a wallet client.
     * @param {Object} param0 - The parameters for generating a wallet client.
     * @param {Chain} param0.chain - The blockchain chain.
     * @param {Transport[]} param0.transports - The transport methods.
     * @param {string | undefined} param0.privateKey - The private key.
     * @param {string | undefined} param0.mnemonic - The mnemonic phrase.
     * @returns {WalletClient} The wallet client.
     */
    static createWalletClient({
        chain,
        transports,
        privateKey,
        mnemonic
    }: {
        chain: Chain,
        transports: Transport[],
        privateKey: string | undefined,
        mnemonic: string | undefined
    }): WalletClient {
        let account = privateKey
            ? privateKeyToAccount(`0x${privateKey}`)
            : mnemonicToAccount(mnemonic!)
        return generateWalletClient({
            account: account,
            chain: chain,
            transport: fallback(transports),
        })
    }
}

/**
 * Chains currently supported.
 */
export const validChains = {
    11155111: sepolia,
    84532: baseSepolia,
}

export const http = (url?: string | undefined, config?: HttpTransportConfig | undefined) => httpTransport(url, config)
export const custom = (provider: any, config?: CustomTransportConfig | undefined) => customTransport(provider, config)
export const webSocket = (url?: string | undefined, config?: WebSocketTransportConfig | undefined) => webSocketTransport(url, config)