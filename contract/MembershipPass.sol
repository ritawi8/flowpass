// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MembershipPass is ERC721, Ownable {

    uint256 private _nextTokenId;

    constructor() ERC721("FlowPass Membership", "FLOWPASS") Ownable(msg.sender){}

    function mint(address to) external onlyOwner {
        _nextTokenId++;
        _safeMint(to, _nextTokenId);
    }

    function isMember(address user) external view returns (bool) {
        return balanceOf(user) > 0;
    }
}