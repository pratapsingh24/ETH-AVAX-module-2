# ETH-AVAX-module-2


## Steps to launch the front-end page:

Inside the project directory, in the terminal type: npm i

Open two additional terminals in your VS code

In the second terminal type: npx hardhat node

In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js

In the first terminal, type npm run dev to launch the front end.

After this, the project will be running on our localhost. Typically at http://localhost:3000/



## State Variables
ethWallet: Stores the Ethereum wallet object (MetaMask).

account: Stores the user's Ethereum account address.

atm: Stores the reference to the smart contract.

balance: Stores the user's balance from the smart contract.

## Constants
contractAddress: The address of the deployed smart contract.

atmABI: The smart contract's ABI (Application Binary Interface) is imported from a JSON file.

## Functions
getWallet:
Checks if MetaMask is installed by checking window.ethereum.
If MetaMask is available, sets ethWallet to window.ethereum.
If ethWallet is set, requests the user's Ethereum accounts and calls handleAccount with the account.

handleAccount:
Takes an account as a parameter.
If an account is provided, sets the account state and logs it. Otherwise, logs "No account found".

connectAccount:
If MetaMask is not installed, alerts the user.
Otherwise, requests the user's accounts from MetaMask and handles the account using handleAccount.
After connecting the account, calls getATMContract to get the smart contract reference.

getATMContract:
Creates a provider and signer using ethers.
Creates a new ethers.Contract instance with the contract address, ABI, and signer.
Sets the atm state to this contract instance.

getBalance:
If the contract instance (atm) is set, calls the getBalance method on the contract and updates the balance state.

deposit:
Calls the deposit method on the smart contract to deposit 1 ETH.
Waits for the transaction to complete and then updates the balance by calling getBalance.

withdraw:
Calls the withdraw method on the smart contract to withdraw 1 ETH.
Waits for the transaction to complete and then updates the balance by calling getBalance.

## Component Rendering

initUser:
Checks if MetaMask is installed. If not, returns a message asking the user to install MetaMask.
If the account is not connected, returns a button to connect the MetaMask wallet.
If the balance is undefined, calls getBalance to fetch the balance.
Renders the user's account, balance, and buttons to deposit and withdraw 1 ETH.

useEffect:
Calls getWallet on component mount to initialize the wallet connection.

return:
Renders the main structure of the page, including the header and the result of initUser.



## Authors
Pratap Singh
@pratapsingh24

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
