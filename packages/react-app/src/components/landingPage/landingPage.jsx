import React from 'react';
import styles from "./landingPageStyles";
import {withStyles} from "@material-ui/core/styles";

function LandingPage(props) {
    const {classes, navigation} = props;
    const {go} = navigation;
    return (
        <div className={classes.root}>
            <div className={classes.heading}>Turn your NFT into an interest earning asset.</div>
            <p className={classes.subHeading}>Turn your collection into an Automatic Market Maker one piece at a time and gain funding upfront for your next idea BEFORE you make it!</p>
            <div className={classes.stepsContainer}>
                <div className={classes.stepBox}>
                    <span className={classes.text}>1.</span>
                    <p className={classes.text}>{"Place your NFT into the factory"}</p>
                    <span className="gradientBorder"></span>
                </div>
                <div className={classes.stepBox}>
                    <span className={classes.text}>2.</span>
                    <p className={classes.text}>{"Choose your Curve (Price structure)"}</p>
                    <span className="gradientBorder"></span>
                </div>
                <div className={classes.stepBox}>
                    <span className={classes.text}>3.</span>
                    <p className={classes.text}>{"Setup LPs to earn interest from"}</p>
                    <span className="gradientBorder"></span>
                </div>
                <div className={classes.stepBox}>
                    <span className={classes.text}>4.</span>
                    <p className={classes.text}>{"Sell $SHAREs to your shareholders"}</p>
                    <span className="gradientBorder"></span>
                </div>
                
            </div>
            <div className={classes.btnBar}>
                <button onClick={()=>go("createNFT")} className={classes.btnRight}>Don't have an NFT?</button>
            </div>
            
        </div>
    )
}

export default withStyles(styles)(LandingPage);