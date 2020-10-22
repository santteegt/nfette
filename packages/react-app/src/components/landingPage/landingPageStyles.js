import {createStyles} from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        color: "var(--main-black)",
        height: "calc(100vh - 70px)",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--main-white)",
        position: "absolute",
        top: "70px",
    },
    heading: {
        fontFamily: "var(--fancy-font)",
        fontSize: "10rem",
        color: "inherit",
        width: "70%",
        minWidth: "750px"
    },
    subHeading: {
        width: "70%",
        fontSize: "1.7rem",
        fontFamily: "var(--plain-font)"
    },
    stepsContainer: {
        marginTop: "50px",
        marginBottom: "50px",
        width: "50%",
        height: "150px",
        minWidth: "750px",
        display: "flex"
    },
    stepBox: {
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "flex-start",
        fontFamily: "var(--plain-font)",
        fontSize: "2rem",
        textAlign: "left",
        fontWeight: "500",
        margin: "auto"
    },
    btnBar: {
        width: "60%",
        display: "flex",
        margin: "0 auto"
    },
    btnLeft: {
        margin: "auto auto auto 50px",
        padding: "10px 20px",
        borderRadius: "5px",
        fontFamily: "var(--button-font)",
        backgroundColor: "var(--main-grey)"
    },
    btnRight : {
        margin: "auto",
        padding: "10px 20px",
        borderRadius: "5px",
        fontFamily: "var(--button-font)",
        backgroundColor: "var(--main-grey)"
    }
})

export default styles;