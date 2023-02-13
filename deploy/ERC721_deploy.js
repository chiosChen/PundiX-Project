const hre = require("hardhat");

async function main() {

  const contractFactory = await hre.ethers.getContractFactory("ChiosNFT");
  console.log("Deploying ChiosNFT...")

  const contract = await hre.upgrades.deployProxy(contractFactory, {
    initializer: "initialize"
  });

  await contract.deployed();

  console.log("Successfully deployed to: ", contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
