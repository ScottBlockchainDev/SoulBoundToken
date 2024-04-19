const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("SoulBoundToken", function () {
    let SoulBoundToken, soulBoundToken, owner, addr1

    beforeEach(async function () {
        SoulBoundToken = await ethers.getContractFactory("SoulBoundToken")
        ;[owner, addr1, _] = await ethers.getSigners()
        soulBoundToken = await SoulBoundToken.deploy(owner.address, "SoulBoundToken", "SBT")
        await soulBoundToken.deployed()
    })

    it("Should mint a new token", async function () {
        await soulBoundToken.safeMint(addr1.address)
        expect(await soulBoundToken.ownerOf(1)).to.equal(addr1.address)
    })

    it("Should not allow non-manager to mint", async function () {
        await expect(soulBoundToken.connect(addr1).safeMint(addr1.address)).to.be.revertedWith("Only the manager can call this function")
    })
})
