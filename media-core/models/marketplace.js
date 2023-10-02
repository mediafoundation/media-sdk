import MarketplaceViewerAbi from "../../abis/MarketplaceViewer.json" assert { type: "json" };
import addresses from "../../contractAddresses.json" assert { type: "json" };
import {formatUnits} from "viem";

export default class Marketplace {
  networkId
  walletClient
   publicClient
   marketPlaceId

  constructor(walletClient, publicClient, marketPlaceId = 1, networkId = 1) {
    this.networkId = networkId
    this.walletClient = walletClient;
    this.publicClient = publicClient;
    this.marketPlaceId = marketPlaceId;

    console.log(addresses.MarketplaceViewer.networks[418])

    if(addresses.MarketplaceViewer.networks[this.networkId] === undefined){
      throw new Error('MarketplaceViewer address not found for network id: ' + this.networkId)
    }
  }

  /*async registerProvider (marketplaceId: any, label: any, publicKey: any, stakeAmount: any) {
    try {
      let result = await this.walletClient.writeContract({
        address: addresses.MarketplaceViewer[this.networkId],
        abi: MarketplaceViewerAbi.abi,
        functionName: 'registerProvider',
        args: [marketplaceId, label, publicKey, stakeAmount]
      })


    }catch (e) {
      throw e
    }
  }*/

  async getDeals(start, count) {
    let deals = []

    let paginatorIndex = start
    let steps = count

    try {
      console.log("Address", addresses.MarketplaceViewer.networks[this.networkId], this.networkId)
      let result = await this.publicClient.readContract({
        address: addresses.MarketplaceViewer.networks[this.networkId].address,
        abi: MarketplaceViewerAbi.abi,
        functionName: 'getPaginatedDeals',
        args: [1, this.walletClient.account.address, true, paginatorIndex, steps]
      })
      deals.push(...result[0])

      if(result[1] > deals.length){
        let totalDeals = result[1]
        for (let i = 1; i * steps < totalDeals; i++) {
          let result = await this.publicClient.readContract({
            address: addresses.MarketplaceViewer[this.networkId],
            abi: MarketplaceViewerAbi.abi,
            functionName: 'getPaginatedDeals',
            args: [this.marketPlaceId, this.walletClient.account.address, true, steps * i, steps]
          })
          deals.push(...result[0])
        }

        if(totalDeals > deals.length){
          let result = await this.publicClient.readContract({
            address: addresses.MarketplaceViewer[this.networkId],
            abi: MarketplaceViewerAbi.abi,
            functionName: 'getPaginatedDeals',
            args: [this.marketPlaceId, this.walletClient.account.address, true, deals.length, totalDeals - deals.length]
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