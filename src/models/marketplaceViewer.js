const MarketplaceViewerAbi = require("./../../abis/MarketplaceViewer.json")
const addresses = require("./../../contractAddresses.json")
const {getConfig} = require("../config/config");

class MarketplaceViewer{

    constructor() {
        this.config = getConfig()

        if (addresses.MarketplaceViewer.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }
    }

    async getDeals(marketPlaceId, start, count, isProvider) {
        let deals = []

        let paginatorIndex = start
        let steps = count

        try {
            console.log("Address", addresses.MarketplaceViewer.networks[this.config.networkId], this.config.networkId)
            let result = await this.config.publicClient.readContract({
                address: addresses.MarketplaceViewer.networks[this.config.networkId].address,
                abi: MarketplaceViewerAbi.abi,
                functionName: 'getPaginatedDeals',
                args: [marketPlaceId, this.config.walletClient.account.address, isProvider, paginatorIndex, steps]
            })
            console.log("Result", result)
            deals.push(...result[0])

            if (result[1] > deals.length) {
                let totalDeals = result[1]
                for (let i = 1; i * steps < totalDeals; i++) {
                    let result = await this.config.publicClient.readContract({
                        address: addresses.MarketplaceViewer[this.config.networkId],
                        abi: MarketplaceViewerAbi.abi,
                        functionName: 'getPaginatedDeals',
                        args: [marketPlaceId, this.config.walletClient.account.address, isProvider, steps * i, steps]
                    })
                    deals.push(...result[0])
                }

                if (totalDeals > deals.length) {
                    let result = await this.config.publicClient.readContract({
                        address: addresses.MarketplaceViewer[this.config.networkId],
                        abi: MarketplaceViewerAbi.abi,
                        functionName: 'getPaginatedDeals',
                        args: [marketPlaceId, this.config.walletClient.account.address, isProvider, deals.length, totalDeals - deals.length]
                    })
                    deals.push(...result[0])
                }
            }

            return deals
        } catch (error) {
            return error
        }
    }

}

module.exports = MarketplaceViewer