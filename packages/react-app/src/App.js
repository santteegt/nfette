import React from 'react';
import Navbar from "./components/navbar/navbar";
import MultiStepSellFlow from './SellFlow/MultiStepSellFlow';
import {StoreProvider} from "./store/store";
import './App.css';
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

// must register dapp to get portis ID
const portisID = "";

const providerOptions = {
  portis: {
    package: Portis,
    options: {
      id: portisID, 
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

function App() {
  return (
    <StoreProvider>
        <div className="App">
          <Navbar web3modal={web3Modal} />
          <MultiStepSellFlow />
        </div>
    </StoreProvider>
    
  );
}

export default App;
