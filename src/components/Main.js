import React, { Component } from 'react';
import ethLogo from '../eth-logo.png';
import dappLogo from '../token-logo.png';
import './Main.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: 0,
            etherAmount: 0
        };
    }
  render() {
    return (
        <form className="exchange-form" onSubmit={(event) => {
            event.preventDefault();
            let etherAmount;
            etherAmount = this.input.value.toString();
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
            this.props.buyTokens(etherAmount);
            console.log("Buying tokens...");
        }}>
      <div className="exchange-container">
        <header className="exchange-header">
          <h2 className="exchange-title">Token Exchange</h2>
          <p className="exchange-description">
            Swap your ETH for DApp tokens instantly and securely.
          </p>
        </header>

        <div className="exchange-body">
          <div className="input-group">
            <label>Input</label>
            <div className="input-field">
              <input type="text" 
              onChange={(event) =>{
                console.log("Loading...");
                const etherAmount = this.input.value.toString();
                this.setState({
                    output: etherAmount * 100,
                    etherAmount: etherAmount
                });
              }}
                ref={(input) => { this.input = input }}
              placeholder="0" />
              <span className="token">
                <img src={ethLogo} alt="ETH" className="token-icon" /> ETH
              </span>
            </div>
            <span className="balance">Balance: {window.web3.utils.fromWei(this.props.ethBalance,'Ether')} ETH</span>
          </div>

          <div className="input-group">
            <label>Output</label>
            <div className="input-field">
              <input type="number" value={ this.state.output} placeholder="0" disabled />
              <span className="token">
                <img src={dappLogo} alt="DApp" className="token-icon" /> DApp
              </span>
            </div>
            <span className="balance">Balance:  {window.web3.utils.fromWei(this.props.tokenBalance,'Ether')} DApp </span>
          </div>

          <div className="exchange-rate">
            <strong>Exchange Rate:</strong> 1 ETH = 100 DApp
          </div>
        </div>

        <footer className="exchange-footer">
          <button className="swap-button" type='submit'>SWAP!</button>
        </footer>
      </div>
      </form>
    );
  }
}

export default Main;
