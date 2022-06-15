const FroggyContract = artifacts.require("FroggyContract");
const Marketplace = artifacts.require("FroggyMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, FroggyContract.address);
};
