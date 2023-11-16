The Media SDK is a comprehensive toolkit for interacting with Media Protocol's contracts. Developed in JavaScript, it leverages the [viem](https://viem.sh/) library for seamless contract interactions, offering a straightforward interface for engaging with the Media Protocol contracts.

> ⚠️ **Important Note:** Contract addresses are subject to change. Always ensure to refer to the official documentation for the latest and valid contract addresses before any interaction.

## Installation

```bash
git clone git@github.com:mediafoundation/media-sdk.git # Clone the repo
cd media-sdk # Change directory to the repo
npm install # Install dependencies
```

## Usage

### Initializing the SDK

To create an instance of the Media SDK, you must provide the following parameters:

- `privateKey`: string // Used to create clients. Can be omitted if providing a walletClient instead. Provide it without the 0x prefix.
- `chainOptions`: ChainOptions // Options for the chain. If none provided, a default one will be used.
- `rpcUrl`: string // RPC url for the chain.
- `walletClient`: WalletClient // Optional wallet client. If not provided, a new one will be created using the private key.

#### Example

Using a private key instead of a client.

```javascript
initSdk("PRIVATE_KEY", {
    id: chainId, // E.g 1
    name: "chainName", // E.g Ethereum
    network: "chainNetwork", // E.g Mainnet
    nativeCurrency: {
        symbol: "chainSymbol", // E.g ETH
        name: "symbolName", // E.g Ether
    }
}, marketplaceId, "RPC_URL");
```

#### Creating a Wallet Client from JSON-RPC Accounts using Viem's Default Chain for Ethereum Mainnet

```javascript
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

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
}, marketplaceId, "RPC_URL", client);
```
