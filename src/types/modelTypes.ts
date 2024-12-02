import {Address} from "viem";
import {FeeAmount} from "@uniswap/v3-sdk";

export interface Deal {
  id: bigint,
  offerId: bigint,
  client: Address,
  provider: Address,
  resourceId: bigint,
  totalPayment: bigint,
  blockedBalance: bigint,
  terms: {
    pricePerSecond: bigint,
    minDealDuration: bigint,
    billFullPeriods: boolean,
    singlePeriodOnly: boolean,
    metadata: string
  },
  status: {
    active: true,
    createdAt: bigint,
    acceptedAt: bigint,
    billingStart: bigint,
    cancelled: boolean,
    cancelledAt: bigint
  }
}

export interface Offer {
  id: bigint,
  provider: Address,
  publicKey: string,
  maximumDeals: bigint,
  autoAccept: boolean,
  terms: {
    pricePerSecond: bigint,
    minDealDuration: bigint,
    billFullPeriods: boolean,
    singlePeriodOnly: boolean,
    metadata: string
  }
}

export interface ProviderMetadata {
  provider: Address,
  metadata: string,
  publicKey: string
}

export interface ContractEvent {
  address: Address;
  blockHash: string;
  blockNumber: bigint;
  data: string;
  logIndex: number;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: number;
  args: {[index: string | number]: string | boolean | bigint | number};
  eventName: string;
}

export interface CreateOfferParams  {
  marketplaceId: number
  maximumDeals: number
  autoAccept: boolean
  pricePerSecond: number
  minDealDuration: number
  billFullPeriods: boolean
  singlePeriodOnly: boolean
  metadata: string
}

export interface UpdateOfferParams  {
  marketplaceId: string | number | bigint
  offerId: number
  maximumDeals: number
  autoAccept: boolean
  pricePerSecond: number
  minDealDuration: number
  billFullPeriod: boolean
  singlePeriodOnly: boolean
  metadata: string
}

export interface DeleteOfferParams  {
  marketplaceId: string | number | bigint
  offerId: number
}

export interface CreateDealParams  {
  marketplaceId: string | number | bigint
  resourceId: string
  offerId: number
  blockedBalance: number
  sharedKeyCopy: string
}

export interface CreateDealsParams  {
  marketplaceId: number | string | bigint
  resourceId: string | number | bigint
  offersId: number[]
  blockedBalance: number
  sharedKeyCopies: string[]
}

export interface CancelDealsParams  {
  marketplaceId: number | string | bigint
  resourceId: string
}

export interface DealOperationParams  {
  marketplaceId: number | string | bigint
  dealId: number | string | bigint
}

export interface OfferOperationParams  {
  marketplaceId: number | string | bigint
  offerId: number
}

export interface InitializeMarketplaceParams  {
  requiredStake: number | string | bigint
  marketFeeTo: Address
  marketFeeRate: number | string | bigint
  metadata: string
}

export interface ProviderOperationParams  {
  marketplaceId: number | string | bigint
  provider: string
}

export interface GetPastEventParams {
  eventName: string[] | string | undefined,
  fromBlock: bigint
  toBlock: bigint
}

export interface ListenForEventsParams {
  eventName: string,
  callback: (logs: any) => void,
  onError: (error: any) => void,
}

export interface PaginationParams {
  marketplaceId: string | number | bigint
  start?: number
  steps?: number
}

export interface DealPaginationParams {
  marketplaceId: string | number | bigint
  address: string
  isProvider?: boolean
  start?: number
  steps?: number
}

export interface AddLiquidityAndRegisterWithWETHParams {
  marketplaceId: bigint | number | string
  metadata: string
  publicKey: string
  minOut: bigint[] | number[] | string[]
  path: string
  slippage: bigint | number | string
  poolFee?: FeeAmount
  amount: bigint
}

export interface AddLiquidityAndRegisterParams {
  marketplaceId: bigint | number | string
  inputToken: string
  inputAmount: bigint | number | string
  metadata: string
  publicKey: string
  minOut: bigint[] | number[] | string[]
  paths: string[]
  slippage: bigint | number | string
  poolFee?: FeeAmount
}

export interface SwapAndCreateDealWithWETHParams {
  marketplaceId: bigint | number | string
  resourceId: bigint | number | string
  offerId: bigint | number | string
  sharedKeyCopy: string
  minMediaAmountOut: bigint | number | string
  amount: bigint
  poolFee?: FeeAmount
}

export interface SwapAndCreateDealParams {
  marketplaceId: bigint | number | string
  inputToken: string
  inputAmount: bigint | number | string
  resourceId: bigint | number | string
  offerId: bigint | number | string
  sharedKeyCopy: string
  minMediaAmountOut: bigint | number | string
  path: string
}

export interface SwapAndCreateDealsWithWETHParams {
  marketplaceId: bigint | number | string
  resourceId: bigint | number | string
  offerIds: bigint[] | number[]
  sharedKeyCopies: string[]
  minMediaAmountOut: bigint | number | string
  amount: bigint
  poolFee?: FeeAmount
}

export interface SwapAndCreateDealsParams {
  marketplaceId: bigint | number | string
  inputToken: string
  inputAmount: bigint | number | string
  resourceId: bigint | number | string
  offerIds: bigint[] | number[] | string[]
  sharedKeyCopies: string[]
  minAmountOut: bigint | number | string
  path: string
}

export interface GetAverageRatingParams {
  marketplaceId: number | string | bigint
  provider: Address
}

export interface RateProviderParams {
    marketplaceId: number | string | bigint
    dealId: number | string | bigint
    rating: number | string | bigint
}

export interface RemoveRatingParams {
    marketplaceId: number | string | bigint
    dealId: number | string | bigint
}