# [7.1.1](https://github.com/mediafoundation/media-sdk/compare/vv7.0.0...v7.1.1) (2025-01-31)

### Features
* **swapRouter**: Add model for SwapRouter

# [7.1.0](https://github.com/mediafoundation/media-sdk/compare/vv7.0.0...v7.1.0) (2024-12-19)

### Features
* **types**: Export all types from ModelTypes
* **ratingSystem**: Add functions to model
* **types** Add new types

# [7.0.0](https://github.com/mediafoundation/media-sdk/compare/v6.2.0...v7.0.0) (2024-12-02)

### Bug Fixes
* **sdk.ts** Remove duplicate function
* **sdk.ts** Make generatePublicClient a static function

### BREAKING CHANGES

* Change createWalletClient -> Sdk.createWalletClient

# [6.2.0](https://github.com/mediafoundation/media-sdk/compare/v6.1.0...v6.2.0) (2024-12-02)

### Features

* **eventsHandler.ts** Add functions to getPasEvents and listenForEvents on RatingSystem contract
* **ratingSystem.ts** Add functions base on smart contract

# [6.1.0](https://github.com/mediafoundation/media-sdk/compare/v6.0.0...v6.1.0) (2024-11-02)

### Features

* **walletUtils.ts** Create an account from its private key

# [6.0.0](https://github.com/mediafoundation/media-sdk/compare/v5.2.4...v6.0.0) (2024-10-25)

### BREAKING CHANGES

* new contract addresses
* json abis

# [5.2.4](https://github.com/mediafoundation/media-sdk/compare/v5.2.3...v5.2.4) (2024-10-15)

### Bug Fixes

* fix initializeMarketplace function

# [5.2.3](https://github.com/mediafoundation/media-sdk/compare/v5.2.2...v5.2.3) (2024-10-15)

### Bug Fixes

* new contract addresses for maketplacehelper
* json abis

# [5.2.2](https://github.com/mediafoundation/media-sdk/compare/v5.2.1...v5.2.2) (2024-10-15)

### Bug Fixes

* added missing function and type param
* new contract addresses for maketplacehelper
* fixed readme

# [5.2.1](https://github.com/mediafoundation/media-sdk/compare/v5.2.0...v5.2.1) (2024-10-14)

### Features

* **Added MarketplaceStorage model**

### Bug Fixes

* **Add missing abis**
* **Normalized view and execute across all models**
* **Added Rating and Disputes contract addresses to models**

# [5.2.0](https://github.com/mediafoundation/media-sdk/compare/v5.1.2...v5.2.0) (2024-10-04)

### Bug Fixes

* **Add missing interfaces**

# [5.1.2](https://github.com/mediafoundation/media-sdk/compare/v5.1.1...v5.1.2) (2024-10-04)

### Features

* **Bump viem to v2.20.0**

# [5.0.1](https://github.com/mediafoundation/media-sdk/compare/v5.0.1...v5.1.1) (2024-09-19)

### Features

