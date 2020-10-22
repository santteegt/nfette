import React from 'react';
import Navbar from "./components/navbar/navbar";
import MultiStepSellFlow from './SellFlow/MultiStepSellFlow';
import {StoreProvider} from "./store/store";
import './App.css';
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

// must register dapp to get portis ID

const providerOptions = {
  portis: {
    package: Portis,
    options: {
      id: 'f5c8dbd5-f553-4641-943e-9223c9e65a0a', 
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
