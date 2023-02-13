// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ChiosERC20 is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint256 constant _initialSupply = 100000;

    uint256 constant _cappedSupply = 1000000;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC20_init("ChiosERC20", "C20");
        __ERC20Burnable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        _mint(msg.sender, _initialSupply);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        burn(amount / 10);
        return super.transfer(to, (amount * 9) / 10);
    }

    function burn(uint256 amount) public override {
        super.burn(amount);
    }

    function mint(uint256 amount) public {
        if (totalSupply() > _cappedSupply) {
            revert("ERC20Capped: cap exceeded");
        }
        super._mint(msg.sender, amount);
    }
}
