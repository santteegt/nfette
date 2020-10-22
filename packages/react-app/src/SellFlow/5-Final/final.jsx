import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "./finalStyles";

 function Final(props) {
     const {classes} = props;
    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
                <h2 className={classes.subheading}>Well done! Here is your new contract address</h2>
                <div className="gradientBorder"></div>
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.innerBox}>
                    <p className={classes.address}>0xC54070dA79E7E3e2c95D3a91fe98A42000e65a48</p>
                    <div className={classes.divider}></div>
                    <p className={classes.description}>See moreinfo here about how to use your contract</p>
                </div>
            </div>
            <div className={classes.btnBar}>
                <button className={`${classes.middle} button`}>Copy</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(Final);