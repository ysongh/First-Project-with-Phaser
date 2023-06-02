require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // set the path to compile the contracts
  paths: {
    artifacts: '../src/artifacts',
    cache: '../src/cache',
  }
};
