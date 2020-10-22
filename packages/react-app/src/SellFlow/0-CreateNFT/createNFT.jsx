import React, {useState, useContext} from 'react';
import {Store} from "../../store/store";
import styles from "./createNFTStyles";
import {withStyles} from "@material-ui/core/styles";

const initialState = {
    name: "",
    symbol: "",
    url: ""
}


function CreateNFT(props) {
    const {state, actions} = useContext(Store);
    const [input, setInput] = useState(initialState);
    const {classes, navigation} = props;
    const {next, go} = navigation;

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handlePrevious = (e)=> {
        e.preventDefault();
        setInput(initialState);
        go("landingPage");
    }

    const handleNext = (e) => {
        e.preventDefault();
        actions.setNewNFTDetails(input)
        setInput(initialState);
        next();
    }
    
    const {name, symbol, url} = input;

    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
            <h2 className={classes.subheading}>0. Create Your new NFT</h2>
                <div className="gradientBorder"></div>
            </div>
            
            <form className={classes.form}>

                <label className={classes.label}  for="name">Name for NFT</label>
                <input onChange={handleChange} value={name} className={classes.input} type="text" name="name" placeholder="example: MyCoolNFT"/>

                <label className={classes.label} for="symbol">Symbol for NFT</label>
                <input onChange={handleChange} value={symbol} className={classes.input} type="text" name="symbol" placeholder="MYCT"/>

                <label  className={classes.label}  for="url">URL</label>
                <input onChange={handleChange} value={url} className={classes.input} type="text" name="url" placeholder="URL"/>

                <div className={classes.btnBar}>
                    <button onClick={handlePrevious} className={classes.btnLeft}  >Back</button>
                    <button onClick={handleNext} className={classes.btnRight}  >Mint</button>
                </div>
                
            </form>
        </div>
    )
}

export default withStyles(styles)(CreateNFT);