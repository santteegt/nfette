import React from 'react';
import Navbar from "./components/navbar/navbar";
import MultiStepSellFlow from './SellFlow/MultiStepSellFlow';
import {StoreProvider} from "./store/store";
import './App.css';

function App() {
  return (
    <StoreProvider>
        <div className="App">
          <Navbar />
          <MultiStepSellFlow />
        </div>
    </StoreProvider>
    
  );
}

export default App;
