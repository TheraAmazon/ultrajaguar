// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "hardhat/console.sol";

contract ULTRAJAGUAR is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, ERC721Burnable {
    mapping (address => bool) _blacklist;
    event BlacklistUpdated(address indexed user, bool value);
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BLOCKER_ROLE = keccak256("BLOCKER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    address multisig = 0x723b5aD644bDe85a51d30C92FFc7BDb40F940fC6;

    constructor(address marketplaceAddress) ERC721("ULTRAJAGUAR", "ULTRAJAGUAR") {
        _setupRole(DEFAULT_ADMIN_ROLE, multisig);
        _setupRole(PAUSER_ROLE, multisig);
        _setupRole(BLOCKER_ROLE, multisig);
        _setupRole(BURNER_ROLE, multisig);
        contractAddress = marketplaceAddress;
    }
    
    function blacklistUpdate(address user, bool value) public virtual onlyRole(BLOCKER_ROLE) {
        // require(_owner == _msgSender(), "Only owner is allowed to modify blacklist.");
        _blacklist[user] = value;
        emit BlacklistUpdated(user, value);
    }

    function isBlackListed(address user) public view returns (bool) {
        return _blacklist[user];
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        require (!isBlackListed(to), "Token transfer refused. Receiver is on blacklist");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function _burn(uint256 tokenId) internal onlyRole(BURNER_ROLE) override (ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}

