const axios = require('axios')
const { ethers } = require('ethers')
const { tenderly } = require('../config')

async function simulateTransaction (from, to, valueEth) {
  const url = `https://api.tenderly.co/api/v1/account/${tenderly.account}/project/${tenderly.project}/simulate`

  const valueBigInt = ethers.parseEther(valueEth)
  const valueHex = ethers.toBeHex(valueBigInt)

  const body = {
    network_id: '1',
    from,
    to,
    input: '0x',
    value: valueHex,
    save: true,
    simulation_type: 'full'
  }

  const headers = { 'X-Access-Key': tenderly.accessKey }
  const resp = await axios.post(url, body, { headers })
  return resp.data
}

module.exports = { simulateTransaction }
