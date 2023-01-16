import React, { useContext, createContext } from "react";

import { useContract, useMetamask, useContractWrite, useAddress } from '@thirdweb-dev/react';
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x8409510c5aC4Ec2199a31C2313dD5B8f622aEC8F');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      ]);

      console.log('====================================');
      console.log("CALL SUCCESS", data);
      console.log('====================================');
    } catch (error) {
      console.log('====================================');
      console.log("CALL FAIL", error);
      console.log('====================================');
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
