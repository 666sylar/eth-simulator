const { ethers } = require('ethers')
const provider = require('../utils/provider')
const { chainlinkEthUsdAddress } = require('../config')

const aggregatorV3InterfaceABI = [
  'function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'
]

async function getEthPriceUsd () {
  const contract = new ethers.Contract(
    chainlinkEthUsdAddress,
    aggregatorV3InterfaceABI,
    provider
  )
  const [, price] = await contract.latestRoundData()
  return Number(price) / 1e8
}

module.exports = { getEthPriceUsd }
