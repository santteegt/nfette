pragma solidity >=0.6.0 <0.7.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";

contract MyNFT is ERC721Burnable, Ownable {

    constructor(string memory _name, string memory _symbol, string memory _baseURI) public ERC721(_name, _symbol) {
        _setBaseURI(_baseURI);
    }

    function mint(address _to, uint256 _tokenId) external onlyOwner {
        _safeMint(_to, _tokenId);
    }

}