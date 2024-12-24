import { Transaction } from "@/classes/Transaction";
import style, { DIMENSIONS } from "@/styling/style";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import { SAVE_FILE_PATH } from "@/constants/SaveFileAddress";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { DateMethod } from "@/classes/DateMethod";
import Calendar from "@/components/myComponents/Calendar";
import { PieChart } from "react-native-chart-kit";

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

    // Pie Chart Params
    const LEGEND_FONT_SIZE = 10;
    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: LEGEND_FONT_SIZE,
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: LEGEND_FONT_SIZE,
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: LEGEND_FONT_SIZE,
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: LEGEND_FONT_SIZE,
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: LEGEND_FONT_SIZE,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
    return (
        <View style={style.pageContainer}>
            <View style={{ flex: 1 }}>
                <Calendar date={date} transactionsMap={monthlyTransactionsMap} setDate={setDate} />
            </View>
            <View style={{ borderWidth: 1 }}>
                <PieChart
                    data={data}
                    width={DIMENSIONS.get("screen").width}
                    height={DIMENSIONS.get("screen").height * 0.3}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                />
            </View>
        </View>
    );
}
