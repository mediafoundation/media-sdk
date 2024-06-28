import bn from "bignumber.js";
import {FeeAmount} from "@uniswap/v3-sdk";
import {getAddress} from "viem";

const ADDR_SIZE = 20
const FEE_SIZE = 3
const OFFSET = ADDR_SIZE + FEE_SIZE
const DATA_SIZE = OFFSET + ADDR_SIZE

export class Uniswap {
  static calculateSqrtPriceX96(reserveA, reserveB) {
    return bn(reserveA).div(reserveB).sqrt().multipliedBy(bn(2).pow(96))
  }

  static encodePath(path: string[], fees: FeeAmount[]): string {
    if (path.length != fees.length + 1) {
      throw new Error('path/fee lengths do not match')
    }

    let encoded = '0x'
    for (let i = 0; i < fees.length; i++) {
      // 20 byte encoding of the address
      encoded += path[i].slice(2)
      // 3 byte encoding of the fee
      encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, '0')
    }
    // encode the final token
    encoded += path[path.length - 1].slice(2)

    return encoded.toLowerCase()
  }

  static decodeOne(tokenFeeToken: Buffer): [[string, string], number] {
    // reads the first 20 bytes for the token address
    const tokenABuf = tokenFeeToken.subarray(0, ADDR_SIZE)
    const tokenA = getAddress('0x' + tokenABuf.toString('hex'))

    // reads the next 2 bytes for the fee
    const feeBuf = tokenFeeToken.subarray(ADDR_SIZE, OFFSET)
    const fee = feeBuf.readUIntBE(0, FEE_SIZE)

    // reads the next 20 bytes for the token address
    const tokenBBuf = tokenFeeToken.subarray(OFFSET, DATA_SIZE)
    const tokenB = getAddress('0x' + tokenBBuf.toString('hex'))

    return [[tokenA, tokenB], fee]
  }

  /*static readBigEndian(buffer, size) {
    let value = 0
    for (let i = 0; i < size; i++) {
      value = (value << 8) | buffer[i]
    }
    return value
  }*/

  /*static arrayBufferToHex(buffer) {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => x.toString(16).padStart(2, "0"))
      .join("")
  }*/

  static decodePath(path: string): [string[], number[]] {
    let data = Buffer.from(path.slice(2), 'hex')

    let tokens: string[] = []
    let fees: number[] = []
    let i = 0
    let finalToken: string = ''
    while (data.length >= DATA_SIZE) {
      const [[tokenA, tokenB], fee] = this.decodeOne(data)
      finalToken = tokenB
      tokens = [...tokens, tokenA]
      fees = [...fees, fee]
      data = data.subarray((i + 1) * OFFSET)
      i += 1
    }
    tokens = [...tokens, finalToken]

    return [tokens, fees]
  }

}
