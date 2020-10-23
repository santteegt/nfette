pragma solidity >=0.6.0 <0.7.0;

interface IaToken {
    function balanceOf(address _user) external view returns (uint256);
    function redeem(uint256 _amount) external;
}