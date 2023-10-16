import addresses from "../../contractAddresses.json" assert {type: "json"};
import MarketplaceAbi from "../../abis/Marketplace.json" assert {type: "json"};
import MarketplaceViewer from "./marketplaceViewer.js";

export default class Marketplace extends MarketplaceViewer {
    networkId
    walletClient
    publicClient
    marketPlaceId

    constructor(walletClient, publicClient, marketPlaceId = 1, networkId = 1) {
        super(walletClient, publicClient, marketPlaceId, networkId)
        this.networkId = networkId
        this.walletClient = walletClient;
        this.publicClient = publicClient;
        this.marketPlaceId = marketPlaceId;

        if (addresses.MarketplaceViewer.networks[this.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.networkId)
        }
    }

    async createOffer(maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata) {
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createOffer',
                args: [this.marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata]
            })
        } catch (error) {
            return error
        }
    }

    async updateOffer(offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'updateOffer',
                args: [this.marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata]
            })
        } catch (error) {
            return error
        }
    }

    async deleteOffer(offerId){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'deleteOffer',
                args: [this.marketPlaceId, offerId]
            })
        } catch (error) {
            return error
        }
    }

    async createDeal(resourceId, offerId, blockedBalance, sharedKeyCopy){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createDeal',
                args: [this.marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy]
            })
        } catch (error) {
            return error
        }
    }

    async createDeals(resourceId, offersId, blockedBalance, sharedKeyCopy){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createDeals',
                args: [this.marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy]
            })
        } catch (error) {
            return error
        }
    }

    async acceptDeal(dealId){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'acceptDeal',
                args: [this.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async rejectDeal(dealId){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'rejectDeal',
                args: [this.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async cancelDeal(dealId){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'cancelDeal',
                args: [this.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async cancelAllDeals(resourceId){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'cancelAllDeals',
                args: [this.marketPlaceId, resourceId]
            })
        } catch (error) {
            return error
        }
    }


}