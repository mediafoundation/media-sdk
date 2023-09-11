const env = require('/config/env')
const {BigNumber} = require("ethers");

module.exports = {

  getDeals: async function (contract, start, count) {
    let deals = []

    let paginatorIndex = start
    let steps = count

    try {
      let result = await contract.methods.getPaginatedDeals(env.MARKETPLACE_ID, env.WALLET, true, paginatorIndex, steps).call()

      //console.log("Deal 1: ", result._deals)
      deals.push(...result._deals)

      if(result._totalDeals > deals.length){
        let totalDeals = result._totalDeals
        for (let i = 1; i * steps < totalDeals; i++) {
          let result = await contract.methods.getPaginatedDeals(env.MARKETPLACE_ID, env.WALLET, true, paginatorIndex, steps).call()
          deals.push(...result._deals)
        }

        if(totalDeals > deals.length){
          let result = await contract.methods.getPaginatedDeals(env.MARKETPLACE_ID, env.WALLET, true, paginatorIndex, steps).call()
          deals.push(...result._deals)
        }
      }

      return deals
    } catch (error) {
      return error
    }
  },

  dealIsActive: async function (deal) {
    let unixTime = BigNumber.from(Math.floor(Date.now() / 1000));

    let billingStart = deal.status ? deal.status['billingStart'] : deal.billingStart
    let elapsedTime = unixTime.sub(billingStart);
    let totalTime = BigNumber.from(deal.blockedBalance).div(deal.pricePerSecond);
    totalTime.sub(elapsedTime);
    let calculatedEnd = BigNumber.from(billingStart).add(totalTime);
    let d = new Date(calculatedEnd * 1000);
    const pad2 = (n) => { return (n < 10 ? '0' : '') + n }
    let formattedCalculatedEnd = pad2(d.getFullYear()) + '-' + pad2(d.getMonth()+1) + '-' + pad2(d.getDate()) + "T" + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());

    return Date.parse(formattedCalculatedEnd) > Date.now()
  },

  compareDealsResourcesWithResources: async function (dealsIds, resourcesIds) {
    let difference = [];
    let set1 = new Set(dealsIds);
    for (let i = 0; i < resourcesIds.length; i++) {
      if (!set1.has(resourcesIds[i])) {
        difference.push(resourcesIds[i]);
      }
    }
    return difference;
  },

  getSingleDeal: async function (contract, dealId){
    return await contract.methods.getDeal(env.MARKETPLACE_ID, dealId).call()
  }

}