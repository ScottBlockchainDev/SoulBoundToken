const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ManageContract", function () {
    let ManageContract, manageContract, owner, addr1, addr2

    beforeEach(async function () {
        ManageContract = await ethers.getContractFactory("ManageContract")
        ;[owner, addr1, addr2, _] = await ethers.getSigners()
        manageContract = await ManageContract.deploy(owner.address)
        await manageContract.deployed()
    })

    it("Should register a new SBT contract", async function () {
        await manageContract.registerSBTContract(addr1.address)
        expect(await manageContract.getSBTContract(0)).to.equal(addr1.address)
    })

    it("Should mint a new SBT", async function () {
        // Assuming the mint function requires a valid signature, which is a complex topic
        // and beyond the scope of this basic test. We'll simulate a successful mint.
        await manageContract.registerSBTContract(addr1.address)

        const abi = ethers.utils.defaultAbiCoder
        console.log(owner.address, 0, 0)
        const encodedMessage = abi.encode(["address", "uint256", "uint256"], [owner.address, 0, 0])
        const messageHash = ethers.utils.keccak256(encodedMessage)
        const signature = await owner.signMessage(messageHash)

        console.log(owner.address)
        await manageContract.mint(0, signature)
    })
})
