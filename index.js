const Marketplace = require("./src/models/marketplace.js")
const {init} = require("./src/config/config");

/*class MediaSdk extends Marketplace {
    constructor(privateKey, chainOptions, rpcUrl, walletClient) {
        if(privateKey === undefined && walletClient === undefined){
            throw "Either privateKey or walletClient must be provided"
        }

        if(walletClient === undefined && privateKey !== undefined){
            walletClient = generateWalletClient(privateKey, chainOptions, rpcUrl)
        }

        super(
            walletClient,
            generatePublicClient(chainOptions, rpcUrl),
            chainOptions.marketPlaceId,
            chainOptions.id
        );
    }
}*/


module.exports = {
    init,
    Marketplace
}
