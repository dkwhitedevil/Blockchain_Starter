const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy EthSwap with Token address as argument (if required)
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();
  
  // Transfer tokens to EthSwap
  await token.transfer(ethSwap.address, '1000000000000000000000000');

  console.log("Token transferred to EthSwap contract");
  console.log("EthSwap contract deployed at address:", ethSwap.address);
  console.log("Token contract deployed at address:", token.address);
};
