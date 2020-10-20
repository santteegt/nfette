pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is AccessControl, ERC20 {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, msg.sender), "ERC20Mock: must have minter role to mint");
        _;
    }

    constructor(string memory _name, string memory _symbol) public ERC20(_name, _symbol) {
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 value) external onlyMinter {
        _mint(to, value);
    }

}