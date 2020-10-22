import React from 'react';
import styles from "./navbarStyles";
import {withStyles} from "@material-ui/core/styles";

function Navbar(props) {
    const {classes} = props;
    return (
        <nav className={classes.root}>
            <div className={classes.headingContainer}>
                <span className={classes.heading}>NF</span>
                <span className={classes.headingSmall}>ette</span>
            </div>
            <button className={classes.button}>Connect</button>
            <div className="gradientBorder"></div>
        </nav>
    )
}

export default withStyles(styles)(Navbar);