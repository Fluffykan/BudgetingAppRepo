import { Transaction } from "@/classes/Transaction";
import style from "@/styling/style";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import { SAVE_FILE_PATH } from "@/constants/SaveFileAddress";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { DateMethod } from "@/classes/DateMethod";
import Calendar from "@/components/myComponents/Calendar";

export default function MonthlySummaryPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [monthlyTransactionsMap, setMap] = useState<Map<string, Transaction[]>>(new Map());

    useFocusEffect(
        useCallback(() => {
            // methods to execute when tab is focused
            loadData();
            return () => {
                // methods to execute when tab is blurred
            };
        }, [])
    );

    useEffect(() => {
        loadMap();
    }, [transactions]);

    /**
     * Loads all transactions from the save file into a map, grouped by the month of the transaction
     */
    const loadData = async () => {
        const dataFileContents = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);
        setTransactions(Transaction.parseCsvSaveFile(dataFileContents));
    };

    // Creates a map with the keys as the month in the format MMyyyy and values as the array
    // of transactions occuring in the month
    const loadMap = () => {
        /* 
        This temporary map is used instead of declaring a map at the start of the function
        as there is some bug that causes the map to lose all its key value pairs for some
        unknown reason despite the useEffect being executed and updating the map.

        Fix this if you can haha 
        */
        const map: Map<string, Transaction[]> = new Map();

        // groups the transactions by month using the map
        transactions.forEach((transaction) => {
            const key: string = DateMethod.format_MMyyyy(transaction.getDate());
            if (!map.has(key)) {
                map.set(key, [transaction]);
            } else {
                // add the transaction to that month
                map.get(key)?.push(transaction);
            }
        });

        setMap(map);
    };

    // Calendar Params

    // the default date is set to today so that the calendar will display the current month
    const [date, setDate] = useState<Date>(new Date());

    return (
        <View style={style.pageContainer}>
            <Calendar date={date} transactionsMap={monthlyTransactionsMap} setDate={setDate} />
        </View>
    );
}
