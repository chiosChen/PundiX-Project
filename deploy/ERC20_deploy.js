const hre = require("hardhat");

async function main() {

  const contractFactory = await hre.ethers.getContractFactory("ChiosERC20");

  console.log("Deploying ChiosERC20...")

  const contract = await hre.upgrades.deployProxy(contractFactory, {
    initializer: "initialize",
  });

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});