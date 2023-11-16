const addresses = require("./../../contractAddresses.json")
const {getConfig} = require("../config/config");
const MarketplaceAbi = require("../../abis/Marketplace.json");

class MarketplaceViewer {

    constructor() {
        this.config = getConfig()

        if (addresses.MarketplaceViewer.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }
    }

    async view(functionName, args) {
        try {
            return await this.config.publicClient.writeContract({
                address: addresses.Marketplace.networks[this.config.networkId].address,
                abi: MarketplaceAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            return error
        }
    }

    async getDeals(marketPlaceId, start, count, isProvider) {
        let deals = []

        let paginatorIndex = start
        let steps = count
        let result = await this.view('getPaginatedDeals', [marketPlaceId, this.config.walletClient.account.address, isProvider, paginatorIndex, steps])
        deals.push(...result[0])

        if (result[1] > deals.length) {
            let totalDeals = result[1]
            for (let i = 1; i * steps < totalDeals; i++) {
                let result = await this.view('getPaginatedDeals', [marketPlaceId, this.config.walletClient.account.address, isProvider, paginatorIndex + i * steps, steps])
                deals.push(...result[0])
            }

            if (totalDeals > deals.length) {
                let result = await this.view('getPaginatedDeals', [marketPlaceId, this.config.walletClient.account.address, isProvider, paginatorIndex + totalDeals, totalDeals - deals.length])
                deals.push(...result[0])
            }
        }

        return deals
    }

}

module.exports = MarketplaceViewer