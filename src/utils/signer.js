const { verifyTypedData, verifyMessage} = require("viem")

class Signer {
  constructor(sdkInstance) {
    this.config = sdkInstance.config
  }

  async signTypedMessage({ account, domain, types, primaryType, message }) {
    let signature = await this.config.walletClient.signTypedData({
      account,
      domain,
      types,
      primaryType,
      message,
    })

    return signature.hex
  }

  async signMessage({ account, message }) {
    return await this.config.walletClient.signMessage({
      account,
      message,
    })
  }

  async checkTypedSignature({
    address,
    domain,
    types,
    primaryType,
    message,
    signature,
  }) {
    return await verifyTypedData({
      address,
      domain,
      types,
      primaryType,
      message,
      signature,
    })
  }

    async verifySignature({ address, message, signature }) {
      return await verifyMessage({
          address,
          message,
          signature,
        })
    }

}

module.exports = Signer
