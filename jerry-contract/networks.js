const HDWalletProvider = require("@truffle/hdwallet-provider");
const KEY = process.env.ROPSTEN_PRIVATE_KEY
const PROVIDER_URL = process.env.INFURA_ROPSTEN

module.exports = {
  networks: {
    development: {
      protocol: "http",
      host: "localhost",
      port: 7545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          providerOrUrl: PROVIDER_URL,
          privateKeys: [KEY],
        }),
      networkId: 3,
      gasPrice: 10e9,
    },
  },
  
};
