import {createStyles} from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        color: "var(--main-black)",
        height: "calc(100vh - 70px)",
        width: "900px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--main-white)",
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
        width: "80%",
        height: "100%",
        fontSize: "1.2rem",
        padding: '5px'
    },
    formControl: {
        width: "80%",
        height: "50%",
    },
    label: {
        margin: "10px 0px 10px 2px",
        fontSize: "1.8rem",
        textAlign: "left"
    },
    inputContainer: {
        marginTop: "50px",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "left",
        flexDirection: "column",
    },
    input: {
        border: "2px solid var(--main-black)",
        width: "500px",
        "&:focus": {
            border: "2px solid orange"
        },
        "&::placeholder": {
            color: "var(--main-grey)"
        }
    },
    select: {
        margin: "20px auto 20px 0",
        width: "30%",
        padding: "10px",
        borderRadius: "5px",
        
    },
    btnBar: {
        width: "60%",
        display: "flex",
        margin: "100px auto 0 50px"
    },
    btnLeft: {
        margin: "auto auto auto 50px",
        padding: "10px 20px",
        borderRadius: "5px",
        fontFamily: "var(--button-font)",
        backgroundColor: "var(--main-grey)"
    },
    btnRight : {
        margin: "auto 50px auto auto",
        padding: "10px 20px",
        borderRadius: "5px",
        fontFamily: "var(--button-font)",
        backgroundColor: "var(--main-grey)"
    }
})

export default styles;