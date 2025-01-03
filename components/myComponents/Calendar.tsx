import { DateMethod } from "@/classes/DateMethod";
import { Transaction } from "@/classes/Transaction";
import style from "@/styling/style";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButton";
import { useEffect, useState } from "react";
import TransactionDisplay from "./TransactionDisplay";

type CalendarProps = {
    date: Date; // any date within the month
    setDate: (date: Date) => void; // useState setter method to set the date
    transactionsMap: Map<string, Transaction[]>; // the list of transactions in the month
};

/**
 * Creates the UI of a calendar
 *
 * @param date any date within the month
 * @param transactions an array of transactions that occured within the month
 * @returns a 5x7 grid composed of {@code CalendarGridEnabled} or {@code CalendarGridDisabled}
 * representing a month on the calendar
 */
export default function Calendar({ date, transactionsMap, setDate }: CalendarProps) {
    // Initialize the calendar

    // calculate which day the first day of the month falls on
    // sun = 0, mon = 1, ..., sat = 6
    const dayOne: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const numDays: number = DateMethod.getDaysInMonth(date);

    // initialise an array representing all grids in the calendar
    const arrCalendar: number[][] = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];
    // set the position of the first day of the month
    arrCalendar[0][dayOne] = 1;

    let startAdding: boolean = false;
    let next: number = 2;

    // assign the dates to all days on the calendar
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (!startAdding && arrCalendar[i][j] != 0) {
                startAdding = true;
                continue;
            }
            if (startAdding && next <= numDays) {
                arrCalendar[i][j] = next;
                next++;
            }
        }
    }

    // calculate the total value of all transactions on each day of the month
    const arrAmount: number[] = [];

    // create one variable to keep track of total value of transactions in each day
    for (let i = 0; i < 31; i++) {
        arrAmount.push(0);
    }

    // calculate the total transaction value on each day of the month
    transactionsMap.get(DateMethod.format_MMyyyy(date))?.forEach((transaction) => {
        // add the amount of the transaction to the variable keeping track of transactions
        // on that day
        arrAmount[transaction.getDate().getDate() - 1] += transaction.getAmount();
    });

    // declare variable to store the value of the selected date
    const [selectedDate, setSelectedDate] = useState(0);
    // declare variable to store the array of transactions on the selected date
    const [transactionsOnDate, setTransactionsOnDate] = useState<Transaction[]>([]);

    // useEffect to update the array of transactions whenever user selects a new date
    useEffect(() => {
        const transactionArr: Transaction[] | undefined = transactionsMap
            .get(DateMethod.format_MMyyyy(date))
            ?.filter((transaction) => transaction.getDate().getDate() == selectedDate);
        transactionArr ? setTransactionsOnDate(transactionArr) : setTransactionsOnDate([]);
    }, [selectedDate]);

    // function to handle opening the modal when a date is selected
    function handleOpenModal(datePressed: number) {
        setSelectedDate(datePressed);
        setVisible(true);
    }

    // Modal props

    // used to store modal's visibility
    const [isVisible, setVisible] = useState(false);

    return (
        <View style={style.flexContainer}>
            <CalendarMonthNavBar date={date} setDate={setDate} />
            <CalendarGridRowHeader />
            <View style={style.flexContainer}>
                {arrCalendar.map((week) => (
                    <CalendarGridRow dates={week} transactionValues={arrAmount} handleOpenModal={handleOpenModal} />
                ))}
            </View>

            <Modal visible={isVisible} style={{ backgroundColor: "grey" }} animationType="slide" transparent={true}>
                <TouchableOpacity onPress={() => setVisible(false)} style={{ flex: 1 }}></TouchableOpacity>
                <View style={style.calendarPopup}>
                    <PopupDateNavBar dateInMonth={date} setDate={setSelectedDate} date={selectedDate} />
                    <TransactionDisplay
                        styling="popup"
                        transactions={transactionsOnDate}
                        setTransactions={(t: Transaction[]) => {}}
                    />
                </View>
            </Modal>
        </View>
    );
}

type PopupDateNavBarProps = {
    date: number;
    setDate: (newDate: number) => void;
    dateInMonth: Date;
};

