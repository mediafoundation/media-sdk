import {Sdk} from "../../src";

describe("Sdk", () => {
  test("Initialize sdk with default chain and transport", () => {

    const sdk = new Sdk({
      mnemonic: "some mnemonic of twelve words in some mnemonic of twelve words in",
    });

    expect(sdk.config).toHaveProperty("publicClient");
    expect(sdk.config).toHaveProperty("walletClient");
  });

  test("Wallet client and public client should have same transport", () => {
    const sdk = new Sdk({
      mnemonic: "some mnemonic of twelve words in some mnemonic of twelve words in",
    });

    expect(sdk.config.walletClient.transport).toBe(sdk.config.publicClient.transport);
  })

  test("Provide custom transport and chain", () => {
    const sdk = new Sdk({transport: ["http://localhost:8545"], mnemonic: "some mnemonic of twelve words in some mnemonic of twelve words in"});

    expect(sdk.config.publicClient.transport.transports[0].value.url).toBe("http://localhost:8545");
    expect(sdk.config.walletClient.transport.transports[0].value.url).toBe("http://localhost:8545");
  })

  test("Null mnemonic or private key should initialize with publicClient only", () =>{
    const sdk = new Sdk();

    expect(sdk.config.publicClient).not.toBe(undefined)
  })
});