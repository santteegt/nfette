import React, { useContext} from 'react';
import {Store} from "../../store/store";
import styles from "./createNFTStyles";
import {withStyles} from "@material-ui/core/styles";


function CreateNFT(props) {
    const {state, actions} = useContext(Store);
    const {classes, navigation} = props;
    const {next, go} = navigation;

    const handlePrevious = (e)=> {
        e.preventDefault();
        go("landingPage");
    }

    const handleNext = (e) => {
        e.preventDefault();
        next();
    }
    
    const {name, symbol, url} = state.nftDetails;

    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
            <h2 className={classes.subheading}>0. Create Your new NFT</h2>
                <div className="gradientBorder"></div>
            </div>
            
            <form className={classes.form}>

                <label className={classes.label}  for="name">Name for NFT</label>
                <input onChange={(e)=> actions.setNFTName(e.target.value)} value={name} className={classes.input} type="text" name="name" placeholder="example: MyCoolNFT"/>

                <label className={classes.label} for="symbol">Symbol for NFT</label>
                <input onChange={(e)=> actions.setNFTSymbol(e.target.value)} value={symbol} className={classes.input} type="text" name="symbol" placeholder="MYCT"/>

                <label  className={classes.label}  for="url">URL</label>
                <input onChange={(e)=> actions.setNFTUrl(e.target.value)} value={url} className={classes.input} type="text" name="url" placeholder="URL"/>

                <div className={classes.btnBar}>
                    <button onClick={handlePrevious} className={classes.btnLeft}  >Back</button>
                    <button onClick={handleNext} className={classes.btnRight}  >Mint</button>
                </div>
                
            </form>
        </div>
    )
}

export default withStyles(styles)(CreateNFT);