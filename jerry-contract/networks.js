const HDWalletProvider = require("@truffle/hdwallet-provider");

const KEY = "2e938e892252b01ec379943c70eea13c65c21feea8099f0fac528244ea88b69c"

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
          providerOrUrl: process.env.INFURA_ROPSTEN,
          privateKeys: [KEY],
        }),
      networkId: 3,
      gasPrice: 10e9,
    },
  },
  
};
