import {verifyMessage, verifyTypedData} from "viem";
import {Sdk} from "../config/sdk";


export class Signer {
  private config
  constructor(sdkInstance: Sdk) {
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
