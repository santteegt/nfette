import React, {useContext} from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Store} from "../../store/store";
import styles from "./reviewStyles";

 function Review(props) {
     const {classes, navigation} = props;
     const {state, actions} = useContext(Store);
     const { nftDetails, shareDetails, curveShape, riskProfile} = state;
     const {previous, next} = navigation;
     const handleNext = ()=> {
        actions.createMarket(state);
        next()
     }
    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
                <h2 className={classes.subheading}>4. Review and Create your market</h2>
                <div className="gradientBorder"></div>
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.leftBox}>
                    <div className={classes.leftItem}>Name:</div>
                    <div className={classes.leftItem}>Curve Address: </div>
                    <div className={classes.leftItem}>Max Supply: </div>
                    <div className={classes.leftItem}>Collateral Type: </div>
                    <div className={classes.leftItem}>Curve Type: </div>
                    <div className={classes.leftItem}>ERC20 Name: </div>
                    <div className={classes.leftItem}>ERC20 Symbol: </div>
                    <div className={classes.leftItem}>Interest: </div>
                    <div className={classes.leftItem}>Liquidity Pools: </div>
                </div>
                <div className={classes.rightBox}>
                    <div className={classes.rightItem}> {nftDetails.name} </div>
                    <div className={classes.rightItem}> {nftDetails.address} </div>
                    <div className={classes.rightItem}>100</div>
                    <div className={classes.rightItem}>USDC</div>
                    <div className={classes.rightItem}>{curveShape}</div>
                    <div className={classes.rightItem}>{shareDetails.name}</div>
                    <div className={classes.rightItem}>{shareDetails.name}</div>
                    <div className={classes.rightItem}>⎕ ⎕ ⎕ ⎕ </div>
                    <div className={classes.rightItem}>{riskProfile}</div>
                </div>
            </div>
            <div className={classes.btnBar}>
                <button onClick={()=> previous()}  className={`${classes.btnLeft} button`}>Back</button>
                <button onClick={handleNext}  className={`${classes.btnRight} button`}>Next</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(Review);