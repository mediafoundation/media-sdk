const addresses = require("./../../contractAddresses.json")
const ResourcesAbi = require("./../../abis/Resources.json")
const {getConfig} = require("../config/config");

class Resources {

    constructor() {
        this.config = getConfig()

        if (addresses.Resources.networks[this.config.publicClient.chain.id] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.publicClient.chain.id)
        }
    }

    async view(functionName, args) {
        try {
            return await this.config.publicClient.readContract({
                address: addresses.Resources.networks[this.config.publicClient.chain.id].address,
                abi: ResourcesAbi.abi,
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
                address: addresses.Resources.networks[this.config.publicClient.chain.id].address,
                abi: ResourcesAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
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

    async getPaginatedResources(userAddress, start = 0, steps = 20) {
        return await this.view('getPaginatedResources', [userAddress, start, steps])
    }

    async getAllResourcesPaginating(userAddress, start = 0, steps = 20) {
        let resources = []

        let _steps = BigInt(steps)
        let _start = BigInt(start)

        let result = await this.view('getPaginatedResources', [userAddress, _start, _steps])
        resources.push(...result[0])

        if (result[1] > resources.length) {
            let totalResources = result[1]
            for (let i = BigInt(1); i * _steps < totalResources; i++) {
                let result = await this.view('getPaginatedResources', [userAddress, _start + i * _steps, _steps])
                resources.push(...result[0])
            }

            if (totalResources > resources.length) {
                let result = await this.view('getPaginatedResources', [userAddress, _start + totalResources, totalResources - BigInt(resources.length)])
                resources.push(...result[0])
            }
        }

        return resources
    }
}

module.exports = Resources