const env = require("../config/env")
const {ethSigDecrypt, decrypt} = require("../utils/decrypt")

module.exports = {

  getResources: async function (contract, start, count) {
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
  },

  /*Resources.compareDealsResourcesWithResources = async (dealsIds, resourcesIds) => {
    let difference = [];
    let set1 = new Set(dealsIds);
    for (let i = 0; i < resourcesIds.length; i++) {
      if (!set1.has(resourcesIds[i])) {
        difference.push(resourcesIds[i]);
      }
    }
    return difference;
  }*/

  getSingleResource: async function(contract, resourceId) {
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

}