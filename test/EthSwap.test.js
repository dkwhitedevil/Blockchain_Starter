const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
    let ethSwap, token;

    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, tokens('100000'));
    });

    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name();
            assert.equal(name, 'DApp Token');
        });
    });

    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Instant Exchange');
        });

        it('contract has tokens', async () => {
            let balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance.toString(), tokens('100000'));
        });
    });

    describe('buyTokens()', async () => {
        let result;
        before(async () => {
            result = await ethSwap.buyTokens({from : investor , value: web3.utils.toWei('1', 'ether')});
        });
        it('allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
           let investorBalance = await token.balanceOf(investor);
           assert.equal(investorBalance.toString(), tokens('100'));
           let ethSwapBalance = await token.balanceOf(ethSwap.address);
           assert.equal(ethSwapBalance.toString(), tokens('99900'));
              let ethSwapEthBalance = await web3.eth.getBalance(ethSwap.address);
              assert.equal(ethSwapEthBalance.toString(), web3.utils.toWei('1', 'ether'));
              const event = result.logs[0].args;
                assert.equal(event.account, investor);
                assert.equal(event.token, token.address);
                assert.equal(event.amount.toString(), tokens('100'));
                assert.equal(event.rate.toString(), '100');            
        });
    });

    describe('sellTokens()', async () => {
        let result;
    
        before(async () => {
            await token.approve(ethSwap.address, tokens('100'), {from: investor});
            result = await ethSwap.sellTokens(tokens('100'), {from: investor});
        });
        it('allows user to instantly sell tokens to ethSwap for a fixed price', async () => {
           let investorBalance = await token.balanceOf(investor);
           assert.equal(investorBalance.toString(), tokens('0'));
           let ethSwapBalance = await token.balanceOf(ethSwap.address);
           assert.equal(ethSwapBalance.toString(), tokens('100000')); // Fixed expected value
           ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
              assert.equal(ethSwapBalance.toString(), web3.utils.toWei('0', 'ether'));
        });
    });

});
