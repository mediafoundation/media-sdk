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

### 🔑 Initializing the SDK

To initialize an instance of the Media SDK, provide the following parameters:

- `privateKey`: A string used to create clients. Exclude the 0x prefix. Can be omitted if a `walletClient` is provided.
- `chainOptions`: Options for the blockchain. Defaults are used if not specified.
- `rpcUrl`: The RPC URL for the blockchain.
- `walletClient`: An optional wallet client. If absent, one is created using the private key.

#### Example

Using a private key instead of a client.

```javascript
initSdk("YOUR_PRIVATE_KEY", {
    id: chainId, // Example: 1 for Ethereum
    name: "chainName", // Example: Ethereum
    network: "chainNetwork", // Example: Mainnet
    nativeCurrency: {
        symbol: "chainSymbol", // Example: ETH
        name: "symbolName", // Example: Ether
    }
}, "YOUR_RPC_URL");
```

#### Creating a Wallet Client from JSON-RPC Accounts using Viem's Default Chain for Ethereum Mainnet

Using Viem's Default Chain for Ethereum Mainnet:

```javascript
import {createWalletClient, http} from 'viem'
import {mainnet} from 'viem/chains'

const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})

const client = createWalletClient({
    account,
    chain: mainnet,
    transport: custom(window.ethereum)
})

// Creating an instance of the Media SDK using the wallet client. 
initSdk({
    id: chainId, // E.g 1
    name: "chainName", // E.g Ethereum
    network: "chainNetwork", // E.g Mainnet
    nativeCurrency: {
        symbol: "chainSymbol", // E.g ETH
        name: "symbolName", // E.g Ether
    }
}, "RPC_URL", client);
```

#### 🛒 Initializing the Marketplace

After setting up the Media SDK, initialize the marketplace with the `initializeMarketplace` function.

```javascript 
// Example usage 

const requiredStake = 100; 
// replace with your required stake 
const marketFeeTo = '0x...'; 
// replace with your market fee recipient address 
const marketFeeRate = 0.05; 
// replace with your market fee rate
const marketplace = new Marketplace(); 
const marketplaceId = await marketplace.initializeMarketplace(requiredStake, marketFeeTo, marketFeeRate);
```

## 📚 More Information

For more details and a deep dive into our features, check out the official Media SDK documentation at [https://www.mediaprotocol.net/sdk/overview](https://www.mediaprotocol.net/sdk/overview).


## 📝 License

This project is licensed under the MIT License.

## 📢 Stay Connected!

- Twitter: [@Media_FDN](https://twitter.com/Media_FDN)
- Website: [media.network](https://media.network)
