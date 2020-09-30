//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

//
// import "@openzeppelin/contracts-ethereum-package/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract Jerry {
  using SafeMath for uint256;

  uint256 private value;
  uint256 private multiplier;

  event ValueChanged(uint256 newValue);
  event MultiplierChanged(uint256 newValue);

  function storeValue(uint256 newValue) public {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function changeMultiplier(uint newValue) public {
    multiplier = newValue;
    emit MultiplierChanged(newValue);
  }

  function retrieveValue() public view returns (uint256) {
    return value;
  }

  function retrieveProduct() public view returns (uint256) {
    return value.mul(multiplier);
  }
}