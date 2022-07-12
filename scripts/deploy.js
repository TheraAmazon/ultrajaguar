const hre = require("hardhat");
const fs = require('fs');

async function main() {

  //ULRAJAGUAR
  const ULTRAJAGUARCloud = await hre.ethers.getContractFactory("ULTRAJAGUARCloud");
  const ultrajaguarCloud = await ULTRAJAGUARCloud.deploy();
  await ultrajaguarCloud.deployed();
  console.log("ultrajaguarCloud deployed to:", ultrajaguarCloud.address);

  const ULTRAJAGUAR = await hre.ethers.getContractFactory("ULTRAJAGUAR");
  const ultrajaguar = await ULTRAJAGUAR.deploy(ultrajaguarCloud.address);
  await ultrajaguar.deployed();
  console.log("ultrajaguar deployed to:", ultrajaguar.address);

  
  let config = `
  export const ultrajaguarCloudaddress = "${ultrajaguarCloud.address}"
  export const ultrajaguaraddress = "${ultrajaguar.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
