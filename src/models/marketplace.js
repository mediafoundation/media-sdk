const addresses = require("./../../contractAddresses.json")
const MarketplaceAbi = require("./../../abis/Marketplace.json")
const {getConfig} = require("../config/config");

class Marketplace {

    constructor() {

        this.config = getConfig()

        if (addresses.Marketplace.networks[this.config.publicClient.chain.id] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.publicClient.chain.id)
        }
    }
    
    async view(functionName, args) {
        try {
            return await this.config.publicClient.readContract({
                address: addresses.Marketplace.networks[this.config.publicClient.chain.id].address,
                abi: MarketplaceAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
        }
    }

    async execute(functionName, args) {
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Marketplace.networks[this.config.publicClient.chain.id].address,
                abi: MarketplaceAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
        }
    }

    async createOffer(marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata) {
        return await this.execute('createOffer', [marketPlaceId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriods, singlePeriodOnly, metadata])
    }

    async updateOffer(marketPlaceId, offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata) {
        return await this.execute('updateOffer', [marketPlaceId, offerId, maximumDeals, autoAccept, pricePerSecond, minDealDuration, billFullPeriod, singlePeriodOnly, metadata])
    }

    async deleteOffer(marketPlaceId, offerId) {
        return await this.execute('deleteOffer', [marketPlaceId, offerId])
    }

    async createDeal(marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy) {
        return await this.execute('createDeal', [marketPlaceId, resourceId, offerId, blockedBalance, sharedKeyCopy])
    }

    async createDeals(marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy) {
        return await this.execute('createDeals', [marketPlaceId, resourceId, offersId, blockedBalance, sharedKeyCopy])
    }

    async acceptDeal(marketPlaceId, dealId) {
        return await this.execute('acceptDeal', [marketPlaceId, dealId])
    }

    async rejectDeal(marketPlaceId, dealId) {
        return await this.execute('rejectDeal', [marketPlaceId, dealId])
    }

    async cancelDeal(marketPlaceId, dealId) {
        return await this.execute('cancelDeal', [marketPlaceId, dealId])
    }

    async cancelAllDeals(marketPlaceId, resourceId) {
        return await this.execute('cancelAllDeals', [marketPlaceId, resourceId])
    }

    async initializeMarketplace(requiredStake, marketFeeTo, marketFeeRate) {
        return await this.execute('initializeMarketplace', [requiredStake, marketFeeTo, marketFeeRate])
    }

}

module.exports = Marketplace