// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SoulBoundToken is ERC721 {
    address public owner;
    address public manager;

    uint private _totalSupply;

    event SafeMint(address indexed to);

    constructor(address _manager, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
        manager = _manager;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    // Overriden function, Not used directly
    function _beforeTokenTransfer(address from, address to, uint tokenId, uint batchSize) internal override {
        require(from == address(0), "SoulBoundToken not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function one() public view returns (address) {
        return owner;
    }

    // Called from Manage Contract, not used directly
    function safeMint(address to) external onlyManager {
        _totalSupply += 1;
        _safeMint(to, _totalSupply);
        emit SafeMint(to);
    }
}
