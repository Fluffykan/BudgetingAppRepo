import { Dimensions, StyleSheet } from "react-native";

// constants
export const DIMENSIONS = Dimensions;
const BG_COLOR = "white";
const BG_COLOR_DISABLED = "grey";
const BG_COLOR_POPUP = "#b5b5b5";

// calendar grid props
const CALENDAR_GRID_WIDTH = "14.28%"; // ~ 100 / 7
const CALENDAR_GRID_PADDING = 2;

const style = StyleSheet.create({
    pageContainer: {
        paddingTop: 40,
        padding: 20,
        alignContent: "center",
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    modalContainer: {
        flex: 1,
        margin: 20,
        borderRadius: 14,
        backgroundColor: "#b3b3b3",
    },
    modalContentContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    hiddenElement: {
        height: 0,
        width: 0,
    },
    alignCenterContainer: {
        justifyContent: "center",
        alignContent: "center",
    },
    flexContainer: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: "row",
    },
    rowContainerSpaceBtwn: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    flexRowContainer: {
        flexDirection: "row",
        flex: 1,
    },
    paddedFlexContainer: {
        flex: 1,
        padding: 20,
    },
    vertPadddedFlexContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    horiPaddedFlexContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    borderedContainer: {
        borderWidth: 1,
    },
    centeredText: {
        textAlign: "center",
    },
    h1: {
        fontSize: 40,
        paddingVertical: 20,
    },
    h2: {
        fontSize: 30,
        paddingVertical: 15,
    },
    h3: {
        fontSize: 20,
        paddingVertical: 10,
    },
    h4: {
        fontSize: 15,
        paddingVertical: 5,
    },
    h1c: {
        fontSize: 40,
        paddingVertical: 20,
        textAlign: "center",
    },
    h2c: {
        fontSize: 30,
        paddingVertical: 15,
        textAlign: "center",
    },
    h3c: {
        fontSize: 20,
        paddingVertical: 10,
        textAlign: "center",
    },
    h4c: {
        fontSize: 15,
        paddingVertical: 5,
        textAlign: "center",
    },
    h1b: {
        fontSize: 40,
        fontWeight: "bold",
        color: "red",
        paddingVertical: 20,
    },
    h2b: {
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
        paddingVertical: 15,
    },
    h3b: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
        paddingVertical: 10,
    },
    h4b: {
        fontSize: 15,
        fontWeight: "bold",
        color: "red",
        paddingVertical: 5,
    },
    t1: {
        fontSize: 40,
    },
    t2: {
        fontSize: 30,
    },
    t3: {
        fontSize: 20,
    },
    t4: {
        fontSize: 15,
    },
    textInput: {
        flex: 1,
    },
    transactionDisplayComponent: {
        borderWidth: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: BG_COLOR,
    },
    transactionDisplayComponentPopup: {
        borderWidth: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: BG_COLOR_POPUP,
    },
    dropdownSelector: {
        borderWidth: 1,
    },
    calendarGridEnabled: {
        backgroundColor: BG_COLOR,
        borderWidth: 1,
        width: CALENDAR_GRID_WIDTH,
        padding: CALENDAR_GRID_PADDING,
        flex: 1,
    },
    calendarGridDisabled: {
        backgroundColor: BG_COLOR_DISABLED,
        borderWidth: 1,
        width: CALENDAR_GRID_WIDTH,
        padding: CALENDAR_GRID_PADDING,
        flex: 1,
    },
    calendarGridHeader: {
        backgroundColor: BG_COLOR,
        width: CALENDAR_GRID_WIDTH,
        padding: CALENDAR_GRID_PADDING,
        flex: 1,
    },
    calendarGridAmountContainer: {
        justifyContent: "center",
        flex: 1,
        flexShrink: 1,
        flexGrow: 1,
        flexWrap: "nowrap",
    },
    calendarGridAmount: {
        fontSize: 10,
        textAlign: "center",
        color: "red",
    },
    calendarMonthNavBar: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    popup: {
        flex: 1,
        backgroundColor: BG_COLOR_POPUP,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    topPaddedPopup: {
        flex: 1,
        backgroundColor: BG_COLOR_POPUP,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
    },
});

export default style;
