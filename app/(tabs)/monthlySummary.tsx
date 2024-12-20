import { Transaction, TransactionType } from "@/classes/Transaction";
import style from "@/styling/style";
import { Button, Dimensions, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { SAVE_FILE_PATH } from "@/constants/SaveFileAddress";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import { DateMethod } from "@/classes/DateMethod";

export default function MonthlySummaryPage() {
    const monthlyTransactionsMap: Map<string, Transaction[]> = new Map();

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useFocusEffect(
        useCallback(() => {
            // methods to execute when tab is focused
            loadData();
            return () => {
                // methods to execute when tab is blurred
                monthlyTransactionsMap.clear();
            };
        }, [])
    );

    useEffect(() => {
        loadMap();
        calculateValues();
        console.log('ue')
    }, [transactions]);

    /**
     * Loads all transactions from the save file into a map, grouped by the month of the transaction
     */
    const loadData = async () => {
        const dataFileContents = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);
        setTransactions(Transaction.parseCsvSaveFile(dataFileContents));
        console.log('load data')
    };

    const loadMap = () => {
        transactions.forEach((transaction) => {
            const key: string = DateMethod.format_MMyyyy(transaction.getDate());
            if (!monthlyTransactionsMap.has(key)) {
                monthlyTransactionsMap.set(key, [transaction]);
            } else {
                // add the transaction to that month
                monthlyTransactionsMap.get(key)?.push(transaction);
            }
        });
    };

    const [xValues, setXValues] = useState<string[]>([]);
    const [yValues, setYValues] = useState<number[]>([]);

    const calculateValues = () => {

        setYValues(DateMethod.getPast5Months_MMyyyy(new Date()).map((month) => {
            if (monthlyTransactionsMap.has(month)) {
                // the if statement has already confirmed that the map has the key, and get() will not return undefined
                // @ts-ignore
                return monthlyTransactionsMap
                    .get(month)
                    .map((transaction) => transaction.getAmount())
                    .reduce((sum, nextAmt) => (sum += nextAmt));
            } else {
                return 0;
            }
        }).reverse());

        setXValues(DateMethod.getPast5Months_Myyyy_Short(new Date()).reverse());
    }

    return (
        <View style={style.pageContainer}>
            <LineChart
                data={{
                    labels: xValues,
                    datasets: [
                        {
                            data: yValues
                        },
                    ],
                }}
                width={Dimensions.get("window").width * 0.9} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />

            <Button title="manual load" onPress={() => loadData()} />
            <Button title="map" onPress={() => console.log(yValues)} />
            <Button title="amount" onPress={() => console.log(monthlyTransactionsMap.has('122024'))} />
        </View>
    );
}
