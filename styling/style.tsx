import { Dimensions, StyleSheet } from "react-native";


const style = StyleSheet.create({
    pageContainer: {
        paddingTop: 40,
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
    borderedContainer: {
        borderWidth: 1
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
    calendarGridEnabled: {
        backgroundColor: 'white',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.9 / 7,
        height: Dimensions.get('screen').height * 0.05,
    },
    calendarGridDisabled: {
        backgroundColor: 'grey',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.9 / 7,
        height: Dimensions.get('screen').height * 0.05,
    }, 
    calendarGridHeader: {
        backgroundColor: 'white',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.9 / 7,
        height: Dimensions.get('screen').height * 0.05,
    }, 
    calendarMonthNavBar: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});

export default style;
