const { initSdk, getConfig } = require("./src/config/config");
const Marketplace = require("./src/models/marketplace");
const MarketplaceViewer = require("./src/models/marketplaceViewer");
const Resources = require("./src/models/resources");
const Encryption = require("./src/utils/encryption");
const EventHandler = require("./src/models/eventsHandler");
const Blockchain = require("./src/utils/blockchain");
const MarketplaceHelper = require("./src/models/marketplaceHelper");

const config = getConfig;

module.exports = {
  initSdk,
  config,
  Marketplace,
  MarketplaceViewer,
  Resources,
  Encryption,
  EventHandler,
  Blockchain,
  MarketplaceHelper,
};
