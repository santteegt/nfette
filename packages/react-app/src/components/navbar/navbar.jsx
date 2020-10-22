import React, { useState, useContext } from 'react';
import {Store} from "../../store/store";
import {ReactComponent as Logo} from "../../Media/logo.svg";
import { ethers } from 'ethers';
import styles from "./navbarStyles";
import {withStyles} from "@material-ui/core/styles";

function Navbar(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const {state, actions} = useContext(Store);
    const {classes} = props;

    const logout = async () => {
        await props.web3modal.clearCachedProvider();
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    const connect = async () => {
        // const w3mProvider = await props.web3modal.connect();
        // for only Portis:
        const w3mProvider = await props.web3modal.connectTo("portis");
        const provider = new ethers.providers.Web3Provider(w3mProvider);
        actions.setProvider(provider);
        setLoggedIn(true);
    }

    console.log("YO IT'S THE CACHED PROVIDER ", props.web3modal.cachedProvider)

    return (
        <nav className={classes.root}>
            <div className={classes.headingContainer}>
                <Logo className={classes.nfetteLogo} />
            </div>           
            {props.web3modal.cachedProvider || loggedIn === true != "" ? 
                <button className={classes.button} onClick={logout}>Logout</button> :
                <button className={classes.button} onClick={connect}>Connect</button>
            }
            <div className="gradientBorder"></div>
        </nav>
    )
}

export default withStyles(styles)(Navbar);