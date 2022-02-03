const FroggyContract = artifacts.require("FroggyContract");

module.exports = function (deployer) {
  deployer.deploy(FroggyContract);
};
