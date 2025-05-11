import React, { Component } from 'react';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json';
import Token from '../abis/Token.json';
import './App.css';
import Main from './Main';
import Navbar from './Navbar';

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. Consider using MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    console.log('Connected to network ID:', networkId);

    // Load Token contract
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      let tokenBalance = await token.methods.balanceOf(this.state.account).call();
      this.setState({ tokenBalance: tokenBalance.toString() });
      console.log('Token balance:', tokenBalance.toString());
    } else {
      window.alert('Token contract not deployed to this network.');
    }

    // Load EthSwap contract
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      const code = await web3.eth.getCode(ethSwapData.address);
console.log("Contract code at ethSwap address:", code);
if (code === '0x') {
    alert('ethSwapData.address is not a contract!');
}
      this.setState({ ethSwap });
      console.log('EthSwap contract address:', ethSwapData.address);
      //eth balance 
      let ethBalance = await web3.eth.getBalance(ethSwapData.address)
      this.setState({ ethBalance: ethBalance.toString() });
      console.log('EthSwap contract ETH balance:', web3.utils.fromWei(ethBalance, 'Ether'));
    } else {
      window.alert('EthSwap contract not deployed to this network.');
    }

    this.setState({ loading: false });
  }

  buyTokens = (etherAmount) => {
    if (!this.state.ethSwap || !this.state.ethSwap.methods) {
      console.error("EthSwap contract not loaded");
      return;
    }
  
    this.setState({ loading: true });
  
    this.state.ethSwap.methods.buyTokens().send({
      value: etherAmount,
      from: this.state.account,
    })
    .on('transactionHash', (hash) => {
      this.setState({ loading: false });
    });
  }
  

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      tokenBalance: '0',
      ethBalance: '0',
      loading: true,
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <p>Loading Web3, accounts, and contracts...</p>;
    } else {
      content = <Main ethBalance={this.state.ethBalance} 
      tokenBalance={this.state.tokenBalance} 
      buyTokens={this.buyTokens}

      />;
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center justify-content-center">
              <div className="content mr-auto ml-auto">{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
