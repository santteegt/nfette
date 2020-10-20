pragma solidity >=0.6.0 <0.7.0;

interface ICurve {
    function getBuyPrice(
        uint256 _tokens
    )
        external
        view
        returns(uint256);

    function getSellAmount(
        uint256 _tokens
    )
        external
        view
        returns(uint256);
}