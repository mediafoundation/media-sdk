const addresses = require("./../../contractAddresses.json")
const ResourcesAbi = require("./../../abis/Resources.json")
const {getConfig} = require("../config/config");
class Resources {

    constructor() {
        this.config = getConfig()

        if (addresses.Resources.networks[this.config.networkId] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.networkId)
        }
    }

    async view(functionName, args) {
        try {
            return await this.config.publicClient.writeContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            return error
        }
    }

    async execute(functionName, args) {
        try {
            return await this.config.walletClient.writeContract({
                address: addresses.Resources.networks[this.config.networkId].address,
                abi: ResourcesAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            return error
        }
    }

    async addResource(encryptedData, sharedKeyCopy, ownerKeys) {
        return await this.execute('addResource', [encryptedData, sharedKeyCopy, ownerKeys])
    }

    async updateResource(id, encryptedData) {
        return await this.execute('updateResource', [id, encryptedData])
    }

    async removeResource(id, ownerKeys) {
        return await this.execute('removeResource', [id, ownerKeys])
    }

    async getResources(userAddress, start, count) {
        let resources = []

        let steps = count

        let result = await this.view('getPaginatedResources', [userAddress, start, steps])
        resources.push(...result[0])

        if (result[1] > resources.length) {
            let totalResources = result[1]
            for (let i = 1; i * steps < totalResources; i++) {
                let result = await this.view('getPaginatedResources', [userAddress, start + i * steps, steps])
                resources.push(...result[0])
            }

            if (totalResources > resources.length) {
                let result = await this.view('getPaginatedResources', [userAddress, start + totalResources, totalResources - resources.length])
                resources.push(...result[0])
            }
        }

        return resources
    }
}

module.exports = Resources