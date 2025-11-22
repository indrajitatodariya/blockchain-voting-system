// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Election {
    enum Phase { CREATED, VOTING, CLOSED }
    Phase public phase;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    address public admin;

    event VotingStarted();
    event Voted(address indexed voter, uint256 indexed candidateId);
    event VotingClosed();

    constructor(string[] memory _candidateNames) {
        admin = msg.sender;
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate(i, _candidateNames[i], 0));
        }
        phase = Phase.CREATED;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    function startVoting() external onlyAdmin {
        require(phase == Phase.CREATED, "Already started");
        phase = Phase.VOTING;
        emit VotingStarted();
    }

    function closeVoting() external onlyAdmin {
        require(phase == Phase.VOTING, "Not in voting phase");
        phase = Phase.CLOSED;
        emit VotingClosed();
    }

    function vote(uint256 candidateId) external {
        require(phase == Phase.VOTING, "Voting not active");
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateId < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount += 1;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }
}