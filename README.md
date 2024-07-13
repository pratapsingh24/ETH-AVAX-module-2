# Online Voting System

This project is a simple online voting system built using Solidity for the smart contract and React for the frontend. It allows users to add proposals (candidates) and vote for their preferred proposal. Only the contract owner can add proposals, and each user can vote only once.

## Features
- Add proposals (candidates) to the voting system (owner only)
- Vote for a proposal
- View all proposals and their vote counts

## Requirements
- Node.js
- MetaMask extension for the browser
- Hardhat for Ethereum development

## Deployment
1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
6. After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Functions
1. addProposal(string memory _description): Adds a new proposal (only callable by the owner).
2. vote(uint256 _proposalId): Votes for a proposal.
3. getProposal(uint256 _proposalId): Retrieves the details of a proposal.

## Author
Pratap Singh

## License
This project is licensed under the MIT License.
