# Media SDK 🚀

The Media SDK is a comprehensive toolkit designed for seamless interaction with the Media Protocol's contracts. Developed in JavaScript, it harnesses the power of the [viem](https://viem.sh/) library, providing an intuitive interface for engaging with the Media Protocol.

> ⚠️ **Important Note:** The contract addresses provided are currently from testnets and are subject to change. Always refer to the official documentation for the most up-to-date and valid contract addresses before any interactions.

## 📥 Installation

```bash
git clone git@github.com:mediafoundation/media-sdk.git # Clone the repository
cd media-sdk # Navigate to the repository
npm install # Install the necessary dependencies
```

## 🛠️ Usage

## 🔑 Initializing the SDK

To initialize an instance of the Media SDK, use the `initSdk` function. This function takes in an object with the following **optional** parameters:

- `chain`: A chain object. See [Viem's Chains](https://viem.sh/docs/clients/chains.html#utilities) for more details. If nothing is provided, the default chain will be used, which is Ethereum Goerli until mainnet launch.
- `privateKey`: A ECP256K1 private key as a hex string to create a wallet client. Example: 'afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890'.
- `walletClient`: A wallet client. See [Viem's Wallet Client](https://viem.sh/docs/clients/wallet.html) for more details. If absent, a client will be created using the `privateKey` parameter. 

All parameters are optional. If both `privateKey` and `walletClient` are absent, only view functions will be available.

## Examples

Using a private key. (Useful for backend applications)

```javascript
import { initSdk, MarketplaceViewer, Marketplace, Resources, Helper } from 'media-sdk'

initSdk({ privateKey: "YOUR_PRIVATE_KEY" })
```

Using a browser wallet and Ethereum Goerli:

```javascript
import {createWalletClient, http} from 'viem'
import {goerli} from 'viem/chains'

const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})

const walletClient = createWalletClient({
    account,
    chain: goerli,
    transport: custom(window.ethereum)
})

// Creating an instance of the Media SDK using the wallet client. 
initSdk({ walletClient: walletClient });
```

Using it just for view functions with a custom chain:

```javascript
import { baseGoerli } from 'viem/chains'

initSdk({ chain: baseGoerli })

const marketplaceViewer = new MarketplaceViewer()

const marketplaceId = 1
const start = 1
const count = 100

const result = await marketplaceViewer.getPaginatedOffers(
  marketplaceId, 
  start, 
  count
)
console.log(result)

```

### 🛒 Initializing a Marketplace

After setting up the Media SDK, you can initialize a marketplace with the `initializeMarketplace` function.

```javascript 
const requiredStake = 100 // replace with your required stake 
const marketFeeTo = '0x...'  // replace with your market fee recipient address 
const marketFeeRate = 5 // replace with your market fee rate %

const marketplace = new Marketplace(); 
const hash = await marketplace.initializeMarketplace(
  requiredStake, 
  marketFeeTo, 
  marketFeeRate
)

const publicClient = createPublicClient({
  transport: http(currentChain.rpcUrls.default.http as any),
  chain: currentChain
})

const transaction = await publicClient.waitForTransactionReceipt( 
  { hash: hash }
)
console.log(transaction);
```

### Fetching Offers

```javascript
const marketplaceViewer = new MarketplaceViewer()
const marketplaceId = 1
const start = 1
const count = 100
const result = await marketplaceViewer.getPaginatedOffers(
  marketplaceId, 
  start, 
  count
)
console.log(result)
```

## 📚 More Information

For more details and a deep dive into our features, check out the official Media SDK documentation at [https://www.mediaprotocol.net/sdk/overview](https://www.mediaprotocol.net/sdk/overview).

## Front-End Boilerplate

If you're looking for an example to get started with a front-end application, check out our [Media Protocol Frontend Boilerplate](https://github.com/mediafoundation/media-protocol-frontend-boilerplate). It's a great way to get started with the Media Protocol and the Media SDK.

## 📝 License

This project is licensed under the MIT License.

## 📢 Stay Connected!

- Twitter: [@Media_FDN](https://twitter.com/Media_FDN)
- Website: [media.network](https://media.network)