function PopupDateNavBar({ date, setDate, dateInMonth }: PopupDateNavBarProps) {
    function handleNextDay() {
        if (date < DateMethod.getDaysInMonth(dateInMonth)) {
            setDate(date + 1);
        }
    }

    function handlePrevDay() {
        if (date > 1) {
            setDate(date - 1);
        }
    }

    return (
        <View style={style.calendarMonthNavBar}>
            <IconButton name="angle-left" onPress={handlePrevDay} />
            <Text>{date + " " + DateMethod.format_Myyyy(dateInMonth)}</Text>
            <IconButton name="angle-right" onPress={handleNextDay} />
        </View>
    );
}

type CalendarMonthNavBarProps = {
    date: Date;
    setDate: (date: Date) => void;
};

function CalendarMonthNavBar({ date, setDate }: CalendarMonthNavBarProps) {
    function handlePrevMonth() {
        let prevMonth: number = date.getMonth() - 1;
        let year: number = date.getFullYear();
        if (prevMonth < 0) {
            prevMonth = 11;
            year--;
        }
        setDate(new Date(year, prevMonth, 1));
    }

    function handleNextMonth() {
        let prevMonth: number = date.getMonth() + 1;
        let year: number = date.getFullYear();
        if (prevMonth > 11) {
            prevMonth = 0;
            year++;
        }
        setDate(new Date(year, prevMonth, 1));
    }

    return (
        <View style={style.calendarMonthNavBar}>
            <IconButton name="angle-left" onPress={handlePrevMonth} />
            <Text>{DateMethod.format_Myyyy(date)}</Text>
            <IconButton name="angle-right" onPress={handleNextMonth} />
        </View>
    );
}

/**
 * Creates the UI for the header of the calendar with the name of the days
 *
 * @returns a row of 7 views each containing a name of a day
 */
function CalendarGridRowHeader() {
    return (
        <View style={style.rowContainer}>
            {DateMethod.getDaysInWeek_Short().map((day) => (
                <View style={style.calendarGridHeader}>
                    <Text style={style.centeredText}>{day}</Text>
                </View>
            ))}
        </View>
    );
}

type CalendarGridRowProps = {
    dates: number[];
    transactionValues: number[];
    handleOpenModal: (selectedDate: number) => void;
};

/**
 * Creates the UI of a week on the calendar
 *
 * @param dates an array containing the dates for the days of the particular week
 * @returns a row of 7 {@code CalendarGrid} representing a week with their corresponding dates.
 */
function CalendarGridRow({ dates, transactionValues, handleOpenModal }: CalendarGridRowProps) {
    return (
        <View style={style.flexRowContainer}>
            {dates.map((date) => {
                if (date == 0) {
                    return <CalendarGridDisabled />;
                } else {
                    return (
                        <CalendarGridEnabled
                            key={date}
                            date={date}
                            transactionAmt={transactionValues[date - 1]}
                            handleOpenModal={handleOpenModal}
                        />
                    );
                }
            })}
        </View>
    );
}

type CalendarGridEnabledProps = {
    date: number;
    transactionAmt: number;
    handleOpenModal: (selectedDate: number) => void;
};

/**
 * Creates the UI for an individual grid on the calendar that is a valid date of the month
 *
 * @param date the date the grid represents
 * @param transactionAmt the total value of transactions on the day
 * @param setSelected the function to set the selected date on the calendar
 * @returns a view containing the date and transaction amount (if applicable)
 */
function CalendarGridEnabled({ date, transactionAmt, handleOpenModal }: CalendarGridEnabledProps) {
    return (
        <TouchableOpacity onPress={() => handleOpenModal(date)} style={style.calendarGridEnabled}>
            {date ? <Text>{date}</Text> : <Text />}
            <View style={style.calendarGridAmountContainer}>
                {transactionAmt ? <Text style={style.calendarGridAmount}>${transactionAmt.toFixed(2)}</Text> : <Text />}
            </View>
        </TouchableOpacity>
    );
}

/**
 * Creates the UI for an individual grid on the calendar that is not a valid date of the month
 *
 * @returns a greyed out View component
 */
function CalendarGridDisabled() {
    return <View style={style.calendarGridDisabled} />;
}
