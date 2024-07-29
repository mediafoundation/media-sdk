export interface Deal {
  id: bigint,
  offerId: bigint,
  client: string,
  provider: string,
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
  provider: string,
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
  provider: string,
  metadata: string,
  publicKey: string
}

export interface ContractEvent {
  address: string;
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