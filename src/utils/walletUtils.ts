import {mnemonicToSeed} from "@metamask/scure-bip39";
import {Account, HDAccount, HDKey, hdKeyToAccount, privateKeyToAccount} from "viem/accounts";
import {wordlist} from "@metamask/scure-bip39/dist/wordlists/english";
import {Hex} from "viem"

export class WalletUtils {
  /**
   * Creates a Hierarchical Deterministic Account from a mnemonic.
   * @Param mnemonic mnemonic phrase
   * @param accountIndex Account index-linked from mnemonic, default is 0
   * @returns {Promise<HDAccount>} The HD Account.
   */
  static async mnemonicToHDAccount(mnemonic: string, accountIndex: number = 0): Promise<HDAccount> {
    const seed = await mnemonicToSeed(mnemonic, wordlist)
    const hdKey = HDKey.fromMasterSeed(seed)
    return hdKeyToAccount(hdKey, {
      addressIndex: accountIndex
    })
  }

  /**
   * Creates an Account from a private key.
   * @param {Hex} privateKey - The private key in hexadecimal format: `0x${string}`.
   * @returns {Promise<Account>} The account derived from the private key.
   */
  static async privateKeyToAccount(privateKey: Hex): Promise<Account> {
    return privateKeyToAccount(privateKey)
  }
}