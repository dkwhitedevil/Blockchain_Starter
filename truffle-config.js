module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,         // Make sure it's 7545
      network_id: "*"     // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.5.16", // Make sure this matches the required version
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
