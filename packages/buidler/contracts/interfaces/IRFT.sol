pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRFT is IERC20, IERC165 {
    function parentToken() external view returns(address _parentToken);
    function parentTokenId() external view returns(uint256 _parentTokenId);
    // function supportsInterface(bytes4 interfaceID) external override view returns(bool);
}