import React, {useState, useContext} from 'react';
import {Store} from "../../store/store";
import {withStyles} from "@material-ui/core/styles";
import {ReactComponent as Concave} from "../../Media/Concave_Graph.svg";
import {ReactComponent as Convex} from "../../Media/Convex_Graph.svg";
import {ReactComponent as Linear} from "../../Media/Linear_Graph.svg";
import styles from "./chooseCurveStyles";

 function ChooseCurve(props) {
     const {classes, navigation} = props;
     const {previous, next} = navigation;
     const {state, actions} = useContext(Store);
     const {nftDetails} = state;
     const [option, setOption] = useState("");

     const handleOptionChange = (e)=> {
        setOption(e.target.value);
     }
     const handlePrevious = ()=> {
        actions.clearCurve();
        previous();
    }
     const handleNext = ()=> {
         actions.setCurve(option);
         next();
     }
    return (
        <div className={classes.root}>
            <div className={classes.modalHeadingContainer}>
                <h2 className={classes.subheading}>2. Choose your curve (Pricing Structure)</h2>
                <div className="gradientBorder"></div>
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.infoBox}>
                    <div className={classes.smallBox}>
                        <div>Name: {nftDetails.name}</div>
                        <div>Contract Address: {nftDetails.address}</div>
                    </div>
                    <div className={classes.smallBox}>
                        <div>MaxSupply: 100</div>
                        <div>Collateral Type: USDC</div>
                    </div>
                </div>
                <div className={classes.graphBoxContainer}>
                    <div className={classes.graphBox}>
                        <h3 className={classes.graphType}>Aggressive</h3>
                        <input className={classes.radio} name="curveOption" value="aggressive" checked={option === "aggressive"} onChange={handleOptionChange} type="radio" label="Select" />
                        <Concave className={classes.svg} />
                        <p className={classes.description}>
                            Steep curve with high prices, early flattening out over supply
                        </p>
                    </div>
                    <div className={classes.graphBox}>
                        <h3 className={classes.graphType}>Slow and Steady</h3>
                        <input className={classes.radio} name="curveOption" value="slowAndSteady" checked={option === "slowAndSteady"} onChange={handleOptionChange} type="radio" label="Select" />
                        <Convex className={classes.svg} />
                        <p className={classes.description}>
                            Steady low curve with exponential growth in supply
                        </p>
                    </div>
                    <div className={classes.graphBox}>
                        <h3 className={classes.graphType}>Conventional</h3>
                        <input className={classes.radio} name="curveOption" value="conventional" checked={option === "conventional"} onChange={handleOptionChange} type="radio" label="Select" />
                        <Linear className={classes.svg} />
                        <p className={classes.description}>
                            Linear predictable growth direct relationship in supply
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.btnBar}>
                <button onClick={handlePrevious} className={`${classes.btnLeft} button`}>Back</button>
                <button onClick={handleNext}  className={`${classes.btnRight} button`}>Next</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(ChooseCurve);