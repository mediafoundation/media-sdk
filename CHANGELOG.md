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
