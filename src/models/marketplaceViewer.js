const addresses = require("./../../contractAddresses.json");
const MarketplaceViewerAbi = require("../../abis/MarketplaceViewer.json");
const { getConfig } = require("../config/config");

class MarketplaceViewer {
  constructor() {
    this.config = getConfig();

    if (
      addresses.MarketplaceViewer[this.config.publicClient.chain.id] ===
      undefined
    ) {
      throw new Error(
        "MarketplaceViewer address not found for network id: " +
          this.config.publicClient.chain.id
      );
    }
  }

  async view(functionName, args) {
    try {
      return await this.config.publicClient.readContract({
        address: addresses.MarketplaceViewer[this.config.publicClient.chain.id],
        abi: MarketplaceViewerAbi.abi,
        functionName: functionName,
        args: args,
      });
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedOffers({ marketPlaceId, start = 0, steps = 20 }) {
    return await this.view("getAllOffers", [marketPlaceId, start, steps]);
  }

  async getAllOffersPaginating({ marketPlaceId, start = 0, steps = 20 }) {
    let offers = [];

    let _steps = BigInt(steps);
    let _start = BigInt(start);

    let result = await this.view("getAllOffers", [
      marketPlaceId,
      _start,
      _steps,
    ]);
    offers.push(...result[0]);

    if (result[1] > offers.length) {
      let totalOffers = result[1];
      for (let i = BigInt(1); i * _steps < totalOffers; i++) {
        let result = await this.view("getAllOffers", [
          marketPlaceId,
          _start + i * _steps,
          _steps,
        ]);
        offers.push(...result[0]);
      }

      if (totalOffers > offers.length) {
        let result = await this.view("getAllOffers", [
          marketPlaceId,
          _start + totalOffers,
          totalOffers - BigInt(offers.length),
        ]);
        offers.push(...result[0]);
      }
    }

    return offers;
  }

  async getPaginatedDeals({
    marketPlaceId,
    address,
    isProvider = false,
    start = 0,
    steps = 20,
  }) {
    return await this.view("getPaginatedDeals", [
      marketPlaceId,
      address,
      isProvider,
      start,
      steps,
    ]);
  }

  async getAllDealsPaginating({
    marketPlaceId,
    address,
    isProvider = false,
    start = 0,
    steps = 20,
  }) {
    let deals = [];

    let _steps = BigInt(steps);
    let _start = BigInt(start);

    let result = await this.view("getPaginatedDeals", [
      marketPlaceId,
      address,
      isProvider,
      _start,
      _steps,
    ]);
    deals.push(...result[0]);

    if (result[1] > deals.length) {
      let totalDeals = result[1];
      for (let i = BigInt(1); i * _steps < totalDeals; i++) {
        let result = await this.view("getPaginatedDeals", [
          marketPlaceId,
          address,
          isProvider,
          _start + i * _steps,
          _steps,
        ]);
        deals.push(...result[0]);
      }

      if (totalDeals > deals.length) {
        let result = await this.view("getPaginatedDeals", [
          marketPlaceId,
          address,
          isProvider,
          _start + totalDeals,
          totalDeals - BigInt(deals.length),
        ]);
        deals.push(...result[0]);
      }
    }

    return deals;
  }
}

module.exports = MarketplaceViewer;
