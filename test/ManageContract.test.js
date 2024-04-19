const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ManageContract", function () {
    let ManageContract, manageContract, owner, addr1, addr2
    let SoulBoundToken

    beforeEach(async function () {
        ManageContract = await ethers.getContractFactory("ManageContract")
        SoulBoundToken = await ethers.getContractFactory("SoulBoundToken")
        ;[owner, addr1, addr2, _] = await ethers.getSigners()
        manageContract = await ManageContract.deploy(owner.address)
        soulBoundToken = await SoulBoundToken.deploy(manageContract.address, "EarlyAdopterToken", "EAT")
        await manageContract.deployed()
    })

    it("Should register a new SBT contract", async function () {
        await manageContract.registerSBTContract(soulBoundToken.address)
        expect(await manageContract.getSBTContract(0)).to.equal(soulBoundToken.address)
    })

    it("Should mint a new SBT", async function () {
        // Assuming the mint function requires a valid signature, which is a complex topic
        // and beyond the scope of this basic test. We'll simulate a successful mint.
        await manageContract.registerSBTContract(soulBoundToken.address)
        const abi = ethers.utils.defaultAbiCoder
        const encodedMessage = abi.encode(["address", "uint256", "uint256"], [owner.address, 0, 0])
        const messageHash = ethers.utils.keccak256(encodedMessage)
        const signature = await owner.signMessage(ethers.utils.arrayify(messageHash))

        await manageContract.mint(0, signature)
        await expect(manageContract.mint(0, signature)).to.be.revertedWith("INVALID_SIGNER")
    })
})
