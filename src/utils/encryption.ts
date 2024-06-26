import {createCipheriv, createDecipheriv, randomBytes} from "crypto"
import { decrypt, encrypt } from "@metamask/eth-sig-util"

export class Encryption {
  static ethSigDecrypt(encryptedData, privateKey) {
    return decrypt({
      encryptedData: JSON.parse(
          Buffer.from(encryptedData.slice(2), "hex").toString("utf8")
      ),
      privateKey: privateKey,
    })
  }

  static ethSigEncrypt(publicKey, data) {
    let encrypted = encrypt({
      publicKey: publicKey,
      data: data,
      version: "x25519-xsalsa20-poly1305",
    })
    return `0x${Buffer.from(JSON.stringify(encrypted), "utf8").toString("hex")}`
  }

  static encrypt(plaintext, sharedKey: any = false) {
    sharedKey = !sharedKey
      ? randomBytes(32)
      : Buffer.from(sharedKey, "base64")
    let iv = randomBytes(12)
    let cipher = createCipheriv("aes-256-gcm", sharedKey, iv)
    let encryptedData = cipher.update(plaintext, "utf8", "hex")
    encryptedData += cipher.final("hex")
    let tag = cipher.getAuthTag()
    return {
      sharedKey: sharedKey.toString("base64"),
      iv: iv.toString("base64"),
      tag: tag.toString("base64"),
      encryptedData: encryptedData,
    }
  }

  static decrypt(key, iv, tag, resourceData) {
    let decipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(key, "base64"),
      Buffer.from(iv, "base64")
    )
    decipher.setAuthTag(Buffer.from(tag, "base64"))
    let decrypted = decipher.update(resourceData, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  }
}
