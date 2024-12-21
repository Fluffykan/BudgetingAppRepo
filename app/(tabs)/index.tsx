import { Button, View, Text, Keyboard, Modal, Alert, Pressable, StyleSheet } from "react-native";
import style from "@/styling/style";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";
import { Transaction, TransactionType } from "@/classes/Transaction";
import { useFocusEffect } from "expo-router";
import TransactionDisplay from "@/components/myComponents/TransactionDisplay";
import CreateTransactionButton, { CreateTransactionPage } from "@/components/myComponents/CreateTransaction";

export default function HomeScreen() {
    const path = FileSystem.documentDirectory + "/data.txt";

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useFocusEffect(
        useCallback(() => {
            // methods to execute when tab is focused
            enusreDataFileExists();
            readSaveFile();

            return () => {
                // methods to execute when tab is blurred
            };
        }, [])
    );

    useEffect(() => {
        handleSave();
    }, [transactions]);

    const enusreDataFileExists = async () => {
        const path = FileSystem.documentDirectory + "/data.txt";
        // check for data file
        const dirExists = await FileSystem.getInfoAsync(path);

        // create file if it does not exist
        if (!dirExists) {
            await FileSystem.writeAsStringAsync(path, "testing");
        }

        const content = await FileSystem.readAsStringAsync(path);
    };

    /**
     * Reads the save file, parses the data into transactions, and loads them into the useState
     */
    const readSaveFile = async () => {
        const content = await FileSystem.readAsStringAsync(path);
        setTransactions(Transaction.parseCsvSaveFile(content));
    };

    async function clearSaveFile() {
        await FileSystem.writeAsStringAsync(path, "");
        readSaveFile();
    }
    /**
     * Updates the save file upon changes to the transactions.
     */
    async function handleSave() {
        // TODO: find a way to split the save file by year, i.e. create 1 file for each year
        // to maybe reduce the length of substrings to be joined
        await FileSystem.writeAsStringAsync(path, transactions.map((transaction) => transaction.toString()).join("\n"));
    }

    function test() {
        const date = new Date();
        console.log(date.getMonth().toString() + date.getFullYear());
    }

    return (
        <View style={style.pageContainer}>
            <Text>HomeScreen</Text>
            <Button title="read save" onPress={() => readSaveFile()} />
            <Button title="clear save" onPress={() => clearSaveFile()} />
            <Button title="try" onPress={() => test()} />
            <TransactionDisplay transactions={transactions} setTransactions={setTransactions} />

            <CreateTransactionButton transactions={transactions} setTransactions={setTransactions} />
        </View>
    );
}
