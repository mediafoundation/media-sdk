import {Sdk, SdkConfig} from "../config/sdk";

import {Uniswap} from "../utils/uniswap";

import * as Addresses from "../../contractAddresses.json";

import {abi as MarketplaceHelperABI} from "../../abis/MarketplaceHelper.json"

export class MarketplaceHelper {
  private config: SdkConfig
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      Addresses.MarketplaceHelper[this.config.publicClient.chain!.id] ===
      undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain!.id
      )
    }
  }

  wethToMedia(fee) {
    return Uniswap.encodePath(
      [
        Addresses.WETH9[this.config.publicClient.chain!.id],
        Addresses.MediaERC20[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }
  mediaToWeth(fee) {
    return Uniswap.encodePath(
      [
        Addresses.MediaERC20[this.config.publicClient.chain!.id],
        Addresses.WETH9[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: Addresses.MarketplaceHelper[this.config.publicClient.chain!.id],
        abi: MarketplaceHelperABI,
        functionName: functionName,
        args: args,
      })
    } catch (error) {
      throw error
    }
  }
  async execute(functionName, args, value = 0n) {
    try {
      const { request } = await this.config.publicClient.simulateContract({
        address: Addresses.MarketplaceHelper[this.config.publicClient.chain!.id],
        abi: MarketplaceHelperABI,
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

  async addLiquidityAndRegisterWithETH({
    marketplaceId,
    label,
    publicKey,
    minMediaAmountOut,
    slippage,
    amount,
    pairFee = 500,
  }) {
    return await this.execute(
      "addLiquidityAndRegisterWithETH",
      [
        marketplaceId,
        label,
        publicKey,
        minMediaAmountOut,
        this.wethToMedia(pairFee),
        slippage,
      ],
      amount
    )
  }

  async addLiquidityAndRegister({
    marketplaceId,
    inputToken,
    inputAmount,
    label,
    publicKey,
    slippage,
    pairFee = 500,
  }) {
    let minWethAmountOut = 0
    let minMediaAmountOut = 0

    let inputToWeth = Uniswap.encodePath(
      [inputToken, Addresses.WETH9[this.config.publicClient.chain!.id]],
      [pairFee]
    )

    let inputToWethToMediaPath = Uniswap.encodePath(
      [
        inputToken,
        Addresses.WETH9[this.config.publicClient.chain!.id],
        Addresses.MediaERC20[this.config.publicClient.chain!.id],
      ],
      [pairFee, pairFee]
    )

    let paths = [inputToWeth, inputToWethToMediaPath]

    return await this.execute("addLiquidityAndRegister", [
      marketplaceId,
      inputToken,
      inputAmount,
      label,
      publicKey,
      minWethAmountOut,
      minMediaAmountOut,
      paths,
      slippage,
    ])
  }

  async swapAndCreateDealWithETH({
    marketplaceId,
    resourceId,
    offerId,
    sharedKeyCopy,
    minMediaAmountOut,
    amount,
    pairFee = 500,
  }) {
    return await this.execute(
      "swapAndCreateDealWithETH",
      [
        marketplaceId,
        resourceId,
        offerId,
        sharedKeyCopy,
        minMediaAmountOut,
        this.wethToMedia(pairFee),
      ],
      amount
    )
  }

  async swapAndCreateDeal({
    marketplaceId,
    inputToken,
    inputAmount,
    resourceId,
    offerId,
    sharedKeyCopy,
    minMediaAmountOut,
    pairFee = 500,
  }) {

    let inputToWethToMediaPath = Uniswap.encodePath(
      [
        inputToken,
        Addresses.WETH9[this.config.publicClient.chain!.id],
        Addresses.MediaERC20[this.config.publicClient.chain!.id],
      ],
      [pairFee, pairFee]
    )

    return await this.execute("swapAndCreateDeal", [
      marketplaceId,
      inputToken,
      inputAmount,
      resourceId,
      offerId,
      sharedKeyCopy,
      minMediaAmountOut,
      inputToWethToMediaPath,
    ])
  }

  async swapAndCreateDealsWithETH({
    marketplaceId,
    resourceId,
    offerIds,
    sharedKeyCopies,
    minMediaAmountOut,
    amount,
    pairFee = 500,
  }) {
    return await this.execute(
      "swapAndCreateDealsWithETH",
      [
        marketplaceId,
        resourceId,
        offerIds,
        sharedKeyCopies,
        minMediaAmountOut,
        this.wethToMedia(pairFee),
      ],
      amount
    )
  }
}