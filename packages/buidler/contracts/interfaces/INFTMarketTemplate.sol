pragma solidity >=0.6.0 <0.7.0;

import "./IRFT.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface INFTMarketTemplate is IRFT/*, IERC721Receiver*/ {

    function initialize(
        address _parentToken,
        uint256 _parentTokenId,
        string calldata _name,
        string calldata _symbol,
        address _minterAddress,
        uint256 _cap,
        address bondingCurveAddr,
        address _stakeTokenAddress
    ) external returns (bool);

    function mint(
        address _receiver,
        uint256 _value) external;   

    // function mint(
    //     string calldata _ftName,
    //     string calldata _ftSymbol,
    //     uint256 _ftDecimals,
    //     address _ftOwner,
    //     uint256 _ftSupply) external returns (uint256);

    function isMinter(address account) external view returns(bool);
    function minter() external view returns(address);
    // function decimals() external view returns(address);
    function isInitialized() external view returns(bool);

}