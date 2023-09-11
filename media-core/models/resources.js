const crypto = require('crypto');
const ethSigUtil = require('@metamask/eth-sig-util');
const env = require("../config/env")

module.exports = (sequelize, DataTypes) => {

    const Resources = sequelize.define('Resources', {
            id: {type: DataTypes.STRING, primaryKey: true},
            owner: DataTypes.STRING,
            label: DataTypes.STRING,
            protocol: DataTypes.STRING,
            origin: DataTypes.STRING,
            path: DataTypes.STRING,
            domain: DataTypes.STRING,
            network: DataTypes.STRING,
        }, {freezeTableName: true}
    )

    const ethSigDecrypt = async (encryptedData, privateKey) => {

        return ethSigUtil.decrypt({
            encryptedData: JSON.parse(Buffer.from(encryptedData.slice(2), 'hex').toString('utf8')),
            privateKey: privateKey
        });
    }

    const decrypt = async (key, iv, tag, resourceData) => {
        let decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(key, 'base64'),
            Buffer.from(iv, "base64")
        );
        decipher.setAuthTag(Buffer.from(tag, "base64"));
        let decrypted = decipher.update(resourceData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    Resources.getPaginatedResources = async (contract, start, count) => {
        let resources = []

        let paginatorIndex = start
        let steps = count
        let result = await contract.methods.getPaginatedResources(env.WALLET, paginatorIndex, steps).call()

        try {
            //resources.push(...result._resources)
            for (const resource of result._resources) {
                try{
                    let attr = JSON.parse(resource.encryptedData)
                    let decryptedSharedKey = await ethSigDecrypt(
                        resource.encryptedSharedKey,
                        env.PRIVATE_KEY
                    );

                    let decrypted = await decrypt(
                        decryptedSharedKey,
                        attr.iv,
                        attr.tag,
                        attr.encryptedData
                    );

                    resources.push({resource_id: resource.id, owner: resource.owner, data: decrypted})
                } catch(e){
                    console.log("Couldn't decrypt resource. Raw data ", resource)
                    resources.push("")
                }
                
            }

            if(result._totalResources > resources.length){
                let totalResources = result._totalResources
                for (let i = 1; i * steps < totalResources; i++) {
                    let result = await contract.methods.getPaginatedResources(env.WALLET, steps * i, steps).call()
                    for (const resource of result._resources) {
                        try{
                            let attr = JSON.parse(resource.encryptedData)
                            let decryptedSharedKey = await ethSigDecrypt(
                                resource.encryptedSharedKey,
                                env.PRIVATE_KEY
                            );
        
                            let decrypted = await decrypt(
                                decryptedSharedKey,
                                attr.iv,
                                attr.tag,
                                attr.encryptedData
                            );
        
                            resources.push({resource_id: resource.id, owner: resource.owner, data: decrypted})
                        } catch(e){
                            console.log("Couldn't decrypt resource. Raw data ", resource)
                            resources.push("")
                        }
                    }
                }

                if(totalResources > resources.length){
                    let result = await contract.methods.getPaginatedResources(env.WALLET, resources.length, totalResources - resources.length).call()
                    for (const resource of result._resources) {
                        try{
                            let attr = JSON.parse(resource.encryptedData)
                            let decryptedSharedKey = await ethSigDecrypt(
                                resource.encryptedSharedKey,
                                env.PRIVATE_KEY
                            );
        
                            let decrypted = await decrypt(
                                decryptedSharedKey,
                                attr.iv,
                                attr.tag,
                                attr.encryptedData
                            );
        
                            resources.push({resource_id: resource.id, owner: resource.owner, data: decrypted})
                        } catch(e){
                            console.log("Couldn't decrypt resource. Raw data", resource)
                            resources.push("")
                        }
                    }
                }
            }

            return resources.filter((str) => str !== '')
        } catch (e) {
            if(e.message === "Internal JSON-RPC error.") {
                e.message = e.data.message;
            }
            e.message = e.message.replace("VM Exception while processing transaction: revert","");
            console.log(e.message);
        }

        return resources
    }

    Resources.addRecord = async (resource) => {
        let evm_record = await Resources.findOne({
            where: {
                id: resource.id
            }
        })
        if(evm_record){
            await evm_record.set(resource)
            let changed = evm_record.changed()
            evm_record.save()
            return changed
        } else {
            evm_record = await Resources.create(resource)
            console.log("Created resource in evm table: ", resource.id)
        }
        return true
    }

    Resources.formatDataToDb = (resource_id, owner, data, network) => {
        let parsedData = JSON.parse(data)
        parsedData.id = resource_id + "_" + network.network_id + "_" + network.chain_id + "_" + env.MARKETPLACE_ID
        parsedData.owner = owner
        parsedData.label = parsedData.label ? parsedData.label : ""
        parsedData.protocol = parsedData.protocol ? parsedData.protocol : ""
        parsedData.origin = parsedData.origin ? parsedData.origin : ""
        parsedData.path = parsedData.path ? parsedData.path : ""
        parsedData.domain = parsedData.domain ? parsedData.domain : ""
        parsedData.network = network.name ? network.name : ""

        return parsedData
    }

    Resources.compareBlockchainAndDbData = async (blockchainIds) => {
        let difference = [];
        let rawDbResources = await Resources.findAll({attributes: ['id']})
        let dbResourcesIds = rawDbResources.map(row => row.id)
        let set1 = new Set(blockchainIds);
        for (let i = 0; i < dbResourcesIds.length; i++) {
            if (!set1.has(dbResourcesIds[i])) {
                difference.push(dbResourcesIds[i]);
            }
        }
        return difference;

    }

    Resources.compareDealsResourcesWithResources = async (dealsIds, resourcesIds) => {
        let difference = [];
        let set1 = new Set(dealsIds);
        for (let i = 0; i < resourcesIds.length; i++) {
            if (!set1.has(resourcesIds[i])) {
                difference.push(resourcesIds[i]);
            }
        }
        return difference;
    }

    Resources.deleteRecords = async (ids) => {
        for (const id of ids) {
            let row = await Resources.findOne({where: { id: id }})
            if(row){
                await row.destroy()
                if(env.debug) console.log("Deleted resource in evm table: ", id)
            } else {
                if(env.debug) console.log("Resource not found ID", id);
            }
        }
    }

    Resources.getResources = async () => {
        let resources = []
        let resourcesInDb =  await Resources.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
        resourcesInDb.forEach(resource => {
            resources.push(resource.dataValues)
        })
        return resources
    }

    Resources.getResource = async (contract, resourceId) => {
        let resource = await contract.methods.getResource(resourceId, env.WALLET).call()
        try{
            let attr = JSON.parse(resource.encryptedData)
            let decryptedSharedKey = await ethSigDecrypt(
                resource.encryptedSharedKey,
                env.PRIVATE_KEY
            );

            let decrypted = await decrypt(
                decryptedSharedKey,
                attr.iv,
                attr.tag,
                attr.encryptedData
            );

            return {resource_id: resource.id, owner: resource.owner, data: decrypted}
        } catch(e){
            console.log("Couldn't decrypt resource. Raw data", resource)
            return false
        }
        
    }

    Resources.getResourceById = async (resourceId) => {
        let resource = await Resources.findOne({
            where: {
                id: resourceId
            }
        })

        return resource
    }

    //Resources.sync({force: state.resetDb})
    return Resources

}