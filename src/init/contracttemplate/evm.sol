// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferProxy {
    address private owner;

    // Event for logging ownership transfers
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender; // Initialize the contract owner as the deployer
        emit OwnershipTransferred(address(0), msg.sender); // Log the initial ownership assignment
    }

    // Modifier to restrict function access to the current owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Function to transfer ownership of the contract to a new address
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(owner, newOwner); // Log the ownership transfer
        owner = newOwner; // Set the new owner
    }

    // Example function that only the owner can call
    function sensitiveOperation() public onlyOwner {
        // Some sensitive operation here
    }

    // Interface for the ERC-20 token function you want to call
    interface IERC20 {
        function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    }

    // Function to transfer tokens on behalf of an EOA, can be called only by the owner
    function transferTokenOnBehalf(IERC20 token, address from, address to, uint256 amount) external onlyOwner {
        require(token.transferFrom(from, to, amount), "Transfer failed");
    }
}
