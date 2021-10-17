const OurStorageDapp = artifacts.require("OurStorageDapp");

module.exports = function(deployer) {
  deployer.deploy(OurStorageDapp);
};
