# media-sdk

The media sdk is a collection of tools for working with media protocol's contracts. It is written in javascript and uses the [viem](https://viem.sh/) library for contract interactions.
Provides a simple interface for interacting with the media protocol contracts.

## Installation

```bash
git clone git@github.com:mediafoundation/media-sdk.git # Clone the repo
cd media-sdk # Change directory to the repo
npm install # Install dependencies
```

## Usage
### Create a new media sdk instance
To create an instance of the media sdk, you must provide the following parameters.

- privateKey: string // Used to create clients. Could be not provided and provide a walletClient instead. Provide it without the 0x prefix.
- chainOptions: ChainOptions // Options for the chain. If non provided a default one will be used.
- rpcUrl: string // RPC url for the chain.
- walletClient: WalletClient // Optional wallet client. If not provided, a new one will be created using the private key.

#### Example
Using a private key instead of a client.
```javascript
const sdk = new MediaSdk("PRIVATE_KEY",
    {
        id: 1,
        name: "Ethereum Mainnet",
        network: "Ethereum Mainnet",
        nativeCurrency: {
            symbol: "ETH",
            name: "ETH",
        }
    }, "RPC_URL")
```

#### Creating a wallet client from JSON-RPC Accounts using viem's default chain for ethereum mainnet.
```javascript
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

const client = createWalletClient({ 
  account, 
  chain: mainnet,
  transport: custom(window.ethereum)
})

//Creating an instance of the media sdk using the wallet client. 
const sdk = new MediaSdk(undefined,
    {
        id: 1,
        name: "Ethereum Mainnet",
        network: "Ethereum Mainnet",
        nativeCurrency: {
            symbol: "ETH",
            name: "ETH",
        }
    }, "RPC_URL", client)
```
