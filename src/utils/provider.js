const { ethers } = require('ethers')
const { infuraProjectId } = require('../config')

const provider = new ethers.InfuraProvider('homestead', infuraProjectId)

module.exports = provider
