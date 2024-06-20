# ETH-AVAX-module-2


# Steps to launch the front-end page:

Inside the project directory, in the terminal type: npm i

Open two additional terminals in your VS code

In the second terminal type: npx hardhat node

In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js

In the first terminal, type npm run dev to launch the front end.

After this, the project will be running on our localhost. Typically at http://localhost:3000/



# Functions used:

getBalance(): A view function that returns the current balance of the contract.

depositamount(uint256 _amount) payable: A function that allows users to deposit a specified amount (_amount) to the contract. The payable modifier allows the function to receive Ether. It updates the balance variable, emits a Deposit event, and performs assertions to ensure the transaction is completed successfully.

withdrawamount(uint256 _withdrawAmount): A function that allows users to withdraw a specified amount (_withdrawAmount) from the contract. It checks if the contract has sufficient balance and reverts if the balance is insufficient. It updates the balance variable, emits a Withdraw event, and performs assertions to ensure the transaction is completed successfully.

error InsufficientBalance(uint256 balance, uint256 withdrawAmount): A custom error that is used when a withdrawal amount exceeds the contract balance.

checkbalance(): To check the balance of the user.

getbalancefromwalletaddress(address walletAddress): It will check the balance of another account with the given wallet address. Anyone will be abale to check the balance of any account with the wallet address.
