require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
 const privateKey = fs.readFileSync(".secret").toString().trim() || "";
 const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "opx",
  networks: {
    hardhat: {
      chainId: 100
    },
    rinkeby: {
       url: "https://rinkeby.infura.io/v3/291697c1912845f4b55b544eebda4698",
      accounts: [privateKey]
    },
    goerli: {
       url: "https://goerli.infura.io/v3/291697c1912845f4b55b544eebda4698",
      accounts: [privateKey]
    },
    mumbai: {
      // Infura
      url: "https://polygon-mumbai.infura.io/v3/291697c1912845f4b55b544eebda4698",
      //url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    gnosis: {
      // Infura
       url: "https://rpc.gnosischain.com/",
       network_id: 100,
      accounts: [privateKey]
    },
    aox: {
      // Infura
       url: "https://arbitrum.xdaichain.com/",
      //url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    },
    opx: {
      // Infura
       url: "https://optimism.gnosischain.com/",
      //url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    },
    matic: {
      // Infura
       url: "https://polygon-rpc.com",
      //url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    compilers: [
    {
    version: "0.5.4",
    },
    {
      version: "0.7.3",
      },
    {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  ],
  },
};

