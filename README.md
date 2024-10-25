# Media SDK 🚀

The Media SDK is a comprehensive toolkit designed for seamless interaction with the Media Protocol's contracts. Developed in JavaScript, it harnesses the power of the [viem](https://viem.sh/) library, providing an intuitive interface for engaging with the Media Protocol.

> ⚠️ **Important Note:** The contract addresses provided are currently from testnets and are subject to change. Always refer to the official documentation for the most up-to-date and valid contract addresses before any interactions.

## 📥 Installation

### From GitHub

```bash
git clone git@github.com:mediafoundation/media-sdk.git
cd media-sdk
npm install
```

### From NPM

```bash
npm install media-sdk
```

## 🛠️ Usage

## Initializing the SDK

To initialize an instance of the Media SDK, use the `Sdk` class. This class constructor takes in an object with the following **optional** parameters:

- `chain`: A chain object. See [Viem's Chains](https://viem.sh/docs/chains/introduction#chains) for more details. If nothing is provided, the default chain will be used, which is Ethereum Goerli until mainnet launch.

- `transport`: An array of transport objects. See [Viem's Transport](https://viem.sh/docs/clients/intro#transports) for more details.

- `privateKey`: A ECP256K1 private key as a hex string to create a wallet client. Example: 'afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890'.

- `mnemonic`: A BIP39 mnemonic phrase to create a wallet client. Example: 'degree tackle suggest window test behind mesh extra cover prepare oak script'.

- `walletClient`: A wallet client. See [Viem's Wallet Client](https://viem.sh/docs/clients/wallet.html) for more details.

All parameters are optional. If all three `privateKey`, `mnemonic`, and `walletClient` are absent, only view functions will be available.

## Examples

Using a private key. (Useful for backend applications)

```javascript
import { Sdk, MarketplaceViewer, Marketplace, Resources, MarketplaceHelper } from 'media-sdk'

// initialize the sdk using a private key.
const sdk = new Sdk({ privateKey: 'afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890' })
```

Using a browser wallet:

```javascript
import { Sdk, custom, createWalletClient, validChains } from 'media-sdk'

const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})

const walletClient = createWalletClient({
    account: account,
    chain: validChains[Number(window.ethereum.chainId)],
    transport: [custom(window.ethereum)]
})

// initialize the SDK using a Viem walletClient. 
const sdk = new Sdk({ walletClient: walletClient });
```

Using it without signer just for view functions with a custom chain:

```javascript
import { Sdk, MarketplaceViewer, validChains } from 'media-sdk'

const sdk = new Sdk({ chain: validChains[85432] })

const marketplaceViewer = new MarketplaceViewer(sdk)

const result = await marketplaceViewer.getPaginatedOffers({
  marketplaceId: 1, 
  start: 0, 
  count: 100
})
console.log(result)

```

### Initializing a new Marketplace

Anybody can initialize a new marketplace. The marketplace will be initialized with the address of the caller as the owner. The owner can then transfer ownership to another address.

```javascript 
import { Sdk, MarketplaceStorage } from 'media-sdk'

// initialize the sdk using your mnemonic
const sdk = new Sdk({ mnemonic: 'degree tackle suggest window test behind mesh extra cover prepare oak script' })

// instanciate the marketplace contract
const marketplaceStorage = new MarketplaceStorage(sdk)

//initialize a new marketplace
const hash = await marketplaceStorage.initializeMarketplace({
  requiredStake: 10000000,  // marketplace min required staked liquidity 
  marketFeeTo: sdk.config.walletClient.account.address, // market fee recipient address 
  marketFeeRate: 5000, // market fee rate % (5000 = 0.5%)
  metadata: '{"name": "Test Marketplace"}',
})

// wait for the transaction to be mined
const transaction = sdk.config.publicClient.waitForTransactionReceipt( 
  { hash: hash }
)

//get the id of the new marketplace from the transaction logs
console.log(transaction.logs[0].topics[1])

```

### Fetching Resources

```javascript
// import the sdk
import { Sdk, Resources } from 'media-sdk'

// initialize the sdk using your mnemonic
const sdk = new Sdk()
const resources = new Resources(sdk)
const result = await resources.getPaginatedResources({
   userAddress: sdk.config.walletClient.account.address, 
   start: 0, 
   steps: 20 
})
console.log(result)
```

## 📚 More Information

For more details and a deep dive into our features, check out the official Media SDK documentation at [https://www.mediaprotocol.net/sdk/overview](https://www.mediaprotocol.net/sdk/overview).

## Front-End Boilerplate

If you're looking for an example to get started with a front-end application, check out our [Media Protocol Frontend Boilerplate](https://github.com/mediafoundation/media-protocol-frontend-boilerplate). It's a great way to get started with the Media Protocol and the Media SDK.

## 📝 License

This project is licensed under the MIT License.

## 📢 Stay Connected!

- [Twitter](https://twitter.com/Media_FDN)
- [Website](https://www.mediaprotocol.net)
- [NPMJS](https://www.npmjs.com/package/media-sdk)
- [GitHub](https://github.com/mediafoundation/media-sdk)
