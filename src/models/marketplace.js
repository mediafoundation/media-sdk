const addresses = require("./../../contractAddresses.json")
const MarketplaceAbi = require("./../../abis/Marketplace.json")
const {getConfig} = require("../config/config");

class Marketplace {

    constructor() {

        this.config = getConfig()

        if (addresses.Marketplace.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }
    }

    async createOffer(maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata) {
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createOffer',
                args: [this.config.marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata]
            })
        } catch (error) {
            return error
        }
    }

    async updateOffer(offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'updateOffer',
                args: [this.config.marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata]
            })
        } catch (error) {
            return error
        }
    }

    async deleteOffer(offerId){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'deleteOffer',
                args: [this.config.marketPlaceId, offerId]
            })
        } catch (error) {
            return error
        }
    }

    async createDeal(resourceId, offerId, blockedBalance, sharedKeyCopy){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createDeal',
                args: [this.config.marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy]
            })
        } catch (error) {
            return error
        }
    }

    async createDeals(resourceId, offersId, blockedBalance, sharedKeyCopy){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'createDeals',
                args: [this.config.marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy]
            })
        } catch (error) {
            return error
        }
    }

    async acceptDeal(dealId){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'acceptDeal',
                args: [this.config.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async rejectDeal(dealId){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'rejectDeal',
                args: [this.config.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async cancelDeal(dealId){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'cancelDeal',
                args: [this.config.marketPlaceId, dealId]
            })
        } catch (error) {
            return error
        }
    }

    async cancelAllDeals(resourceId){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: 'cancelAllDeals',
                args: [this.config.marketPlaceId, resourceId]
            })
        } catch (error) {
            return error
        }
    }

}

module.exports = Marketplace