import React, { useContext} from 'react';
import {Store} from "../../store/store";
import {withStyles} from "@material-ui/core/styles";
import {ReactComponent as AaveText} from "../../Media/aave1.svg";
import {ReactComponent as AaveGhost} from "../../Media/aave2.svg";
import styles from "./setupLPStyles";

 function SetupLP(props) {
     const {classes, navigation} = props;
     const {previous, next} = navigation;
     const {state, actions} = useContext(Store);
     const {nftDetails, curveShape, collateralType, shareDetails} = state;

    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
                <h2 className={classes.subheading}>3. Liquidity Pool Setup</h2>
                <div className="gradientBorder"></div>
            </div>
            <div className={classes.mainContainer}>
            <div className={classes.infoBox}>
                    <div className={classes.smallBox}>
                        <div>Name: {nftDetails.name}</div>
    <div>Contract Address: {nftDetails.address}</div>
                        <div>Max Supply: 100</div>
                        <div>Collateral Type: {collateralType} </div>
                    </div>
                    <div className={classes.smallBox}>
                        <div>Risk Profile: {curveShape} </div>
                        <div>ERC20 Name: {shareDetails.name}  </div>
                        <div>ERC20 symbol: {shareDetails.symbol}</div>
                    </div>
                </div>
                <div className={classes.liquidityPoolBoxContainer}>
                    <div className={classes.liquidityPoolBox}>
                        <h3 className={classes.riskScale}>Low Risk</h3>
                        <input className={classes.radio} name="curveOption" value="lowRisk" checked={state.riskProfile === "lowRisk"} onChange={(e)=> actions.setRiskProfile(e.target.value)} type="radio" label="Select" />
                        <div className={classes.percentage}>3.08%</div>
                        <div className={classes.iconBox}>
                            <AaveText className={classes.svg1} />
                            <AaveGhost className={classes.svg2} />
                        </div>
                        <p className={classes.description}>
                            (Ave interest rate) <br></br>
                            aUSDC Deposit APY
                        </p>
                    </div>
                    <div className={classes.liquidityPoolBox}>
                        <h3 className={classes.riskScale}>Medium Risk</h3>
                        <input className={classes.radio} name="curveOption" value="mediumRisk" checked={state.riskProfile === "mediumRisk"} onChange={(e)=> actions.setRiskProfile(e.target.value)} type="radio" label="Select" />
                        <div className={classes.percentage}>7.22%</div>
                        <div className={classes.iconBox}>
                            <AaveText className={classes.svg1} />
                            <AaveGhost className={classes.svg2} />
                        </div>
                        <p className={classes.description}>
                        (Ave interest rate) <br></br>
                            aUSDC Borrow APR Variable
                        </p>
                    </div>
                    
                </div>
            </div>
            <div className={classes.btnBar}>
                <button onClick={()=> previous()}  className={`${classes.btnLeft} button`}>Back</button>
                <button onClick={()=> next()}  className={`${classes.btnRight} button`}>Next</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(SetupLP);