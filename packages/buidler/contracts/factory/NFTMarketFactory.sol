pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

import "./Deployer.sol";
import "../interfaces/INFTMarketTemplate.sol";

import "@nomiclabs/buidler/console.sol";

/**
 * @title BSFactory contract
 * @author
 *
 * @dev Implementation of NFTMarket Factory
 *
 *      BSFactory deploys A BondedSubscription proxy contracts.
 *      New BondedSubscription proxy contracts are links to the template contract's bytecode.
 *      Proxy contract functionality is based on the ERC1167 standard
 *      https://eips.ethereum.org/EIPS/eip-1167
 */
contract NFTMarketFactory is Deployer {
    using SafeMath for uint256;

    address private _template;
    uint256 private nftMarketCounter = 1;

    event NFTMarketCreated(address indexed templateAddress, address indexed marketAddress, address indexed owner);

    event NFTMarketRegistered(
        address indexed marketAddress,
        address parentToken,
        uint256 parentTokenId,
        string name,
        string symbol,
        address indexed registeredBy,
        uint256 cap,
        address stakeTokenAddress
    );

    constructor(address template) public {
        require(template != address(0), 'NFTMarketFactory: Invalid contract template');
        _template = template;
    }

    function createMarket(
        address parentToken,
        uint256 parentTokenId,
        string memory name,
        string memory symbol,
        uint256 cap,
        address bondingCurveAddr,
        address stakeTokenAddress) public returns (address market) {

            address owner = msg.sender; // TODO: update to use Meta-Tx
            console.log("NEW Market owner", owner);
            market = deploy(_template);

            require(market != address(0), 'NFTMarketFactory: Failed to perform minimal deploy of a new subscription');

            INFTMarketTemplate marketInstance = INFTMarketTemplate(market);
            require(
                marketInstance.initialize(
                    parentToken,
                    parentTokenId,
                    name,
                    symbol,
                    owner,
                    cap,
                    bondingCurveAddr,
                    stakeTokenAddress), 'NFTMarketFactory: Unable to initialize market');
            emit NFTMarketCreated(address(_template), market, owner);
            emit NFTMarketRegistered(
                market,
                parentToken,
                parentTokenId,
                name,
                symbol,
                owner,
                cap,
                stakeTokenAddress);
            nftMarketCounter.add(1);
    }

    function getNFTMarketCount() external view returns (uint256) {
        return nftMarketCounter;
    }

    function getMarketTemplate() external view returns (address) {
        return address(_template);
    }

}