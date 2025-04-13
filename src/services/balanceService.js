const { ethers } = require('ethers')
const provider = require('../utils/provider')
const { getEthPriceUsd } = require('./priceService')

async function getEthBalance (address) {
  try {
    const balanceWei = await provider.getBalance(address)
    return ethers.formatEther(balanceWei)
  } catch (err) {
    throw new Error(`Failed to get balance: ${err.message}`)
  }
}

async function getWalletUsdBalance (address) {
  const ethBalance = await getEthBalance(address)
  const ethPrice = await getEthPriceUsd()
  return (Number(ethBalance) * ethPrice).toFixed(2)
}

module.exports = { getEthBalance, getWalletUsdBalance }
