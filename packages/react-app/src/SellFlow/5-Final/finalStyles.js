import {createStyles} from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        color: "var(--main-black)",
        width: "900px",
        height: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        position: "absolute",
        top: "100px",
        left: "calc(50% - 450px)",
    },
    modalHeadingContainer: {
        height: "20%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    subheading: {
        fontSize: "3rem",
        textAlign: "left",
        fontWeight: "normal",
        margin: "10px auto auto 10px"
    },
    mainContainer: {
        height: "80%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "20px auto"
    },
    innerBox: {
        width: "80%",
        height: "100px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    address: {
        fontSize: "2.5rem",
        marginBottom: "10px"
    },
    divider: {
        width: "100%",
        height: "4px",
        backgroundColor: "black"
    },
    description: {
        fontSize: "1.3rem",
        marginTop: "10px"
    },
    btnBar: {
        width: "100%",
        display: "flex",
        marginTop: "20px"
    },
    middle: {
        margin: "auto auto 0 auto"
    }
})

export default styles;