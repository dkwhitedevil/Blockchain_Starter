**Blockchain Starter**

A simple starter template for developing, testing, and deploying Ethereum smart contracts using the Truffle framework. This project includes a basic setup with Solidity contracts, migration scripts, and testing utilities to help kickstart your blockchain development journey.

**🚀 Features**

	📦 Truffle project setup
	🛠️ Solidity smart contracts
	📜 Migration scripts for deployment
	✅ Basic smart contract testing
	⚙️ Configured for local development and testnets


**📁 Project Structure**

    Blockchain_Starter/
    ├── contracts/               # Solidity smart contracts
    │   └── Migrations.sol
    ├── migrations/              # Deployment scripts
    │   └── 1_initial_migration.js
    ├── src/                     # Source code for frontend or scripts
    ├── test/                    # Contract test files
    │   └── ExampleTest.js
    ├── updateTokenJson.js       # Utility script for updating token metadata
    ├── truffle-config.js        # Truffle configuration
    ├── package.json             # Node project configuration


**🛠️ Getting Started**

    git clone https://github.com/dkwhitedevil/Blockchain_Starter.git
    cd Blockchain_Starter
    npm install


**⚙️ Usage**
	
	1. Compile Smart Contracts
	truffle compile
	
	2. Start Local Blockchain (Optional)
	Use Ganache UI or:
	truffle develop
	
	3. Deploy Contracts
	truffle migrate (Or) inside Truffle console: migrate
	
	4. Run Tests
	truffle test



