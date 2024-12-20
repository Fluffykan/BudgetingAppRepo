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
        console.log('save');
        handleSave();
    }, [transactions])
    
    const enusreDataFileExists = async () => {
        console.log("starting");
        const path = FileSystem.documentDirectory + "/data.txt";
        // check for data file
        const dirExists = await FileSystem.getInfoAsync(path);
        console.log("...");

        // create file if it does not exist
        if (!dirExists) {
            await FileSystem.writeAsStringAsync(path, "testing");
        }

        const content = await FileSystem.readAsStringAsync(path);
        console.log(content);
    };

    /**
     * 
     */
    async function readSaveFile() {
        console.log("start read");
        const content = await FileSystem.readAsStringAsync(path);
        console.log(content);
        setTransactions(Transaction.parseCsvSaveFile(content));
        console.log("end read");
    }

    async function clearSaveFile() {
        console.log("start clear");
        await FileSystem.writeAsStringAsync(path, "");
        console.log("end clear");
        readSaveFile();
    }
    /**
     * Updates the save file upon changes to the transactions.
     */
    async function handleSave() {
        await FileSystem.writeAsStringAsync(path, transactions.map(transaction => transaction.toString()).join('\n'));
    }

    function test() {
    }

    return (
            <View style={style.pageContainer}>
                <Text>HomeScreen</Text>
                <Button title="read save" onPress={() => readSaveFile()} />
                <Button title="clear save" onPress={() => clearSaveFile()} />
                <Button title='try' onPress={() => test()} />
                <TransactionDisplay transactions={transactions} setTransactions={setTransactions} />

                <CreateTransactionButton transactions={transactions} setTransactions={setTransactions}/>
            </View>
    );
}

