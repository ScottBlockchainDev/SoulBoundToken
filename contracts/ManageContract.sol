// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ISBT {
    function safeMint(address to, bytes memory signature) external;
}

contract ManageContract {
    address public owner;
    mapping(uint => address) addressById;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    /*
      Register SBT contracts to the Manage contract
        E.g.
         1: 0x423....89 (EarlyAdopterSBT)
         2: 0x713....54 (SecondSBT)
         ... ... ...
    */
    function registerSBTContract(uint contractId, address contractAddress) public onlyOwner {
        addressById[contractId] = contractAddress;
    }

    // Get contract addresses from id
    function getSBTContract(uint contractId) public view returns (address) {
        return addressById[contractId];
    }

    // Users call this function for minting various kinds of SBTs.
    // They should pass the signature issued from backend to the parameter
    function mint(uint contractId, bytes memory signature) public {
        ISBT(addressById[contractId]).safeMint(msg.sender, signature);
    }
}
