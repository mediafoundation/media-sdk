const viem = require("viem")
const bn = require("bignumber.js")

const ADDR_SIZE = 20
const FEE_SIZE = 3
const OFFSET = ADDR_SIZE + FEE_SIZE
const DATA_SIZE = OFFSET + ADDR_SIZE

class Uniswap {
  static calculateSqrtPriceX96(reserveA, reserveB) {
    return bn(reserveA).div(reserveB).sqrt().multipliedBy(bn(2).pow(96))
  }

  static encodePath(path, fees) {
    if (path.length !== fees.length + 1) {
      throw new Error("path/fee lengths do not match")
    }

    let encoded = "0x"
    for (let i = 0; i < fees.length; i++) {
      encoded += path[i].slice(2)
      encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0")
    }
    encoded += path[path.length - 1].slice(2)

    return encoded.toLowerCase()
  }

  static decodeOne(tokenFeeToken) {
    const tokenABuf = tokenFeeToken.slice(0, ADDR_SIZE)
    const tokenA = viem.getAddress("0x" + this.arrayBufferToHex(tokenABuf))

    const feeBuf = tokenFeeToken.slice(ADDR_SIZE, OFFSET)
    // Read fee as a 3-byte big-endian integer
    const fee = this.readBigEndian(feeBuf, FEE_SIZE)

    const tokenBBuf = tokenFeeToken.slice(OFFSET, DATA_SIZE)
    const tokenB = viem.getAddress("0x" + this.arrayBufferToHex(tokenBBuf))

    return [[tokenA, tokenB], fee]
  }

  static readBigEndian(buffer, size) {
    let value = 0
    for (let i = 0; i < size; i++) {
      value = (value << 8) | buffer[i]
    }
    return value
  }

  static arrayBufferToHex(buffer) {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => x.toString(16).padStart(2, "0"))
      .join("")
  }

  static decodePath(path) {
    let data = new Uint8Array(
      path
        .slice(2)
        .match(/.{1,2}/g)
        .map((byte) => parseInt(byte, 16))
    )

    let tokens = []
    let fees = []
    let i = 0
    let finalToken = ""
    while (data.length >= DATA_SIZE) {
      const [[tokenA, tokenB], fee] = this.decodeOne(data, FEE_SIZE)
      finalToken = tokenB
      tokens = [...tokens, tokenA]
      fees = [...fees, fee]
      data = data.slice((i + 1) * OFFSET)
      i += 1
    }
    tokens = [...tokens, finalToken]

    return [tokens, fees]
  }
}

module.exports = Uniswap
