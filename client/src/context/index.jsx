import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useDisconnect, useContractWrite, useChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import unidecode from 'unidecode'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x8409510c5aC4Ec2199a31C2313dD5B8f622aEC8F');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const chainId = useChainId();

  const publishProject = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getProjects = async () => {
    const projects = await contract.call('getCampaigns');

    const parsedProjects = projects.map((project, i) => ({
      owner: project.owner,
      title: project.title,
      description: project.description,
      target: ethers.utils.formatEther(project.target.toString()),
      deadline: project.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(project.amountCollected.toString()),
      image: project.image,
      pId: i
    }));

    return parsedProjects;
  }

  const getUserProjects = async () => {
    const allProjects = await getProjects();

    const filteredProjects = allProjects.filter((project) => project.owner === address);

    return filteredProjects;
  }

  const getSearchProjects = async (search) => {
    if (!search || search == null) search = ""
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
    )

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
    )

    return [filteredByTitle, filteredByDescription];
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


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
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
