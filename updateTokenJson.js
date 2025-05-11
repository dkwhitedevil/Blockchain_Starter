const fs = require('fs');
const path = require('path');

// Path to the Token.json file
const tokenJsonPath = path.join(__dirname, 'src', 'abis', 'Token.json');

// Network ID and new contract address
const networkId = '5777'; // Replace with your desired network ID
const newAddress = '0xb1751F62fe741Ee1e0d21873c1Fb3CCbd0Ff0504'; // Replace with your new contract address

try {
  // Read the existing Token.json file
  const tokenJson = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf8'));

  // Update the networks object with the new address
  tokenJson.networks[networkId] = {
    ...tokenJson.networks[networkId], // Preserve existing data if any
    address: newAddress,
  };

  // Write the updated content back to Token.json
  fs.writeFileSync(tokenJsonPath, JSON.stringify(tokenJson, null, 2), 'utf8');
  console.log(`Token.json updated successfully with network ID ${networkId} and address ${newAddress}`);
} catch (error) {
  console.error('Error updating Token.json:', error);
}