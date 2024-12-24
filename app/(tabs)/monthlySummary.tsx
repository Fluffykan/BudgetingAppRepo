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
import { TransactionType } from "@/classes/TransactionType";
import DropdownTrayHeader from "@/components/myComponents/DropdownTrayHeader";

export default function MonthlySummaryPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [monthlyTransactionsMap, setMap] = useState<Map<string, Transaction[]>>(new Map());
    type PieChartData = {
        name: string;
        population: number;
        color: string;
    };
    const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

    useFocusEffect(
        useCallback(() => {
            // methods to execute when tab is focused
            loadData();
            loadPieChart();
            return () => {
                // methods to execute when tab is blurred
                setIsPieChartVisible(false);
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

        // update the pie chart whenever a new transaction is created or removed
        loadPieChart();
    };

    // Calendar Params

    // the default date is set to today so that the calendar will display the current month
    const [date, setDate] = useState<Date>(new Date());

    // Pie Chart Params

    const [isPieChartVisible, setIsPieChartVisible] = useState(false);

    // update the pie chart whenever the date (which determines which month the calendar is displaying)
    // is changed
    useEffect(() => {
        loadPieChart();
    }, [date]);

    const loadPieChart = () => {
        const currMonthTransactions: Transaction[] = monthlyTransactionsMap.get(DateMethod.format_MMyyyy(date)) ?? [];

        // code to generate a random color
        // source: https://www.npmjs.com/package/react-native-svg-charts
        const randomColor = () => ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(0, 7);

        // calculate the total amount spent on each type of transaction
        const data: PieChartData[] = TransactionType.getTypes().map((type) => {
            const totalAmt: number = currMonthTransactions
                .filter((transaction) => transaction.getType() == type)
                .map((transaction) => transaction.getAmount())
                .reduce((sum, next) => sum + next, 0);
            return {
                name: type,
                population: totalAmt,
                color: randomColor(),
            };
        });

        setPieChartData(data);
    };

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
            <View style={style.flexContainer}>
                <Calendar date={date} transactionsMap={monthlyTransactionsMap} setDate={setDate} />
            </View>

            <DropdownTrayHeader
                title="View Spending Breakdown By Category"
                isOpen={isPieChartVisible}
                setIsOpen={setIsPieChartVisible}
            />
            {isPieChartVisible && (
                <View>
                    <PieChart
                        data={pieChartData}
                        width={DIMENSIONS.get("screen").width}
                        height={DIMENSIONS.get("screen").height * 0.3}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                    />
                </View>
            )}
        </View>
    );
}
