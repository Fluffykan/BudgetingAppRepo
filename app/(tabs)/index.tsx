import { View, Text } from "react-native";
import style from "@/styling/style";
import * as FileSystem from "expo-file-system";
import { useCallback, useState } from "react";
import { Transaction } from "@/classes/Transaction";
import { useFocusEffect } from "expo-router";
import TransactionDisplay from "@/components/myComponents/TransactionDisplay";
import { TransactionType } from "@/classes/TransactionType";
import { SAVE_FILE_PATH, TRANSACTION_TYPES_FILE_PATH } from "@/constants/SaveFileAddress";

export default function HomeScreen() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useFocusEffect(
        useCallback(() => {
            // methods to execute when tab is focused
            loadTransactionTypes();
            readSaveFile();

            return () => {
                // methods to execute when tab is blurred
            };
        }, [])
    );

    const loadTransactionTypes = async () => {
        if (!(await FileSystem.getInfoAsync(TRANSACTION_TYPES_FILE_PATH))) {
            // no prior saved types, i.e. probably first launch of the app
            // save the default types into the file
            await FileSystem.writeAsStringAsync(TRANSACTION_TYPES_FILE_PATH, TransactionType.getTypesCsv());
        } else {
            const typesCsv: string = await FileSystem.readAsStringAsync(TRANSACTION_TYPES_FILE_PATH);
            TransactionType.loadTypesFromCsv(typesCsv);
        }
    };

    /**
     * Reads the save file, parses the data into transactions, and loads them into the useState
     */
    const readSaveFile = async () => {
        const content = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);
        setTransactions(Transaction.parseCsvSaveFile(content));
    };

    return (
        <View style={style.pageContainer}>
            <Text style={style.h1b}>HomeScreen</Text>
            <TransactionDisplay transactions={transactions} masterList={transactions} setMasterList={setTransactions} />
        </View>
    );
}
