async function deployToken(deployer, contractOwner, mintDestination) {
  const api3TokenFactory = await ethers.getContractFactory(
    "Api3Token",
    deployer
  );
  const api3Token = await api3TokenFactory.deploy(
    contractOwner,
    mintDestination
  );
  return api3Token;
}

async function deployTimelockManager(deployer, ownerAddress, api3TokenAddress) {
  const timelockManagerFactory = await ethers.getContractFactory(
    "TimelockManager",
    deployer
  );
  const timelockManager = await timelockManagerFactory.deploy(
    api3TokenAddress,
    ownerAddress
  );
  return timelockManager;
}

async function deployPool(
  deployer,
  api3TokenAddress,
  epochPeriodInSeconds = 60 * 24 * 7,
  firstEpochStartTimestamp = Math.floor(Date.now() / 1000)
) {
  const api3PoolFactory = await ethers.getContractFactory("Api3Pool", deployer);
  const api3Pool = await api3PoolFactory.deploy(
    api3TokenAddress,
    epochPeriodInSeconds,
    firstEpochStartTimestamp
  );
  return api3Pool;
}

async function deployInflationManager(
  deployer,
  api3TokenAddress,
  api3PoolAddress,
  startEpoch = 100
) {
  const inflationManagerFactory = await ethers.getContractFactory(
    "InflationManager",
    deployer
  );
  const inflationManager = await inflationManagerFactory.deploy(
    api3TokenAddress,
    api3PoolAddress,
    startEpoch
  );
  return inflationManager;
}

module.exports = {
  deployToken: deployToken,
  deployTimelockManager: deployTimelockManager,
  deployPool: deployPool,
  deployInflationManager: deployInflationManager,
};
