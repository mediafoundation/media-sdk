import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";

import { baseSepolia, sepolia } from "viem/chains";

import {
    Chain,
    createPublicClient,
    createWalletClient,
    fallback,
    http,
    publicActions, PublicClient,
    Transport,
    WalletClient
} from "viem";

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
            walletClient = this.generateWalletClient({
                chain,
                transports: transport || [http(chain?.rpcUrls.default.http[0])],
                privateKey,
                mnemonic,
            })
        }
        let publicClient = walletClient
            ? walletClient.extend(publicActions)
            : this.generatePublicClient({ chain, transports: transport || [http(chain?.rpcUrls.default.http[0])] })
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
    generatePublicClient({
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
    }): WalletClient {
        let account = privateKey
            ? privateKeyToAccount(`0x${privateKey}`)
            : mnemonicToAccount(mnemonic!)
        return createWalletClient({
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