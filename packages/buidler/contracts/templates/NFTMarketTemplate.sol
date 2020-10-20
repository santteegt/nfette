pragma solidity >=0.6.0 <0.7.0;

import "../interfaces/INFTMarketTemplate.sol";
import "../interfaces/ICurve.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/introspection/ERC165.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@nomiclabs/buidler/console.sol";

contract NFTMarketTemplate is INFTMarketTemplate, ERC20Capped, ERC165, Ownable {

    using SafeMath for uint256;

    bool private _initialized = false;
    // IERC721 public contentSubscription;

    address private _parentToken;
    uint256 private _parentTokenId;
    string private _name;
    string private _symbol;
    address private _minter;
    uint256 private _cap;
    ICurve private _bondigCurve;
    IERC20 private _stakeToken;
    uint8 private constant DECIMALS = 18;

    /*
     *     bytes4(keccak256('parentToken()')) ==
     *     bytes4(keccak256('parentTokenId')) ==
     *
     *     => ? ^ ? == 0x5755c3f2
     */
    bytes4 private constant _INTERFACE_ID_EIP_1633 = 0x5755c3f2;

    modifier onlyIfNotInitialized() {
        require(!_initialized, 'NFTMarketTemplate: Contract already initialized');
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == _minter, 'NFTMarketTemplate: invalid minter');
        _;
    }

    constructor(
        address parentToken,
        uint256 parentTokenId,
        string memory name,
        string memory symbol,
        address minterAddress,
        uint256 cap,
        address bondingCurveAddr,
        address stakeTokenAddress
        ) ERC20(name, symbol) ERC20Capped(cap) public {

            console.log(msg.sender, "deploy a template with minter", minterAddress);

            _registerInterface(_INTERFACE_ID_EIP_1633); // RFT interface

            _initialize(parentToken,
                        parentTokenId,
                        name,
                        symbol,
                        minterAddress,
                        cap,
                        bondingCurveAddr,
                        stakeTokenAddress);

    }

    function initialize(
        address parentToken,
        uint256 parentTokenId,
        string calldata name,
        string calldata symbol,
        address minterAddress,
        uint256 cap,
        address bondingCurveAddr,
        address stakeTokenAddress) external override onlyIfNotInitialized returns (bool) {

        return _initialize(
            parentToken,
            parentTokenId,
            name,
            symbol,
            minterAddress,
            cap,
            bondingCurveAddr,
            stakeTokenAddress);

    }

    function _initialize(
        address parentToken,
        uint256 parentTokenId,
        string memory name,
        string memory symbol,
        address minterAddress,
        uint256 cap,
        address bondingCurveAddr,
        address stakeTokenAddress) private returns (bool) {

            console.log("_initialize template", IERC721(parentToken).supportsInterface(0x80ac58cd), IERC721(parentToken).ownerOf(parentTokenId));
            console.log("minterAddress", minterAddress);

            require(
                IERC721(parentToken).supportsInterface(0x80ac58cd) &&
                IERC721(parentToken).ownerOf(parentTokenId) == minterAddress,  // TODO: How the NFT is minted/given ownership to this contract
                "NFTMarketTemplate: Parent token isn't an ERC721 or it isn't owned by minter"
            );

            require(
                minterAddress != address(0), "NFTMarketTemplate: invalid minterAddress"
            );

            require(
                cap > 0, "NFTMarketTemplate: Invalid cap"
            );

            require(
                address(IERC20(stakeTokenAddress)) == stakeTokenAddress, "NFTMarketTemplate: Invalid stakeTokenAddress"
            );

            //TOOD: validate bondingCurveAddr

            _parentToken = parentToken;
            _parentTokenId = parentTokenId;
            _name = name;
            _symbol = symbol;
            _minter = minterAddress;
            _cap = cap;
            // TODO: assign bonding curve
            _stakeToken = IERC20(stakeTokenAddress);

            // _mint(name, symbol, DECIMALS, address(this), cap);

            _initialized = true;

            return _initialized;
    }

    function mint(
        address receiver,
        uint256 value) external override {
            _mint(receiver, value);
    }

    // function mint(
    //     string calldata _ftName,
    //     string calldata _ftSymbol,
    //     uint256 _ftDecimals,
    //     address _ftOwner,
    //     uint256 _ftSupply) external override returns (uint256) {

    //         // Ensures only one NFT is minted
    //         int256 tokenId = uint256(keccak256(abi.encodePacked(owner())));

    //         // TODO: mint ERC-20

    //         // super._safeMint(owner(), tokenId);
    //         return tokenId;
    // }

    function isMinter(address account) external view override returns(bool) {
        return (_minter == account);
    }

    function minter() external view override returns(address) {
        return _minter;
    }

    // function decimals() external override view returns(address) {
    //     return DECIMALS;
    // }

    function isInitialized() external view override returns(bool) {
        return _initialized;
    }

    function parentToken() external view override returns(address) {
        return _parentToken;
    }

    function parentTokenId() external view override returns(uint256) {
        return _parentTokenId;
    }

    // /**
    //  * @dev See {IERC721Receiver-onERC721Received}.
    //  *
    //  * Always returns `IERC721Receiver.onERC721Received.selector`.
    //  */
    // function onERC721Received(address, address, uint256, bytes memory) public override returns (bytes4) {
    //     return this.onERC721Received.selector;
    // }

}