import {mnemonicToSeed} from "@metamask/scure-bip39";
import {HDAccount, HDKey, hdKeyToAccount} from "viem/accounts";
import {wordlist} from "@metamask/scure-bip39/dist/wordlists/english";

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
}