const provider = require('../utils/provider')
const { ethers } = require('ethers')
const { getEthPriceUsd } = require('./priceService')

async function getOptimalGasParams () {
  const feeData = await provider.getFeeData()
  const { maxFeePerGas, maxPriorityFeePerGas, gasPrice } = feeData
  return {
    maxFeePerGas: maxFeePerGas ?? gasPrice,
    maxPriorityFeePerGas: maxPriorityFeePerGas ?? gasPrice
  }
}

async function estimateGas (from, to, valueEth) {
  const tx = {
    from,
    to,
    value: ethers.parseEther(valueEth)
  }

  const gasUnits = await provider.estimateGas(tx)
  const { maxFeePerGas, maxPriorityFeePerGas } = await getOptimalGasParams()

  const costEth = ethers.formatEther(gasUnits * maxFeePerGas)
  const costUsd = (Number(costEth) * (await getEthPriceUsd())).toFixed(2)

  return {
    gasUnits: gasUnits.toString(),
    maxFeePerGas: maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
    costEth,
    costUsd
  }
}

module.exports = { estimateGas }
