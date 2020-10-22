pragma solidity >=0.6.0 <0.7.0;

import "./IRFT.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface INFTMarket is IRFT/*, IERC721Receiver*/ {

    function initialize(
        address _parentToken,
        uint256 _parentTokenId,
        string calldata _name,
        string calldata _symbol,
        address _minterAddress,
        uint256 _cap,
        uint256 initialBidPrice,
        address bondingCurveAddr,
        uint256[3] calldata curveParameters,
        address _stakeTokenAddress
    ) external returns (bool);

    // function mint(
    //     address _receiver,
    //     uint256 _value) external;   

    // function mint(
    //     string calldata _ftName,
    //     string calldata _ftSymbol,
    //     uint256 _ftDecimals,
    //     address _ftOwner,
    //     uint256 _ftSupply) external returns (uint256);

    function isMinter(address account) external view returns(bool);
    function minter() external view returns(address);
    function cap() external view returns(uint256);
    function isInitialized() external view returns(bool);

    function stakeBalanceOf(address account) external view returns(uint256);
    function sharesBalanceOf(address account) external view returns(uint256);

    function buy(uint256 _tokens) external;
    function withdraw(uint256 _tokens) external;
    function getBuyCost(uint256 _tokens) external view returns(uint256);
    function getSellAmount(uint256 _tokens) external view returns(uint256);
    function getCurve() external view returns (
        uint256,
        uint256,
        uint256
    );
    function getStakeToken() external view returns(address);
    function getMarketStatus() external view returns(uint256, bool);
    function closeMarket() external returns (bool);

}