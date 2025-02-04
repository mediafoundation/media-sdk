import {Sdk, SdkConfig} from "../config/sdk";
import {Uniswap} from "../utils/uniswap";
import Addresses from "../../contractAddresses.json";
import abi from "../../abis/MarketplaceHelper.json"
import {FeeAmount} from "@uniswap/v3-sdk";
import {
  AddLiquidityAndRegisterParams,
  AddLiquidityAndRegisterWithWETHParams,
  SwapAndCreateDealParams,
  SwapAndCreateDealsParams,
  SwapAndCreateDealsWithWETHParams,
  SwapAndCreateDealWithWETHParams
} from "../types/modelTypes";

const ContractAddresses: typeof Addresses = Addresses
const MarketplaceHelperABI: typeof abi = abi

/**
 * Class representing the MarketplaceHelper contract interactions.
 */
export class MarketplaceHelper {
  /**
   * @private
   * @type {SdkConfig}
   */
  private config: SdkConfig

  /**
   * Creates an instance of MarketplaceHelper.
   * @param {Sdk} sdkInstance - An instance of the SDK.
   */
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      ContractAddresses.MarketplaceHelper[this.config.publicClient.chain!.id] ===
      undefined
    ) {
      console.error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
  }

  /**
   * Converts WETH to Media.
   * @param {FeeAmount} fee - The fee amount.
   * @returns {string} The encoded path.
   */
  wethToMedia(fee: FeeAmount): string {
    return Uniswap.encodePath(
      [
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }

  /**
   * Converts Media to WETH.
   * @param {FeeAmount} fee - The fee amount.
   * @returns {string} The encoded path.
   */
  mediaToWeth(fee: FeeAmount): string {
    return Uniswap.encodePath(
      [
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }

  /**
   * Reads data from the MarketplaceHelper contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @returns {Promise<any>} The result of the contract call.
   * @throws Will throw an error if the contract call fails.
   */
  async view(functionName: string, args: any[]): Promise<any> {
    try {
      return await this.config.publicClient.readContract({
        address: ContractAddresses.MarketplaceHelper[this.config.publicClient.chain!.id],
        abi: MarketplaceHelperABI.abi,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Executes a transaction on the MarketplaceHelper contract.
   * @param {string} functionName - The name of the function to call.
   * @param {any[]} args - The arguments to pass to the function.
   * @param {bigint} value - The value to send with the transaction.
   * @returns {Promise<any>} The result of the transaction.
   * @throws Will throw an error if the transaction fails.
   */
  async execute(functionName: string, args: any[], value: bigint = 0n): Promise<any> {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: ContractAddresses.MarketplaceHelper[this.config.publicClient.chain!.id],
        abi: MarketplaceHelperABI.abi,
        functionName: functionName,
        args: args,
        account: this.config.walletClient.account,
        value: value,
      })
      return await this.config.walletClient.writeContract(request)
    } catch (error) {
      throw error
    }
  }

  /**
   * Adds liquidity to the Uniswap pool.
   * @param marketplaceId - The marketplace ID.
   * @param metadata - The provider metadata.
   * @param publicKey - The provider public key.
   * @param minOut - Array with the minimum amounts of media and weth to receive.
   * @param path - The preferred MEDIA/WETH Uniswap path. (Used to swap half of the ETH to MEDIA)
   * @param slippage - The slippage tolerance.
   * @param poolFee - The pair fee of the pool where your liquidity will be added.
   * @param amount - The amount of ETH to send.
   * @returns {Promise<any>} The result of the transaction.
   */
  async addLiquidityAndRegisterWithETH({
    marketplaceId,
    metadata,
    publicKey,
    minOut,
    path,
    slippage,
    poolFee = 500,
    amount
  }: AddLiquidityAndRegisterWithWETHParams): Promise<any> {
    return await this.execute(
      "addLiquidityAndRegisterWithETH",
      [
        marketplaceId,
        metadata,
        publicKey,
        minOut,
        path,
        slippage,
        poolFee
      ],
      amount
    )
  }

  /**
   * Adds liquidity to the Uniswap pool and registers the media.
   * @param marketplaceId - The marketplace ID.
   * @param inputToken - The input token address.
   * @param inputAmount - The input amount.
   * @param metadata - The provider metadata.
   * @param publicKey - The provider public key.
   * @param minOut - Array with the minimum amounts of media and weth to receive.
   * @param paths - The preferred Uniswap paths. (Used to swap half of the input token to MEDIA and the other half to ETH)
   * @param slippage - The slippage tolerance.
   * @param poolFee - The pair fee of the pool where your liquidity will be added.
   * @returns {Promise<any>} The result of the transaction.
   */
  async addLiquidityAndRegister({
    marketplaceId,
    inputToken,
    inputAmount,
    metadata,
    publicKey,
    minOut,
    paths,
    slippage,
    poolFee = 500,
  }: AddLiquidityAndRegisterParams): Promise<any> {

    return await this.execute("addLiquidityAndRegister", [
      marketplaceId,
      inputToken,
      inputAmount,
      metadata,
      publicKey,
      minOut,
      paths,
      slippage,
      poolFee
    ])
  }

  /**
   * Swap tokens and creates a deal.
   * @param marketplaceId
   * @param resourceId
   * @param offerId
   * @param sharedKeyCopy
   * @param minMediaAmountOut
   * @param amount
   * @param poolFee
   * @returns {Promise<any>}
   */
  async swapAndCreateDealWithETH({
    marketplaceId,
    resourceId,
    offerId,
    sharedKeyCopy,
    minMediaAmountOut,
    amount,
    poolFee = 500,
  }: SwapAndCreateDealWithWETHParams): Promise<any> {
    return await this.execute(
      "swapAndCreateDealWithETH",
      [
        marketplaceId,
        resourceId,
        offerId,
        sharedKeyCopy,
        minMediaAmountOut,
        this.wethToMedia(poolFee),
      ],
      amount
    )
  }

  /**
   * Swap tokens and create a deal.
   * @param marketplaceId - The marketplace ID.
   * @param inputToken - The input token address.
   * @param inputAmount - The input amount.
   * @param resourceId - The resource ID.
   * @param offerId - The offer ID.
   * @param sharedKeyCopy - The shared key copy.
   * @param minMediaAmountOut - The minimum amount of media to receive.
   * @param path - The preferred Uniswap path. (Used to swap the input token to MEDIA)
   * @returns {Promise<any>}
   */
  async swapAndCreateDeal({
    marketplaceId,
    inputToken,
    inputAmount,
    resourceId,
    offerId,
    sharedKeyCopy,
    minMediaAmountOut,
    path,
  }: SwapAndCreateDealParams): Promise<any> {

    return await this.execute("swapAndCreateDeal", [
      marketplaceId,
      inputToken,
      inputAmount,
      resourceId,
      offerId,
      sharedKeyCopy,
      minMediaAmountOut,
      path,
    ])
  }

  /**
   * Swap tokens and create deals.
   * @param marketplaceId
   * @param resourceId
   * @param offerIds
   * @param sharedKeyCopies
   * @param minMediaAmountOut
   * @param amount
   * @param poolFee
   * @returns {Promise<any>}
   */
  async swapAndCreateDealsWithETH({
    marketplaceId,
    resourceId,
    offerIds,
    sharedKeyCopies,
    minMediaAmountOut,
    amount,
    poolFee = 500,
  }: SwapAndCreateDealsWithWETHParams): Promise<any> {
    return await this.execute(
      "swapAndCreateDealsWithETH",
      [
        marketplaceId,
        resourceId,
        offerIds,
        sharedKeyCopies,
        minMediaAmountOut,
        this.wethToMedia(poolFee),
      ],
      amount
    )
  }

  /**
   * Swap tokens and create deals.
   * @param marketplaceId - The marketplace ID.
   * @param inputToken - The input token address.
   * @param inputAmount - The input amount.
   * @param resourceId - The resource ID.
   * @param offerIds - The offer IDs.
   * @param sharedKeyCopies - The shared key copies.
   * @param minAmountOut - The minimum amount of media to receive.
   * @param path - The preferred Uniswap path. (Used to swap the input token to MEDIA)
   * @returns {Promise<any>}
   * @throws Will throw an error if the transaction fails.
   */

  async swapAndCreateDeals({
    marketplaceId,
    inputToken,
    inputAmount,
    resourceId,
    offerIds,
    sharedKeyCopies,
    minAmountOut,
    path,
  }: SwapAndCreateDealsParams): Promise<any> {
    return await this.execute("swapAndCreateDeals", [
      marketplaceId,
      inputToken,
      inputAmount,
      resourceId,
      offerIds,
      sharedKeyCopies,
      minAmountOut,
      path,
    ])
  }


}

