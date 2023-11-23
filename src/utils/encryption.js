const crypt = require('crypto')
const ethSigUtil = require('@metamask/eth-sig-util')

class Encryption {
  static async ethSigDecrypt (encryptedData, privateKey) {

    return ethSigUtil.decrypt({
      encryptedData: JSON.parse(Buffer.from(encryptedData.slice(2), 'hex').toString('utf8')),
      privateKey: privateKey
    })
  }

  static async ethSigEncrypt (data, publicKey) {
    const encryptedData = ethSigUtil.encrypt(
      publicKey,
      { data },
      'x25519-xsalsa20-poly1305'
    )
    return `0x${Buffer.from(JSON.stringify(encryptedData)).toString('hex')}`
  }


  static async decrypt (key, iv, tag, resourceData) {
    let decipher = crypt.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'base64'),
      Buffer.from(iv, "base64")
    )
    decipher.setAuthTag(Buffer.from(tag, "base64"))
    let decrypted = decipher.update(resourceData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
}

module.exports = Encryption