* **walletUtils**: Add a function to create a Hierarchical Deterministic account from mnemonic phrase ([79ad1869](https://github.com/mediafoundation/media-sdk/commit/79ad18699d82547a39a3da0cdc91b7d591c2fc52))

# [5.0.1](https://github.com/mediafoundation/media-sdk/compare/v5.0.0...v5.0.1) (2024-09-03)

### Chore

* **dependencies**: Do not use semantic release, remove its dependencies ([d6e00c1](https://github.com/mediafoundation/media-sdk/commit/d6e00c1f4a768d9bb7ba41dd06c0a8f4bf4a9f1d))


# [5.0.0](https://github.com/mediafoundation/media-sdk/compare/v4.4.0...v5.0.0) (2024-08-09)


### Bug Fixes

* **marketplace.ts:** Fix return type ([2f8d689](https://github.com/mediafoundation/media-sdk/commit/2f8d6890d1123b399bc2a7c093dc4850ab985697))
* **marketplaceViewer.ts:** Define return type to view function ([86f428c](https://github.com/mediafoundation/media-sdk/commit/86f428c67ecf8bb224ad8aba80a4f01a0ac382fb))
* **modelTypes.ts:** Accept bigint | number | string in params ([e229d85](https://github.com/mediafoundation/media-sdk/commit/e229d852a0b4823b6eb1737e74ec1863b2f288cd))
* **modeltypes.ts:** add missing file ([57fdd61](https://github.com/mediafoundation/media-sdk/commit/57fdd618b097218cad423b7b5d0188c794ad91e3))
* **modelTypes.ts:** Fix GetPastEventParams ([9e25782](https://github.com/mediafoundation/media-sdk/commit/9e257821479db05c2dfa96281f3b7cb576c28309))
* **resources.ts:** Type sdk config in attributes ([771c586](https://github.com/mediafoundation/media-sdk/commit/771c586535e3fb38aeb19bffea0ae284eb7eaac9))
* **sdk.ts:** remove useless variable ([c54c580](https://github.com/mediafoundation/media-sdk/commit/c54c5803e6964af3d1cc75ea3af121826a374c45))
* **types:** Fix types and exports ([da20c55](https://github.com/mediafoundation/media-sdk/commit/da20c55543f076e0df28e212242c45adfcfc544d))


### Features

* **eventsHandler.ts:** Add explicit interfaces to eventsHandler.ts ([a724aca](https://github.com/mediafoundation/media-sdk/commit/a724acaf85a62c1de54e34cccb616763148338bb))
* **eventsHandler.ts:** Add type to logs ([b8c3fb0](https://github.com/mediafoundation/media-sdk/commit/b8c3fb07cee7ba94fe981106d382fd9436454942))
* **exports:** Export corresponding types ([5387df4](https://github.com/mediafoundation/media-sdk/commit/5387df43e732ba2c3637a01f27988ce7dc9e9b0e))
* **index.ts:** Export viem's useful functions ([9bb8741](https://github.com/mediafoundation/media-sdk/commit/9bb8741b36aafc644abc7e44ca81435203594d25))
* **marketplaceHelper.ts:** Add custom params and documentation ([63efe68](https://github.com/mediafoundation/media-sdk/commit/63efe68bc795bdf23cae33e07626cb71469dcd85))
* **marketplaceHelper:** Use typed params ([5e3135b](https://github.com/mediafoundation/media-sdk/commit/5e3135b03bbfe31a46e7ba6668538e4ff3c97f6b))
* **marketplaceViewer.ts:** Use custom types for params and returns ([7816ea0](https://github.com/mediafoundation/media-sdk/commit/7816ea0d10d0d13c253a8de74b5468c1292e77a9))
* **sdk.ts:** generic transport are accepted in sdk constructor ([ba73bbf](https://github.com/mediafoundation/media-sdk/commit/ba73bbf57243b904d9f1ebec7e2b636d18c0a9cb))


### BREAKING CHANGES

* **sdk.ts:** Sdk constructor changes transport type from string[] | undefined to Transport[] |
undefined

# [4.4.0](https://github.com/mediafoundation/media-sdk/compare/v4.3.0...v4.4.0) (2024-07-29)


### Features

* **sdk.ts:** accept WebSocket transport ([f97f05b](https://github.com/mediafoundation/media-sdk/commit/f97f05bb6d8be525a8d241c5a582cc9c1b88bdd1))

# [4.3.0](https://github.com/mediafoundation/media-sdk/compare/v4.2.3...v4.3.0) (2024-07-26)


### Features

* **contractAddresses.json:** add new Sepolia's addresses ([0f59dc4](https://github.com/mediafoundation/media-sdk/commit/0f59dc4451f2e3a4a4d9f6a3caf140a9cc568961))

## [4.2.3](https://github.com/mediafoundation/media-sdk/compare/v4.2.2...v4.2.3) (2024-07-09)


### Bug Fixes

* **models/eventsHandler.ts:** Import ABIs correctly ([22bb4d1](https://github.com/mediafoundation/media-sdk/commit/22bb4d1e2895e0ac6359107b98e1e45aaa894f87))
* **models/marketplace.ts:** Change execute for view on getOfferById function ([98beb5a](https://github.com/mediafoundation/media-sdk/commit/98beb5ac2e0104161229ad4a2f85e4b2a1eed27d))

## [4.2.2](https://github.com/mediafoundation/media-sdk/compare/v4.2.1...v4.2.2) (2024-06-28)


### Bug Fixes

* **utils/uniswap.ts:** fix import ([71b6c2d](https://github.com/mediafoundation/media-sdk/commit/71b6c2de50fb05cc8ed37f545766cdb7d93e3cfc))

## [4.2.1](https://github.com/mediafoundation/media-sdk/compare/v4.2.0...v4.2.1) (2024-06-25)


### Bug Fixes

* **exports:** change name for export ContractAddresses -> Addresses ([1bcfe00](https://github.com/mediafoundation/media-sdk/commit/1bcfe00e63b748527dbaa19bc073e4b3dc093dac))

# [4.2.0](https://github.com/mediafoundation/media-sdk/compare/v4.1.9...v4.2.0) (2024-06-25)


### Bug Fixes

* **imports:** fix imports on models to prevent warnings ([ae4ad70](https://github.com/mediafoundation/media-sdk/commit/ae4ad70e37a2e0b48dd32d1db7f98272e5ecd7b9))
* **models:** aBIs are imported correctly ([bc7d3a0](https://github.com/mediafoundation/media-sdk/commit/bc7d3a0530b015179f72703db552f8d9f42a04e5))


### Features

* **abis:** export contract ABIs ([9a90618](https://github.com/mediafoundation/media-sdk/commit/9a9061816686525aaa67603a57f288d810a39d6d))
* **marketplace.ts:** get offers by id ([e98b830](https://github.com/mediafoundation/media-sdk/commit/e98b83057732dbb47bc8aec66033d341e892d155))

## [4.1.9](https://github.com/mediafoundation/media-sdk/compare/v4.1.8...v4.1.9) (2024-06-15)


### Bug Fixes

* **utils/encryption.ts:** change imports ([16ab6ef](https://github.com/mediafoundation/media-sdk/commit/16ab6ef0f6298ec20ec437b52e1024f13e77136a))

## [4.1.8](https://github.com/mediafoundation/media-sdk/compare/v4.1.7...v4.1.8) (2024-06-15)


### Bug Fixes

* **utils/encryption.ts:** update imports to correct way ([c8d4071](https://github.com/mediafoundation/media-sdk/commit/c8d4071be1e71861d5e687c9e390735fa95bdfdd))

## [4.1.7](https://github.com/mediafoundation/media-sdk/compare/v4.1.6...v4.1.7) (2024-06-15)


### Bug Fixes

* **release:** include all necesary files when publish ([e70e40e](https://github.com/mediafoundation/media-sdk/commit/e70e40eea07279691a4d92d48a7be179f35bc3e5))

## [4.1.6](https://github.com/mediafoundation/media-sdk/compare/v4.1.5...v4.1.6) (2024-06-15)


### Bug Fixes

* **dependencies and distribution:** distribution packages are used correctly ([adc9f07](https://github.com/mediafoundation/media-sdk/commit/adc9f07171012d104bd1d4cf96f9c75bad87ab90))

## [4.1.5](https://github.com/mediafoundation/media-sdk/compare/v4.1.4...v4.1.5) (2024-06-14)


### Bug Fixes

* **deployment and dependencies:** install dist dependencies after built ([c32aef2](https://github.com/mediafoundation/media-sdk/commit/c32aef2fd6ab704be8b5f53396af2b2288c27af6))

## [4.1.4](https://github.com/mediafoundation/media-sdk/compare/v4.1.3...v4.1.4) (2024-06-14)


### Bug Fixes

* **dependencies:** add dependencies to dist package ([58b7352](https://github.com/mediafoundation/media-sdk/commit/58b73520b04cdc97b9a14dd0bb9f59c6e45ce8b1))

## [4.1.3](https://github.com/mediafoundation/media-sdk/compare/v4.1.2...v4.1.3) (2024-05-31)


### Bug Fixes

* **index.ts:** import and then export contractAddresses.json ([dbf61d0](https://github.com/mediafoundation/media-sdk/commit/dbf61d0e9ae9bf379ab43ead892f38e6d63412c6))

## [4.1.2](https://github.com/mediafoundation/media-sdk/compare/v4.1.1...v4.1.2) (2024-05-31)


### Bug Fixes

* **marketplace.ts:** add needed explicit type ([ecb6046](https://github.com/mediafoundation/media-sdk/commit/ecb60460adcf215997d841985ac7c9433e9f621b))

## [4.1.1](https://github.com/mediafoundation/media-sdk/compare/v4.1.0...v4.1.1) (2024-05-31)


### Bug Fixes

* **quoter.ts:** Add return Promise<any> to function ([c609d9e](https://github.com/mediafoundation/media-sdk/commit/c609d9e64bf2525940bc27e91229eb71700a3aef))

# [4.1.0](https://github.com/mediafoundation/media-sdk/compare/v4.0.4...v4.1.0) (2024-05-17)


### Bug Fixes

* **eventshandler.ts:** accept undefined as eventName ([18e0be4](https://github.com/mediafoundation/media-sdk/commit/18e0be4b86613f0c2cc585330b04163bf1275f40))
* **imports:** Remove useless import and shorten some ([b9ae84e](https://github.com/mediafoundation/media-sdk/commit/b9ae84e59c2f4410b4e3ee0f12b5ab62b086af44))
* **quoter.ts:** Fix types ([24444fb](https://github.com/mediafoundation/media-sdk/commit/24444fbf9d81d49878a76976c0a31d53b2c6ca31))
* **uniswap.ts:** Fix inconsistencies on class ([1f75f4f](https://github.com/mediafoundation/media-sdk/commit/1f75f4fddeb25b55aa626db1695d6a59f42d2014))


### Features

* **blockchain.ts:** get block timestamp given a block number ([66cadc9](https://github.com/mediafoundation/media-sdk/commit/66cadc9ab7abe68e81e51fd3e28a60273fbd2bc9))
* **disputes.ts:** Add a new disputes model with execute and view functions ([961f690](https://github.com/mediafoundation/media-sdk/commit/961f69027169cd7e36498bd7ace76655fd2291df))
* **marketplace.ts:** add function to get provider data ([b71a010](https://github.com/mediafoundation/media-sdk/commit/b71a010a4287dddd0be2c2139c4636d9aaf781f3))
* **ratingSystem.ts:** Add a new ratingSystem model with execute and view functions ([f1d71d4](https://github.com/mediafoundation/media-sdk/commit/f1d71d4eb247bc38f98e15465844e2cb3fe92da2))

## [4.0.4](https://github.com/mediafoundation/media-sdk/compare/v4.0.3...v4.0.4) (2024-03-25)


### Bug Fixes

* **sdk.js:** return publicClient when generated if no private key or mnemonic given ([e997aec](https://github.com/mediafoundation/media-sdk/commit/e997aec509826c8f86cedafa8c76bf419bcc8c32))

## [4.0.3](https://github.com/mediafoundation/media-sdk/compare/v4.0.2...v4.0.3) (2024-02-29)


### Bug Fixes

* **index.js, sdk.js:** provide correct valid chains ([809c66f](https://github.com/mediafoundation/media-sdk/commit/809c66fcb9c8aed188f86f7247f60674421596e8))
* **utils/signer.js, utils/blockchain.js:** utilize sdk instance config in constructor ([7c19461](https://github.com/mediafoundation/media-sdk/commit/7c194616b2ccdbee63a8783aa0cafe44ad05fdb9))

## [4.0.2](https://github.com/mediafoundation/media-sdk/compare/v4.0.1...v4.0.2) (2024-02-29)


### Bug Fixes

* **config:** merge changes from main into support-multiple-sdk-instances ([a25d46c](https://github.com/mediafoundation/media-sdk/commit/a25d46c90197b801d208a922e3c7c49f07d994fb))

## [4.0.1](https://github.com/mediafoundation/media-sdk/compare/v4.0.0...v4.0.1) (2024-02-28)


### Bug Fixes

* **index.js:** export necessary Sdk class ([334e9a4](https://github.com/mediafoundation/media-sdk/commit/334e9a4e8e8365dcb9e158d1501aae4462598e14))

# [4.0.0](https://github.com/mediafoundation/media-sdk/compare/v3.2.0...v4.0.0) (2024-02-22)


### Bug Fixes

* **marketplace.js:** wrong calculation ([0e99fcf](https://github.com/mediafoundation/media-sdk/commit/0e99fcf6d70bb1907554c5b8ee8f4693ac3955d1))
* **marketplace.js:** wrong deal metadata ([3858f2c](https://github.com/mediafoundation/media-sdk/commit/3858f2c64b5a847b711e0e516caa0ef04a109e88))


### Code Refactoring

* **models:** implement Sdk class config on all models ([184784a](https://github.com/mediafoundation/media-sdk/commit/184784afe09b9f91b6de5bae90c756390e529a28))


### Features

* **sdk.js:** support multiple instances of the sdk ([033f536](https://github.com/mediafoundation/media-sdk/commit/033f5362f76bad3be5d22ad2801e5b4a85857f17))


### BREAKING CHANGES

* **models:** Sdk instance should be provided to constructor when instantiate a model

# [3.2.6](https://github.com/mediafoundation/media-sdk/compare/v3.2.5...v3.2.6) (2024-02-15)

### Bug Fixes

Missing new abis.

# [3.2.5](https://github.com/mediafoundation/media-sdk/compare/v3.2.4...v3.2.5) (2024-02-15)

### Bug Fixes

Missing file change.

# [3.2.4](https://github.com/mediafoundation/media-sdk/compare/v3.2.3...v3.2.4) (2024-02-15)

### Bug Fixes

Removed Goerli and Base Goerli and added Sepolia and Base Sepolia in the config. Also removed contract addresses that are not longer supported.

# [3.2.3](https://github.com/mediafoundation/media-sdk/compare/v3.2.2...v3.2.3) (2024-02-14)

### Updates

Added contract addresses for Ethereum Sepolia and Base Sepolia.

# [3.2.2](https://github.com/mediafoundation/media-sdk/compare/v3.2.1...v3.2.2) (2024-01-16)

### Bug Fixes

Fix issue with deal metadata

# [3.2.1](https://github.com/mediafoundation/media-sdk/compare/v3.2.0...v3.2.1) (2024-01-14)

### Bug Fixes

Fix issue with remaining balance calculation

# [3.2.0](https://github.com/mediafoundation/media-sdk/compare/v3.1.5...v3.2.0) (2024-01-08)

### Features

* **signer.js:** add a simplified way to sign and verify signatures ([6317da4](https://github.com/mediafoundation/media-sdk/commit/6317da4da651e18b90be92316ccfa7bb089fbf4d))

# [3.1.5-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.1.4-alpha...v3.1.5-alpha) (2024-01-08)

### Bug Fixes

* Fixed another bug with JSBI and BigInt mixing

# [3.1.4-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.1.3-alpha...v3.1.4-alpha) (2024-01-08)

### Bug Fixes

* Fixed issue with JSBI and BigInt

# [3.1.3-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.1.2-alpha...v3.1.3-alpha) (2024-01-07)

### Features

* Added constructor to ERC20 model, because it was getting out of sync.

# [3.1.2-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.1.1-alpha...v3.1.2-alpha) (2024-01-07)

### Bug Fixes

* Fixed missing object parameters in generateTradeParams

# [3.1.1-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.1.0-alpha...v3.1.1-alpha) (2024-01-02)


### Features

* add erc20 model ([d83fd8e](https://github.com/mediafoundation/media-sdk/commit/d83fd8ea2188fdffbed117976edba755312a09e7))

# [3.1.0-alpha](https://github.com/mediafoundation/media-sdk/compare/v3.0.0-alpha...v3.1.0-alpha) (2023-12-28)

### Features
* **signer.js** a Signer class that provides methods to sign messages and verify signatures ([ed75c15](https://github.com/mediafoundation/media-sdk/commit/ed75c15e738b2045663d9c7d1a6d75954aa44ee9))

### Bug Fixes
* **eventsHandler.js** adding missing import for Addresses ([7f34ef2](https://github.com/mediafoundation/media-sdk/commit/7f34ef24c214b5a518c4efc2221825010bc163e4))



# [3.0.0-alpha](https://github.com/mediafoundation/media-sdk/compare/v2.0.1...v3.0.0-alpha) (2023-12-26)

### BREAKING CHANGES

* Uniswap v3 integration, ditching v2.


## [2.0.1](https://github.com/mediafoundation/media-sdk/compare/v2.0.0...v2.0.1) (2023-11-29)


### Bug Fixes

* removed exports that were hardcoded, use config() instead. ([aab8504](https://github.com/mediafoundation/media-sdk/commit/aab8504a4f5a9d22f9a9038fd4ea01da5ddc2c20))

# [2.0.0](https://github.com/mediafoundation/media-sdk/compare/v1.2.4...v2.0.0) (2023-11-29)


### Performance Improvements

* Most functions now take an object as parameter ([a343606](https://github.com/mediafoundation/media-sdk/commit/a3436068c05a7630712e7328a4e04c58a0276445))


### BREAKING CHANGES

* Refactored config
Added exports for walletClient, publicClient and config.
Updated README
Reformatted all files to use 2 spaces
Added an optional mnemonic parameter to initSdk

## [1.2.4](https://github.com/mediafoundation/media-sdk/compare/v1.2.3...v1.2.4) (2023-11-27)


### Bug Fixes

* fixing publish-npm.yml action to only publish to npm ([e8803a6](https://github.com/mediafoundation/media-sdk/commit/e8803a6d10544bdc08d6f716b39c12ce1a1a794f))

## [1.2.3](https://github.com/mediafoundation/media-sdk/compare/v1.2.2...v1.2.3) (2023-11-27)


### Bug Fixes

* running semantic release with fix commit label ([2dd4aee](https://github.com/mediafoundation/media-sdk/commit/2dd4aee89636861725b17542ed062fd0bb1fbc00))

## [1.2.1](https://github.com/mediafoundation/media-sdk/compare/v1.2.0...v1.2.1) (2023-11-27)


### Bug Fixes

* **package.json .releaserc.json:** execute semantic-release/exec when running semantic-release ([b54e45e](https://github.com/mediafoundation/media-sdk/commit/b54e45e2b4f72c405b6d90b5f338b6afd4bd4b96))

# [1.2.0](https://github.com/mediafoundation/media-sdk/compare/v1.1.6...v1.2.0) (2023-11-27)


### Features

* **package.json:** adding commitizen tool ([7e7174f](https://github.com/mediafoundation/media-sdk/commit/7e7174fe8b5dd0ed00fdb6465fbc1db74e38d07b))

## [1.1.6](https://github.com/mediafoundation/media-sdk/compare/v1.1.5...v1.1.6) (2023-11-27)


### Bug Fixes

* **pencil:** Replaced links in README ([2599292](https://github.com/mediafoundation/media-sdk/commit/259929212f182c8ab7475f31a7bafb2c91481fc8))

## [1.1.5](https://github.com/mediafoundation/media-sdk/compare/v1.1.4...v1.1.5) (2023-11-27)


### Bug Fixes

* changing when semantic release is triggered ([291a08f](https://github.com/mediafoundation/media-sdk/commit/291a08f06e180db9f92f2002f332985ceea119c5))
* testing with others permissions ([605f773](https://github.com/mediafoundation/media-sdk/commit/605f77306e43f4354362c09dd557e5ece14852f2))
* updating publish-npm.yml and test if user can bypass protection of branches ([5efc145](https://github.com/mediafoundation/media-sdk/commit/5efc145786a75f0bef40d4656ead3289bc5a02d9))

## [1.1.4](https://github.com/mediafoundation/media-sdk/compare/v1.1.3...v1.1.4) (2023-11-25)


### Bug Fixes

* testing new author ([2c8eddb](https://github.com/mediafoundation/media-sdk/commit/2c8eddbdd5745beece0b2038eac928108312eab1))

## [1.1.3](https://github.com/mediafoundation/media-sdk/compare/v1.1.2...v1.1.3) (2023-11-25)


### Bug Fixes

* testing semantic release with specific user name ([ed9eef6](https://github.com/mediafoundation/media-sdk/commit/ed9eef64bb50ce90952ff8a158b2086f274edc5b))

## [1.1.2](https://github.com/mediafoundation/media-sdk/compare/v1.1.1...v1.1.2) (2023-11-23)


### Bug Fixes

* author and email for automatic commits using semantic-release ([64c6020](https://github.com/mediafoundation/media-sdk/commit/64c6020944da2d3ff17d85b7f2a245a0cabdd479))
* author of automatic commits ([775840d](https://github.com/mediafoundation/media-sdk/commit/775840d439f07becd677aeabf7f51648469621ac))
* github action script ([002a3b1](https://github.com/mediafoundation/media-sdk/commit/002a3b187bebd5c8c03e5fbf81136af5c5f13fe7))

## [1.1.1](https://github.com/mediafoundation/media-sdk/compare/v1.1.0...v1.1.1) (2023-11-23)


### Bug Fixes

* author of automatic commits ([ab7ec7c](https://github.com/mediafoundation/media-sdk/commit/ab7ec7c372e6fb0802f4548f3c49757c2385f347))

# 1.0.0 (2023-11-23)


### Bug Fixes

* author and email for automatic commits using semantic-release ([1e23a1f](https://github.com/mediafoundation/media-sdk/commit/1e23a1f970647f3cd389fbbd0b004bfcad9d2f99))
* github action script ([b5b1028](https://github.com/mediafoundation/media-sdk/commit/b5b1028018adbef1c677ca4cf3b3d60f6efd16cb))

# 1.0.0 (2023-11-23)


### Bug Fixes

* github action script ([b5b1028](https://github.com/mediafoundation/media-sdk/commit/b5b1028018adbef1c677ca4cf3b3d60f6efd16cb))
