// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    address public owner;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public voters;

    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
    }

    event ProposalCreated(uint256 id, string description);
    event Voted(uint256 id, address voter);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function addProposal(string memory _description) public onlyOwner {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _description, 0);
        emit ProposalCreated(proposalCount, _description);
    }

    function vote(uint256 _proposalId) public {
        require(!voters[msg.sender], "You have already voted");
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID");

        voters[msg.sender] = true;
        proposals[_proposalId].voteCount++;
        emit Voted(_proposalId, msg.sender);
    }

    function getProposal(uint256 _proposalId) public view returns (Proposal memory) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID");
        return proposals[_proposalId];
    }
}
