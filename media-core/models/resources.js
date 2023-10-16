import addresses from "../../contractAddresses.json" assert {type: "json"};
import ResourcesAbi from "../../abis/Resources.json" assert {type: "json"};
import Marketplace from "./marketplace.js";
import MarketplaceAbi from "../../abis/Marketplace.json";

export default class Resources extends Marketplace {
    networkId
    walletClient
    publicClient

    constructor(walletClient, publicClient, marketPlaceId = 1, networkId = 1) {
        super(walletClient, publicClient, marketPlaceId, networkId)
        this.networkId = networkId
        this.walletClient = walletClient;
        this.publicClient = publicClient;

        if (addresses.Resources.networks[this.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.networkId)
        }
    }

    async addResource(encryptedData, sharedKeyCopy, ownerKeys){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Resources.networks[this.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'addResource',
                args: [encryptedData, sharedKeyCopy, ownerKeys]
            })
        } catch (error) {
            return error
        }
    }

    async updateResource(id, encryptedData){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Resources.networks[this.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'updateResource',
                args: [id, encryptedData]
            })
        } catch (error) {
            return error
        }
    }

    async removeResource(id, ownerKeys){
        try {
            return await this.walletClient.writeContract({
                address: addresses.Resources.networks[this.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'removeResource',
                args: [id, ownerKeys]
            })
        } catch (error) {
            return error
        }
    }

    //todo adapt like in the marketplace viewer
    async getPaginatedResources(userAddress, start, count){
        try {
            return await this.publicClient.readContract({
                address: addresses.Resources.networks[this.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: 'getPaginatedResources',
                args: [userAddress, start, count]
            })
        } catch (error) {
            return error
        }
    }
}