pragma solidity ^0.5.16;

import "./Token.sol";
contract EthSwap{
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
        
    );

    constructor(Token _token) public {
        token = _token;
    }
    
    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in the reserve");
        token.transfer(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public payable {
        require(token.balanceOf(msg.sender) >= _amount, "Not enough tokens in the wallet");
        uint etherAmount= _amount / rate;
        require(address(this).balance >= etherAmount, "Not enough ether in the reserve");
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);
        emit TokensSold(msg.sender,address(token),etherAmount,rate);
    }
}
