import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre, { ethers, viem } from 'hardhat'
import { type Ballot } from '../../typechain-types'
import { bytecode } from '../artifacts/contracts/UniswapV2Router02.sol/IUniswapV2Pair.json'

const getWallet = async () => {
  const [wallet, a, b, c, d] = await hre.viem.getWalletClients()
  const [account] = await wallet.getAddresses()
  return { account, a, b, c, d }
}
const name1 = ethers.encodeBytes32String('比特币10万')
const name2 = ethers.encodeBytes32String('比特币20万')

const deployBallot = async () => {
  const ballot = await hre.viem.deployContract('Ballot', [[name1, name2]])
  return { ballot }
}

describe('Ballot', async () => {
  it('Test deploy', async () => {
    const { ballot } = await loadFixture(deployBallot)
    const proposals = await ballot.read.proposals([0])
    expect(ethers.decodeBytes32String(proposals[0])).to.equal('比特币10万')

    const proposals2 = await ballot.read.proposals([1])
    expect(ethers.decodeBytes32String(proposals2[0])).to.equal('比特币20万')
  })

  it('Test Vote', async () => {
    const { account, a, b, c, d } = await loadFixture(getWallet)
    const { ballot } = await loadFixture(deployBallot)
    console.log('account', account)
    const [address1, address2, address3, address4] = [a.account.address, b.account.address, c.account.address, d.account.address]
    await ballot.write.giveRightToVote([address1], { account })
    await ballot.write.giveRightToVote([address2], { account })

    await ballot.write.vote([0], {
      account: address1
    })
    await ballot.write.vote([0], {
      account: address2
    })
    const winnerName = await ballot.read.winnerName()
    console.log('winnerName', ethers.decodeBytes32String(winnerName))
  })
})
