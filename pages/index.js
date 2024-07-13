import { useState, useEffect } from "react";
import { ethers } from "ethers";
import voting_abi from "../artifacts/contracts/Voting.sol/Voting.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [voting, setVoting] = useState(undefined);
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
  const votingABI = voting_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getVotingContract();
  };

  const getVotingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet); // Explicitly set the network
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(contractAddress, votingABI, signer);

    setVoting(votingContract);
  };

  const addProposal = async () => {
    if (voting) {
      let tx = await voting.addProposal(newProposal);
      await tx.wait();
      setNewProposal("");
      getProposals();
    }
  };

  const vote = async (id) => {
    if (voting) {
      let tx = await voting.vote(id);
      await tx.wait();
      getProposals();
    }
  };

  const getProposals = async () => {
    if (voting) {
      let count = await voting.proposalCount();
      let proposalsArray = [];
      for (let i = 1; i <= count; i++) {
        let proposal = await voting.getProposal(i);
        proposalsArray.push(proposal);
      }
      setProposals(proposalsArray);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (voting) {
      getProposals();
    }
  }, [voting]);

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask to use this voting system.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect your Metamask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <input
          type="text"
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Name of the candidate"
        />
        <button onClick={addProposal}>Add Candidate</button>
        <h2>Candidates:</h2>
        {proposals.map((proposal) => (
          <div key={proposal.id.toString()}>
            <p>{proposal.description} - Votes: {proposal.voteCount.toString()}</p>
            <button onClick={() => vote(proposal.id)}>Vote</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="container">
      <header>
        <h1>Online Voting System</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
