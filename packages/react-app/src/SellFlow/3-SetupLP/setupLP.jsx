import React, {useState, useContext} from 'react';
import {Store} from "../../store/store";
import {withStyles} from "@material-ui/core/styles";
import {ReactComponent as AaveText} from "../../Media/aave1.svg";
import {ReactComponent as AaveGhost} from "../../Media/aave2.svg";
import styles from "./setupLPStyles";

 function SetupLP(props) {
     const {classes, navigation} = props;
     const {previous, next} = navigation;
     const {state, actions} = useContext(Store);
     const {nftDetails, curveShape} = state;
     const [option, setOption] = useState("");

     const handleOptionChange = (e)=> {
        setOption(e.target.value);
     }
     const handlePrevious = ()=> {
        actions.clearRiskProfile();
        previous();
    }
     const handleNext = ()=> {
         actions.setRiskProfile(option);
         next();
     }
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
                        <div>Collateral Type: USDC </div>
                    </div>
                    <div className={classes.smallBox}>
                        <div>Risk Profile: {curveShape} </div>
                        <div>ERC20 Name: {nftDetails.name}  </div>
                        <div>ERC20 symbol: </div>
                    </div>
                </div>
                <div className={classes.liquidityPoolBoxContainer}>
                    <div className={classes.liquidityPoolBox}>
                        <h3 className={classes.riskScale}>Low Risk</h3>
                        <input className={classes.radio} name="curveOption" value="lowRisk" checked={option === "lowRisk"} onChange={handleOptionChange} type="radio" label="Select" />
                        <div className={classes.percentage}>00%</div>
                        <div className={classes.iconBox}>
                            <AaveText className={classes.svg1} />
                            <AaveGhost className={classes.svg2} />
                        </div>
                        <p className={classes.description}>
                            Short explanation her about the pool
                        </p>
                    </div>
                    <div className={classes.liquidityPoolBox}>
                        <h3 className={classes.riskScale}>Medium Risk</h3>
                        <input className={classes.radio} name="curveOption" value="mediumRisk" checked={option === "mediumRisk"} onChange={handleOptionChange} type="radio" label="Select" />
                        <div className={classes.percentage}>00%</div>
                        <div className={classes.iconBox}>
                            <AaveText className={classes.svg1} />
                            <AaveGhost className={classes.svg2} />
                        </div>
                        <p className={classes.description}>
                        Short explanation her about the pool
                        </p>
                    </div>
                    <div className={classes.liquidityPoolBox}>
                        <h3 className={classes.riskScale}>High Risk</h3>
                        <input className={classes.radio} name="curveOption" value="highRisk" checked={option === "highRisk"} onChange={handleOptionChange} type="radio" label="Select" />
                        <div className={classes.percentage}>00%</div>
                        <div className={classes.iconBox}>
                            <AaveText className={classes.svg1} />
                            <AaveGhost className={classes.svg2} />
                        </div>
                        <p className={classes.description}>
                        Short explanation her about the pool
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.btnBar}>
                <button onClick={handlePrevious}  className={`${classes.btnLeft} button`}>Back</button>
                <button onClick={handleNext}  className={`${classes.btnRight} button`}>Next</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(SetupLP);