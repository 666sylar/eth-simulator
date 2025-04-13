require('dotenv').config()

module.exports = {
  infuraProjectId: process.env.INFURA_PROJECT_ID,
  chainlinkEthUsdAddress: process.env.CHAINLINK_ETH_USD_ADDRESS,
  tenderly: {
    account: process.env.TENDERLY_ACCOUNT,
    project: process.env.TENDERLY_PROJECT,
    accessKey: process.env.TENDERLY_ACCESS_KEY
  },
  defaultWalletAddress: process.env.DEFAULT_WALLET_ADDRESS,
  simulateFromAddress: process.env.SIMULATE_FROM_ADDRESS,
  simulateToAddress: process.env.SIMULATE_TO_ADDRESS
}
