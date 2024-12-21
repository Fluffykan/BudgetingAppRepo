import { Dimensions, StyleSheet } from "react-native";

// constants
const MAX_COMPONENT_WIDTH_PERCENTAGE = 0.9;
const BG_COLOR = "white";
const BG_COLOR_DISABLED = "grey";
const BG_COLOR_POPUP = "#b5b5b5";

// calendar grid props
const CALENDAR_GRID_HEIGHT = Dimensions.get("screen").height * 0.1;
// width is abit wonky, might cause UI issues on other platforms
// not sure how to debug yet, leaving it as is for now
const CALENDAR_GRID_WIDTH = (Dimensions.get("window").width * MAX_COMPONENT_WIDTH_PERCENTAGE) / 7;
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
    flexRowContainer: {
        width: "100%",
        flexDirection: "row",
    },
    borderedContainer: {
        borderWidth: 1,
    },
    centeredText: {
        textAlign: "center",
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
    calendarContainer: {
        flex: 1,
    },
    calendarGridEnabled: {
        backgroundColor: BG_COLOR,
        borderWidth: 1,
        width: CALENDAR_GRID_WIDTH,
        height: CALENDAR_GRID_HEIGHT,
        padding: CALENDAR_GRID_PADDING,
    },
    calendarGridDisabled: {
        backgroundColor: BG_COLOR_DISABLED,
        borderWidth: 1,
        width: CALENDAR_GRID_WIDTH,
        height: CALENDAR_GRID_HEIGHT,
        padding: CALENDAR_GRID_PADDING,
    },
    calendarGridHeader: {
        backgroundColor: BG_COLOR,
        borderWidth: 1,
        width: CALENDAR_GRID_WIDTH,
        height: CALENDAR_GRID_HEIGHT,
        padding: CALENDAR_GRID_PADDING,
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
    },
    calendarPopup: {
        flex: 1,
        backgroundColor: BG_COLOR_POPUP,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
    },
});

export default style;
