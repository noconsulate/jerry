const HDWalletProvider = require("@truffle/hdwallet-provider");

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
          provider: process.env.INFURA_ROPSTEN,
          privateKeys: [process.env.ROPSTEN_PRIVATE_KEY],
        }),
      networkId: 4,
      gasPrice: 10e9,
    },
  },
  
};
