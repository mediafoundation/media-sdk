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

    async execute(functionName, args){
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            return error
        }
    }

    async createOffer(marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata) {
        try {
            return await this.execute('createOffer', [marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata])
        } catch (error) {
            return error
        }
    }

    async updateOffer(marketPlaceId, offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata){
        try {
            return await this.execute('updateOffer', [marketPlaceId, offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata])
        } catch (error) {
            return error
        }
    }

    async deleteOffer(marketPlaceId, offerId){
        try {
            return await this.execute('deleteOffer', [marketPlaceId, offerId])
        } catch (error) {
            return error
        }
    }

    async createDeal(marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy){
        try {
            return await this.execute('createDeal', [marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy])
        } catch (error) {
            return error
        }
    }

    async createDeals(marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy){
        try {
            return await this.execute('createDeals', [marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy])
        } catch (error) {
            return error
        }
    }

    async acceptDeal(marketPlaceId, dealId){
        try {
            return await this.execute('acceptDeal', [marketPlaceId, dealId])
        } catch (error) {
            return error
        }
    }

    async rejectDeal(marketPlaceId, dealId){
        try {
            return await this.execute('rejectDeal', [marketPlaceId, dealId])
        } catch (error) {
            return error
        }
    }

    async cancelDeal(marketPlaceId, dealId){
        try {
            return await this.execute('cancelDeal', [marketPlaceId, dealId])
        } catch (error) {
            return error
        }
    }

    async cancelAllDeals(marketPlaceId, resourceId){
        try {
            return await this.execute('cancelAllDeals', [marketPlaceId, resourceId])
        } catch (error) {
            return error
        }
    }

    async initializeMarketplace(requiredStake, marketFeeTo, marketFeeRate){
        try {
            return await this.execute('initializeMarketplace', [requiredStake, marketFeeTo, marketFeeRate])
        } catch (error) {
            return error
        }
    }

}

module.exports = Marketplace