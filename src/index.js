const { handleError } = require('./utils/errorHandler')
const {
  getEthBalance,
  getWalletUsdBalance
} = require('./services/balanceService')
const { getEthPriceUsd } = require('./services/priceService')
const { simulateTransaction } = require('./services/simulationService')
const { estimateGas } = require('./services/gasService')
const {
  defaultWalletAddress,
  simulateFromAddress,
  simulateToAddress,
  tenderly
} = require('./config')

async function main () {
  const address = defaultWalletAddress
  if (!address) {
    console.log('Usage: node src/index.js <wallet_address>')
    process.exit(0)
  }

  try {
    const ethBal = await getEthBalance(address)
    const usdBal = await getWalletUsdBalance(address)
    const ethPrice = await getEthPriceUsd()

    console.log('Balance Address:', address)
    console.log('ETH Balance:', ethBal)
    console.log('USD Balance:', usdBal)
    console.log('ETH Price:', ethPrice)

    console.log()

    console.log('Sim From:', simulateFromAddress)
    console.log('Sim To:  ', simulateToAddress)

    const sim = await simulateTransaction(
      simulateFromAddress,
      simulateToAddress,
      '0.01'
    )

    console.log('Sim Status:', sim.transaction.status ? 'SUCCESS' : 'REVERT')
    console.log('Gas Used:  ', sim.transaction.gas_used)
    console.log(
      'Sim URL:   ',
      `https://dashboard.tenderly.co/${tenderly.account}/${tenderly.project}/simulator/${sim.simulation.id}`
    )

    console.log()

    const gas = await estimateGas(
      simulateFromAddress,
      simulateToAddress,
      '0.01'
    )

    console.log('Gas Units:', gas.gasUnits)
    console.log('Max Fee Per Gas:', gas.maxFeePerGas)
    console.log('Max Priority Fee:', gas.maxPriorityFeePerGas)
    console.log('Cost ETH:', gas.costEth)
    console.log('Cost USD:', gas.costUsd)
  } catch (err) {
    handleError(err)
  }
}

main()
