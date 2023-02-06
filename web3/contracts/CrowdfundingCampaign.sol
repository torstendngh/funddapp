// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract CrowdfundingCampaign {

    address payable public deployer;

    constructor() {
        deployer = payable(msg.sender);
    }

    struct Campaign {
        uint campaignID;
        address payable owner;
        string title;
        string description;
        string image;
        uint duration;
        uint raisingGoal; //you called it target
        uint deadline;
        uint amountCollected;
        mapping(address => uint) donators;
    }

    mapping(uint => Campaign) public campaigns;

    uint public numberOfCampaigns = 0;

    function createCampaign(
        uint _duration,
        uint _raisingGoal,
        string memory _title,
        string memory _description,
        string memory _image
    ) public returns (uint) {

        // Check for past campaigns that have passed deadline and have no donations
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            if (block.timestamp > campaign.deadline && campaign.amountCollected == 0) {
                delete campaigns[i];
            }
        }

        uint _campaignID = numberOfCampaigns;
        uint _deadline = block.timestamp + _duration;

        require(campaigns[_campaignID].deadline < getCurrentTime(), "The deadline should be in the future");

        campaigns[_campaignID].campaignID = _campaignID;
        campaigns[_campaignID].owner = payable(msg.sender);
        campaigns[_campaignID].title = _title;
        campaigns[_campaignID].description = _description;
        campaigns[_campaignID].image = _image;
        campaigns[_campaignID].duration = _duration;
        campaigns[_campaignID].raisingGoal = _raisingGoal;
        campaigns[_campaignID].deadline = _deadline;
        campaigns[_campaignID].amountCollected = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // function to add ETH to a specific campaign, checked if it's still ongoing, stores donator and amount of ETH
    function donateToCampaign(
        uint _campaignID
    ) public payable {
        Campaign storage campaign = campaigns[_campaignID];

        require(campaign.campaignID >= 0, "Out of range.");
        require(block.timestamp < campaign.deadline, "Campaign deadline has passed.");

        campaign.amountCollected += msg.value;  // <-- transfer msg.value here and add it to amountCollected
        campaign.donators[msg.sender] += msg.value;  // <-- store msg.value here linked to a donator address, so we can use it for the refund function later
    }
    
    // function to return ETH to donator on calling it
    function refund(uint _campaignID) public {
        Campaign storage campaign = campaigns[_campaignID];

        require(campaign.campaignID >= 0, "Out of range.");
        require(campaign.amountCollected < campaign.raisingGoal, "Campaign goal has been reached.");
        // require(block.timestamp > campaign.deadline, "Campaign deadline has not passed."); // <-- refund only if campaign fails
        require(campaign.donators[msg.sender] > 0, "You have not contributed to this campaign.");

        address payable sender = payable(msg.sender);

        // Refund the caller's contribution
        uint amount = campaign.donators[msg.sender]; // <-- get the transfer value from mapping storage
        (bool sent, ) = sender.call{value: amount}(""); // <-- check if the transfer was successful, return 'sent' on success

        require(sent, "ETH Refund failed"); // <-- if no 'sent', return an error

        campaign.donators[msg.sender] = 0;  // <-- set contribution to 0
        campaign.amountCollected -= amount; // <-- decrease campaigns 'amountCollected', delete campaign when all funds returned

        if (campaign.amountCollected == 0 && block.timestamp > campaign.deadline){
            delete campaigns[_campaignID];
        }
    }

    function withdrawFunds(uint _campaignID) public { // <-- only available for Campaign creator, if funds were fully raised
        Campaign storage campaign = campaigns[_campaignID];

        require(campaign.campaignID >= 0, "Out of range.");
        require(campaign.amountCollected >= campaign.raisingGoal, "Campaign goal has not been reached."); // <-- check fund goal
        require(msg.sender == campaign.owner, "Only the campaign creator can withdraw funds."); // <-- check caller's adress, fail if not owner
        
        uint commission = campaign.amountCollected * 5 / 100;
        uint withdrawalAmount = campaign.amountCollected - commission;
        (bool sent, ) = campaign.owner.call{value: withdrawalAmount}(""); // <-- withdraw funds only for called Campaign, returns 'sent' on success
        
        require(sent, "ETH Withdrawal failed"); // <-- if no 'sent', return an error
        
        (bool commissioned, ) = deployer.call{value: commission}("");
        
        require(commissioned, "Commission transfer failed");

        delete campaigns[_campaignID]; // <-- remove our withdrawn Campaign from our mapping storage
    }

    struct CampaignView {
        uint campaignID;
        address owner;
        uint duration;
        uint raisingGoal;
        uint deadline;
        uint amountCollected;
        string title;
        string description;
        string image;
    }

    function getAllCampaigns() public view returns (CampaignView[] memory) {
        CampaignView[] memory result = new CampaignView[](numberOfCampaigns);

        for (uint j = 0; j < numberOfCampaigns; j++) {
            result[j].campaignID = campaigns[j].campaignID;
            result[j].owner = campaigns[j].owner;
            result[j].duration = campaigns[j].duration;
            result[j].raisingGoal = campaigns[j].raisingGoal;
            result[j].deadline = campaigns[j].deadline;
            result[j].amountCollected = campaigns[j].amountCollected;
            result[j].title = campaigns[j].title;
            result[j].description = campaigns[j].description;
            result[j].image = campaigns[j].image;
        }
        return result;
    }

    function getCurrentTime()public view returns(uint){ // <-- function to get a current time, used that only for testing
        return block.timestamp;
    }
}
