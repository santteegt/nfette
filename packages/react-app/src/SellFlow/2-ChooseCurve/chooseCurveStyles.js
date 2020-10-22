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
        flexDirection: "column",
    },

    infoBox: {
        width: "100%",
        height: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    smallBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        height: "100%",
        fontSize: "1.2rem",
        padding: '5px'
    },
    graphBoxContainer: {
        display: "flex",
        height: "80%",
        width: "100%",
    },
    graphBox: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "30%",
        margin: "auto",
        justifyContent: "flex-start",
        alignItems: "start"
    },
    graphType: {
        fontSize: "2rem",
        marginLeft: "16px"
    },
    radio: {
        width: '20px',
        cursor: "pointer",
        margin: "20px auto 20px 20px",
        transform: "scale(2)",
        color: "var(--main-orange)",
    },
    svg: {
        margin: "20px auto"
    },
    description: {
        fontSize: "1.4rem",
        width: "80%",
        margin: "10px auto auto auto"
    },
    btnBar: {
        width: "100%",
        display: "flex"
    },
    btnLeft: {
        margin: "auto auto auto 50px"
    },
    btnRight : {
        margin: "auto 50px auto auto"
    }
})

export default styles;