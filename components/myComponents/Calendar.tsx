import { DateMethod } from "@/classes/DateMethod";
import { Transaction } from "@/classes/Transaction";
import style from "@/styling/style";
import { Text, View } from "react-native";
import IconButton from "./IconButton";

type CalendarProps = {
    date: Date; // any date within the month
    setDate: (date:Date) => void; // useState setter method to set the date 
    transactions: Transaction[]; // the list of transactions in the month
};

/**
 * Creates the UI of a calendar
 * 
 * @param date any date within the month
 * @param transactions an array of transactions that occured within the month
 * @returns a 5x7 grid of {@code CalendarGrid} representing a month on the calendar 
 */
export default function Calendar({ date, transactions, setDate }: CalendarProps) {
    // calculate which day the first day of the month falls on
    // sun = 0, mon = 1, ..., sat = 6
    
    const dayOne: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const numDays: number = DateMethod.getDaysInMonth(date);

    const arrCalendar: number[][] = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];
    arrCalendar[0][dayOne] = 1;

    let startAdding: boolean = false;
    let next: number = 2;

    // assign the dates to each day on the calendar
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (!startAdding && arrCalendar[i][j] != 0) {
                startAdding = true;
                continue;
            }
            if (startAdding && next < numDays) {
                arrCalendar[i][j] = next;
                next++;
            }
        }
    }
    
    return (
        <View>
            <CalendarMonthNavBar date={date} setDate={setDate} />
            <CalendarGridRowHeader />
            {arrCalendar.map((week) => (
                <CalendarGridRow dates={week} />
            ))}
        </View>
    );
}

type CalendarMonthNavBarProps = {
    date:Date;
    setDate:(date:Date) => void;
}

function CalendarMonthNavBar({date, setDate}: CalendarMonthNavBarProps) {
    function handlePrevMonth() {
        let prevMonth:number = date.getMonth() - 1;
        let year:number = date.getFullYear();
        if (prevMonth < 0) {
            prevMonth = 11;
            year--;
        }
        setDate(new Date(year, prevMonth, 1));
    }

    function handleNextMonth() {
        let prevMonth:number = date.getMonth() + 1;
        let year:number = date.getFullYear();
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
    )
}

function CalendarGridRowHeader() {
    return (
        <View style={style.flexRowContainer}>
            {DateMethod.getDaysInWeek_Short().map(day => 
                <View style={style.calendarGridHeader}>
                    <Text style={style.centeredText}>{day}</Text>
                </View>)}
        </View>

    )
}

type CalendarGridRowProps = {
    dates: number[];
};

/**
 * Creates the UI of a week on the calendar
 * 
 * @param dates an array containing the dates for the days of the particular week
 * @returns a row of 7 {@code CalendarGrid} representing a week with their corresponding dates.
 */
function CalendarGridRow({ dates }: CalendarGridRowProps) {
    return (
        <View style={style.flexRowContainer}>
            {dates.map((date) => {
                if (date == 0) {
                    return <CalendarGrid isEnabled={false} />;
                } else {
                    return <CalendarGrid key={date} isEnabled={true} date={date} />;
                }
            })}
        </View>
    );
}

type CalendarGridProps = {
    isEnabled: boolean;
    date?: number;
};
function CalendarGrid({ isEnabled, date }: CalendarGridProps) {
    return (
        <View style={isEnabled ? style.calendarGridEnabled : style.calendarGridDisabled}>
            {date ? <Text>{date}</Text> : <Text />}
        </View>
    );
}
