// Modules
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useDisconnect, useContractWrite, useChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import unidecode from 'unidecode';
import { dummyDonatorList } from './dummyDonatorList';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading, error } = useContract("0xa3162CAfDFbC006A2350C575872042ea22F38c9D");
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const chainId = useChainId();

  // Minimum goal amount in ETH
  const MIN_GOAL_AMOUNT = 0.001;

  /**
   * Publishes project to blockchain
   * @param {object} form 
   */
  const publishProject = async (form) => {
    try {
      
      const dateNow = new Date().getTime()
      const deadlineDate = new Date(form.deadline).getTime()
      const duration = Math.floor(( deadlineDate - dateNow ) / 1000)

      const data = await createCampaign([
        duration,
        form.goal,
        form.title,
        form.description,
        form.image
      ]);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const withdrawFunds = async (campaignID) => {
    const data = await contract.call("withdrawFunds", campaignID)
  }

  /**
   * Get all projects on blockchain
   * @returns {array} All projects
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

    const filteredDeletedProjects = parsedProjects.filter((project) => project.pId != 0 );

    const currentlyRunningProjects = filteredDeletedProjects.filter((project) => project.deadline >= (Date.now() / 1000) );
    
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
    const allProjects = await getProjects();

    const filteredProjects = allProjects.filter((project) => project.owner === address);

    return filteredProjects;
  };

  /**
   * Get all projects that include string in title or description
   * @param {string} search 
   * @returns {array}
   */
  const getSearchProjects = async (search) => {
    if (!search || search == null) search = "";
    const allProjects = await getProjects();

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


  const donate = async (campaignID, amount) => {
    const data = await contract.call('donateToCampaign', campaignID, { value: ethers.utils.parseEther(amount)});
    return data;
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
        withdrawFunds
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
