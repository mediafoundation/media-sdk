import {Address} from "viem";

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

export interface UpdateOfferParams  {
  marketplaceId: number
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
  marketplaceId: number
  offerId: number
}

export interface CreateDealParams  {
  marketplaceId: number
  resourceId: string
  offerId: number
  blockedBalance: number
  sharedKeyCopy: string
}

export interface CreateDealsParams  {
  marketplaceId: number
  resourceId: string
  offersId: number[]
  blockedBalance: number
  sharedKeyCopies: string[]
}

export interface CancelDealsParams  {
  marketplaceId: number
  resourceId: string
}

export interface DealOperationParams  {
  marketplaceId: number
  dealId: number
}

export interface OfferOperationParams  {
  marketplaceId: number
  offerId: number
}

export interface InitializeMarketplaceParams  {
  requiredStake: number
  marketFeeTo: string
  marketFeeRate: number
}

export interface ProviderOperationParams  {
  marketplaceId: number
  provider: string
}