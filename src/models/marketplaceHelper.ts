import {Sdk, SdkConfig} from "../config/sdk";
import {Uniswap} from "../utils/uniswap";
import Addresses from "../../contractAddresses.json";
import abi from "../../abis/MarketplaceHelper.json"

const ContractAddresses: typeof Addresses = Addresses
const MarketplaceHelperABI: typeof abi = abi

export class MarketplaceHelper {
  private config: SdkConfig
  constructor(sdkInstance: Sdk) {
    this.config = sdkInstance.config

    if (
      ContractAddresses.MarketplaceHelper[this.config.publicClient.chain!.id] ===
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
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }
  mediaToWeth(fee) {
    return Uniswap.encodePath(
      [
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
      ],
      [fee]
    )
  }

  async view(functionName, args) {
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
  async execute(functionName, args, value = 0n) {
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
      [inputToken, ContractAddresses.WETH9[this.config.publicClient.chain!.id]],
      [pairFee]
    )

    let inputToWethToMediaPath = Uniswap.encodePath(
      [
        inputToken,
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
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
        ContractAddresses.WETH9[this.config.publicClient.chain!.id],
        ContractAddresses.MediaERC20[this.config.publicClient.chain!.id],
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