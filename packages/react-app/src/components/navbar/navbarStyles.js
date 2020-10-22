import {createStyles} from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        color: "white",
        height: "70px",
        width: "100%",
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--main-white)",
        margin: "0 auto auto auto",
        position: "absolute",
        overflow: "hidden",
        top: "0"
    },
    headingContainer: {
        width: "150px",
        height: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    nfetteLogo: {
        width: "100%",
        margin: "auto"
    },
    heading: {
        color: "var(--main-white)",
        textTransform: "capitalize",
        fontSize: "4.5rem",
        fontFamily: "var(--plain-font)",
        margin: "auto 1px auto auto",
        fontWeight: "600"
    },
    headingSmall: {
        color: "var(--main-white)",
        fontSize: "3.8rem",
        fontFamily: "var(--fancy-font)",
        margin: "auto auto auto 1px"
    },
    button: {
        margin: "auto 10px auto auto",
        height: "25px",
        width: "75px",
        fontFamily: "var(--plain-font)",
        position: "absolute",
        top: "calc(50% - 12.5px)",
        right: "25px",
        borderRadius: "5px",
        backgroundColor: "var(--main-grey)",
        fontFamily: "var(--button-font)"
    },
})

export default styles;