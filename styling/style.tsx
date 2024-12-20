import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    pageContainer: {
        padding: 20,
        alignContent: "center",
        flex: 1,
        backgroundColor: "white",
    },
    modalContainer: {
        flex: 1,
        margin: 20,
        borderRadius: 14,
        backgroundColor: '#b3b3b3',
    },
    modalContentContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    hiddenElement: {
        height: 0,
        width: 0,
    },
    alignCenterContainer: {
        justifyContent: "center",
        alignContent: "center",
    },
    flexRowContainer: {
        flexDirection: "row",
    },
    centeredText: {
        textAlign: "center",
    },
    transactionDisplayComponent: {
        borderWidth: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
    },
    dropdownSelector: {
        borderWidth: 1,
    },
});

export default style;
