import React, {useContext} from 'react';
import {Store} from "../../store/store";
import styles from "./selectPriceStyles";
import {withStyles} from "@material-ui/core/styles";


function SelectPrice(props) {
    const {state, actions} = useContext(Store);
    const {classes, navigation} = props;
    const {next, previous} = navigation;
    
    const {nftDetails} = state;
    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
            <h2 className={classes.subheading}>1. Set your Collateral Type and Price</h2>
                <div className="gradientBorder"></div>
            </div>
            <div className={classes.infoBox}>
                    <div className={classes.smallBox}>
                        <div>Name: {nftDetails.name}</div>
                        <div>URL: {nftDetails.url}</div>
                        <div>NFT Symbol: {nftDetails.symbol}</div>
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <label className={classes.label}>Collateral Type accepted</label>
                    <select className={classes.select} name="collateral type" value={state.collateralType} onChange={(e)=> actions.setCollateralType(e.target.value)}>
                    <option value="" selected></option>
                        <option value="DAI" >DAI</option>
                         <option value="USDC" >USDC</option>
                        <option value="ETH">ETH</option>
                    </select>
                    <label className={classes.label}>Initial Price for ERC20 Token on Market</label>
                    <input className={classes.input} onChange={(e)=> actions.setInitialPrice(e.target.value)} value={state.initialPrice} name="initialPrice" type="text" />
                </div>
                

                <div className={classes.btnBar}>
                    <button  onClick={()=> previous()}  className={classes.btnLeft}  >Back</button>
                    <button onClick={()=> next()} className={classes.btnRight}  >Mint</button>
                </div>
            </div>
    )
}

export default withStyles(styles)(SelectPrice);