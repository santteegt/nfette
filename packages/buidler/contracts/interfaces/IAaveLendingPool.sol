pragma solidity >=0.6.0 <0.7.0;

interface IAaveLendingPool {
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external;

    function getUserReserveData(address _reserve, address _user) external;
}