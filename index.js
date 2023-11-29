const { initSdk, getConfig } = require("./src/config/config");
const Marketplace = require("./src/models/marketplace");
const MarketplaceViewer = require("./src/models/marketplaceViewer");
const Resources = require("./src/models/resources");
const Encryption = require("./src/utils/encryption");
const EventHandler = require("./src/models/eventsHandler");
const Blockchain = require("./src/utils/blockchain");
const Helper = require("./src/models/helper");

const config = getConfig();
const publicClient = getConfig().publicClient;
const walletClient = getConfig().walletClient;

module.exports = {
  initSdk,
  config,
  publicClient,
  walletClient,
  Marketplace,
  MarketplaceViewer,
  Resources,
  Encryption,
  EventHandler,
  Blockchain,
  Helper,
};
