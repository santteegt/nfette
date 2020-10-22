import {createStyles} from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        color: "var(--main-black)",
        width: "900px",
        height: "600px",
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
    leftBox: {
        height: "100%",
        width: "50%",
        borderRight: "2px black solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "300"
    },
    rightBox: {
        height: "100%",
        width: "50%",
        borderLeft: "2px black solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "600"
    },
    leftItem: {
        margin: "auto 15px auto auto"
    },
    rightItem: {
        margin: "auto auto auto 15px "
    },
    btnBar: {
        width: "100%",
        display: "flex",
        marginTop: "20px"
    },
    btnLeft: {
        margin: "auto auto auto 50px"
    },
    btnRight : {
        margin: "auto 50px auto auto"
    }
})

export default styles;