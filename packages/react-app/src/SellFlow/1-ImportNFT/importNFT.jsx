import React, {useState, useContext} from 'react';
import {Store} from "../../store/store";
import styles from "./importNFTStyles";
import {withStyles} from "@material-ui/core/styles";

const initialState = {
    address: "",
    name: "",
    minted: "",
    url: "",
}


function ImportNFT(props) {
    const {state, actions} = useContext(Store);
    const [input, setInput] = useState(initialState);
    const {classes, navigation} = props;
    const {next, go} = navigation;

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handlePrevious= (e)=> {
        e.preventDefault();
        actions.clearImportedNFTDetails();
        setInput(initialState);
        go("landingPage");
    }
    const handleNext = (e) => {
        e.preventDefault();
        actions.setImportedNFTDetails(input);
        setInput(initialState);
        next();
    }
    
    const {address, name, minted, url} = input;

    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
            <h2 className={classes.subheading}>1. Place your NFT into the factory</h2>
                <div className="gradientBorder"></div>
            </div>
            
            <form className={classes.form}>

                <label className={classes.label}  for="address">NFT Contract Address</label>
                <input onChange={handleChange} value={address} className={classes.input} type="text" name="address" placeholder="example: 0xC54070dA79E7E3e2c95D3a91fe98A42000e65a48"/>

                <label className={classes.label} for="name">Name of your ERC721 Token</label>
                <input onChange={handleChange} value={name} className={classes.input} type="text" name="name" placeholder="example: My Cool NFT"/>

                <label  className={classes.label}  for="minted">Total Minted</label>
                <input onChange={handleChange} value={minted} className={classes.input} type="text" name="minted" placeholder="example: 0000"/>

                <label  className={classes.label}  for="url">URL</label>
                <input onChange={handleChange} value={url} className={classes.input} type="text" name="url" placeholder="example: URL"/>

                <div className={classes.btnBar}>
                    <button onClick={handlePrevious} className={classes.btnLeft}  >Back</button>
                    <button onClick={handleNext} className={classes.btnRight}  >Mint</button>
                </div>
            </form>
        </div>
    )
}

export default withStyles(styles)(ImportNFT);