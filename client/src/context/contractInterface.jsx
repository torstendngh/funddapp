// Modules
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useDisconnect, useContractWrite, useChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import unidecode from 'unidecode';
import { dummyDonatorList } from './dummyDonatorList';

const StateContext = createContext(); // Create a react context

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0xa3162CAfDFbC006A2350C575872042ea22F38c9D"); // Connect with contract

  const address = useAddress(); // Get user address
  const connect = useMetamask(); // Get connect with Metamask function
  const disconnect = useDisconnect(); // Get disconnect function
  const chainId = useChainId();

  const MIN_GOAL_AMOUNT = 0.001; // Minimum goal amount in ETH

  /**
   * Publishes project to blockchain
   * @param {object} form 
   */
  const publishProject = async (form) => {
    
    const dateNow = new Date().getTime() // Date now
    const deadlineDate = new Date(form.deadline).getTime() // Date of deadline
    const duration = Math.floor(( deadlineDate - dateNow ) / 1000) // Calculate duration between and convert to seconds

    const data = await contract.call("createCampaign", duration, form.goal, form.title, form.description, form.image)
  };

  /**
   * Withdraws funds from id
   * @param {number} campaignID 
   */
  const withdrawProjectFunds = async (campaignID) => {
    const data = await contract.call('withdrawFunds', campaignID)
  }

  /**
   * Get all projects on blockchain
   * @returns {array} projects
   */
  const getProjects = async (includeFinished = false) => {
    const projects = await contract.call('getAllCampaigns');

    const parsedProjects = projects.map((project, i) => ({
      owner: project.owner,
      title: project.title,
      description: project.description,
      goal: ethers.utils.formatEther(project.raisingGoal.toString()),
      deadline: project.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(project.amountCollected.toString()),
      image: project.image,
      pId: project.campaignID,
    }));

    const filteredDeletedProjects = parsedProjects.filter((project) => project.pId != 0 ); // Filters deleted projects

    const currentlyRunningProjects = filteredDeletedProjects.filter((project) => project.deadline >= (Date.now() / 1000) ); // Filters finished projects
    
    if (includeFinished) {
      return filteredDeletedProjects;
    } else {
      return currentlyRunningProjects;
    }
  };

  /**
   * Get all projects created by user
   * @returns {array} All projects by user
   */
  const getUserProjects = async () => {
    const allProjects = await getProjects(true);

    const filteredProjects = allProjects.filter((project) => project.owner === address);

    return filteredProjects;
  };

  /**
   * Get all projects that include string in title or description
   * TODO: optimize with back-end database
   * @param {string} search 
   * @returns {array} - [0]: Results filtered by title, [1]: Results filtered by description
   */
  const getSearchProjects = async (search) => {

    if (!search || search == null) search = ""; // Check if search contains content

    const allProjects = await getProjects(); // Get all projects

    /**
     * Filters projects.
     * For every projects title:
     * 1. remove special characters and make them to the standard latin alphabet (e.g. Ö -> O)
     * 2. make upper case
     * 3. remove spaces
     * 4. do steps 1-3 for search prompt too
     * 5. if title and search prompt match after alteration, keep project in array
     */
    const filteredByTitle = allProjects.filter((project) => 
      unidecode(
        project.title
        .toUpperCase()
        .replace(/\s/g, ""))
      .includes(
        unidecode(
          search
          .toUpperCase()
          .replace(/\s/g, "")
        )
      )
    );

    /**
     * Same as above but with the project description
     */
    const filteredByDescription = allProjects.filter((project) => 
      unidecode(
        project.description
        .toUpperCase()
        .replace(/\s/g, ""))
      .includes(
        unidecode(
          search
          .toUpperCase()
          .replace(/\s/g, "")
        )
      )
    );

    return [filteredByTitle, filteredByDescription];
  };

  /**
   * Donate ETH amount to project
   * @param {number} campaignID 
   * @param {number} amount - in ETH
   */
  const donate = async (campaignID, amount) => {
    const data = await contract.call('donateToCampaign', campaignID, { value: ethers.utils.parseEther(amount)});
  };

  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', pId);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     });
  //   }

  //   return parsedDonations;
  // };

  /**
   * Returns dummy donator list
   * TODO: Implement real donator list on back-end
   * @param {number} pId - This does nothing and is only for parity with actual function
   * @returns {object}
   */
  const getDonations = async (pId) => {
    return dummyDonatorList;
  };

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        disconnect,
        chainId,
        publishProject,
        getSearchProjects,
        getProjects,
        getUserProjects,
        MIN_GOAL_AMOUNT,
        donate,
        getDonations,
        withdrawProjectFunds
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
