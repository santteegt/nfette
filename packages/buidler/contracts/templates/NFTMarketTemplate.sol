pragma solidity >=0.6.0 <0.7.0;

import "../interfaces/INFTMarket.sol";
import "../interfaces/ICurve.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/introspection/ERC165.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// import "@nomiclabs/buidler/console.sol";

contract NFTMarketTemplate is INFTMarket, /*ERC20Capped,*/ERC20, ERC165/*, Ownable*/ {

    using SafeMath for uint256;

    bool private _initialized = false;
    // IERC721 public contentSubscription;

    address private _parentToken;
    uint256 private _parentTokenId;
    string private _name;
    string private _symbol;
    address private _minter;
    uint256 private _cap;
    uint256 public initialBidPrice;
    ICurve private _bondigCurve;
    uint256[3] private _curveParameters;
    IERC20 private _stakeToken;
    // uint8 private constant DECIMALS = 18;
    mapping(uint256 => address) private _stakeholders;
    mapping(address => uint256) private _stakes;
    uint256 private _totalStakeholders = 0;
    mapping(address => uint256) private _shares;
    bool private _openMarket = true;

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

    modifier onlyIfCapNotReached(uint256 _value) {
        require(totalSupply().add(_value) <= _cap, 'NFTMarketTemplate: Buy tokens surpasses maxCap');
        _;
    }

    modifier openMarket() {
        require(_openMarket, 'NFTMarketTemplate: NFtMarket is closed');
        _;
    }

    constructor(
        address parentToken,
        uint256 parentTokenId,
        string memory name,
        string memory symbol,
        address minterAddress,
        uint256 cap,
        uint256 _initialBidPrice,
        address bondingCurveAddr,
        uint256[3] memory curveParameters,
        address stakeTokenAddress
        ) ERC20(name, symbol) /*ERC20Capped(cap)*/ public {

            // console.log(msg.sender, "deploy a template with minter", minterAddress);

            _registerInterface(_INTERFACE_ID_EIP_1633); // RFT interface

            _initialize(parentToken,
                        parentTokenId,
                        name,
                        symbol,
                        minterAddress,
                        cap,
                        _initialBidPrice,
                        bondingCurveAddr,
                        curveParameters,
                        stakeTokenAddress);

    }

    function initialize(
        address parentToken,
        uint256 parentTokenId,
        string calldata name,
        string calldata symbol,
        address minterAddress,
        uint256 cap,
        uint256 _initialBidPrice,
        address bondingCurveAddr,
        uint256[3] calldata curveParameters,
        address stakeTokenAddress) external override onlyIfNotInitialized returns (bool) {

        return _initialize(
            parentToken,
            parentTokenId,
            name,
            symbol,
            minterAddress,
            cap,
            _initialBidPrice,
            bondingCurveAddr,
            curveParameters,
            stakeTokenAddress);

    }

    function _initialize(
        address parentToken,
        uint256 parentTokenId,
        string memory name,
        string memory symbol,
        address minterAddress,
        uint256 cap,
        uint256 _initialBidPrice,
        address bondingCurveAddr,
        uint256[3] memory curveParameters,
        address stakeTokenAddress) private returns (bool) {

            // console.log("_initialize template", IERC721(parentToken).supportsInterface(0x80ac58cd), IERC721(parentToken).ownerOf(parentTokenId));
            // console.log("minterAddress", minterAddress);

            require(
                IERC721(parentToken).supportsInterface(0x80ac58cd) &&
                IERC721(parentToken).ownerOf(parentTokenId) == minterAddress,  // TODO: How the NFT is minted/given ownership to this contract
                "NFTMarketTemplate: Parent token isn't an ERC721 or it isn't owned by minter"
            );

            require(
                minterAddress != address(0), "NFTMarketTemplate: invalid minterAddress"
            );

            require(
                cap > 0, "NFTMarketTemplate: max cap invalid"
            );

            require(
                _initialBidPrice > 0, "NFTMarketTemplate: initialBidPrice invalid"
            );

            require(
                address(IERC20(stakeTokenAddress)) == stakeTokenAddress, "NFTMarketTemplate: Invalid stakeTokenAddress"
            );

            //TOOD: validate bondingCurveAddr
            require(
                address(ICurve(bondingCurveAddr)) == bondingCurveAddr, "NFTMarketTemplate: Invalid bondingCurveAddr"
            );

            _parentToken = parentToken;
            _parentTokenId = parentTokenId;
            _name = name;
            _symbol = symbol;
            _minter = minterAddress;
            _cap = cap;
            initialBidPrice = _initialBidPrice;
            _bondigCurve = ICurve(bondingCurveAddr);
            _curveParameters = curveParameters;
            _stakeToken = IERC20(stakeTokenAddress);
            _openMarket = true;
            _totalStakeholders = 0;

            // _mint(name, symbol, DECIMALS, address(this), cap);

            _initialized = true;

            return _initialized;
    }

    // function mint(
    //     address receiver,
    //     uint256 value) external override {
    //         _mint(receiver, value);
    // }

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

    function cap() external override view returns(uint256) {
        return _cap;
    }

    function isInitialized() external view override returns(bool) {
        return _initialized;
    }

    function parentToken() external view override returns(address) {
        return _parentToken;
    }

    function parentTokenId() external view override returns(uint256) {
        return _parentTokenId;
    }

    /**
      * @notice This function returns the variables that determine the behaviour
      *         of the curve.
      * @dev    The variables returned are used in the curves calculations.
      *         Below is the current version of the equation being used:
      *         a/3(x_1^3 - x_0^3) + b/2(x_1^2 - x_0^2) + c(x_1 - x_0)
      * @return uint256: a
      * @return uint256: b
      * @return uint256: c
      */
    function getCurve() external override view returns (
        uint256,
        uint256,
        uint256
    ) {
        return (
            _curveParameters[0],
            _curveParameters[1],
            _curveParameters[2]
        );
    }

    function getStakeToken() external override view returns(address) {
        return address(_stakeToken);
    }

    function stakeBalanceOf(address account) external override view returns(uint256) {
        return _stakes[account];
    }

    function sharesBalanceOf(address account) external override view returns(uint256) {
        return _shares[account];
    }

    /**
      * @param  _tokens: The number of tokens to buy.
      * @notice Buy against a capped bonding curve
      * @dev    This function will be blocked after the market has closed.
      */
    function buy(uint256 _tokens) external override onlyIfCapNotReached(_tokens) openMarket() {
        uint256 cost = getBuyCost(_tokens);
        address buyer = msg.sender;  // TODO: update to use Meta-Tx

        // console.log('buyer', buyer);
        // console.log('buy cost', cost);
        // console.log('initialBidPrice', initialBidPrice);
        // console.log('allowance', _stakeToken.allowance(buyer, address(this)));

        require(totalSupply() == 0 && cost >= initialBidPrice, "NFTMarketTemplate: buy cost does not cover the initial bid price");

        require(_stakeToken.allowance(buyer, address(this)) >= cost,
            "NFTMarketTemplate: User has not approved contract for token cost amount"
        );

        require(_stakeToken.transferFrom(buyer, address(this), cost),
            "NFTMarketTemplate: Transfering of collateral stake failed"
        );

        _stakeholders[_totalStakeholders] = buyer;
        _totalStakeholders = _totalStakeholders.add(1);
        _stakes[buyer] = _stakes[buyer].add(cost);
        // console.log('stakes[buyer]', _stakes[buyer]);
        _shares[buyer] = _shares[buyer].add(_tokens);

        // Final Shares are minted when the market closes

        // TODO: execute transition to DeFi position
        _mint(msg.sender, _tokens);
    }

    /**
      * @param  _tokens: The number fo tokens to sell.
      * @notice withdraw your stake.
      * @dev    This function will be blocked after the market has closed.
      */
    function withdraw(uint256 _tokens) external override {
        address sender = msg.sender;  // TODO: update to use Meta-Tx
        if (_openMarket) {
            // uint256 reward = getSellAmount(_tokens);
            uint256 reward = _stakes[sender];

            require(_shares[sender] >= _tokens, "NFTMarketTemplate: Cannot sell more tokens than owned");
            // require(this.stakeBalanceOf(sender) >= _tokens, "NFTMarketTemplate: Cannot withdraw more tokens than owned");

            // TODO: withdraw collateral from DeFi position

            require(_stakeToken.transfer(sender, reward), "NFTMarketTemplate: of collateral failed");

            _stakes[sender] = _stakes[sender].sub(reward);
            _shares[sender] = _shares[sender].sub(_tokens);
            _burn(msg.sender, _tokens);
        } else {
            uint256 toWithdraw = _stakes[sender];
            _stakes[sender] = 0;
            require(_stakeToken.transfer(sender, toWithdraw), "NFTMarketTemplate: of collateral failed");
        }
    }

    function getBuyCost(uint256 _tokens) public override view returns(uint256) {
        // TODO: What IF max cap is reached?
        return _bondigCurve.getBuyPrice(_tokens);
    }

    function getSellAmount(uint256 _tokens) public override view returns(uint256) {
        if(totalSupply() > 0) {
            return _bondigCurve.getSellAmount(_tokens);
        }
        return 0;
    }

    function getMarketStatus() external override view returns(uint256, bool) {
        return (totalSupply(), _openMarket);
    }

    function closeMarket() external override onlyMinter returns (bool) {
        // TODO: rebalance shares and withdraw accrued interests
        _openMarket = false;
        return true;
    }

    // /**
    //  * @dev See {IERC721Receiver-onERC721Received}.
    //  *
    //  * Always returns `IERC721Receiver.onERC721Received.selector`.
    //  */
    // function onERC721Received(address, address, uint256, bytes memory) public override returns (bytes4) {
    //     return this.onERC721Received.selector;
    // }

    /**
     * @dev See {ERC20-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - minted tokens must not cause the total supply to go over the cap.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to, amount);

        if (from == address(0)) { // When minting tokens
            require(totalSupply().add(amount) <= _cap, "NFTMarketTemplate: cap exceeded");
        }
    }

}