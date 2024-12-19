import { Button, View, Text, Keyboard } from "react-native";
import style from "@/styling/style";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Transaction } from "@/classes/Transaction";

export default function HomeScreen() {
    const path = FileSystem.documentDirectory + "/data.txt";

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        readSaveFile();
    }, [transactions.length]);

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
    }

    function test() {
        console.log('test')
    }

    return (
        <View style={style.pageContainer}>
            <Text>HomeScreen</Text>
            <View>
                {transactions.length != 0 && transactions.map((data) => <Text key={data.getId()}>transaction: {data.getAmount()}</Text>)}
            </View>
            <Button title="read save" onPress={() => readSaveFile()} />
            <Button title="clear save" onPress={() => clearSaveFile()} />
                <Button title='try' onPress={() => test()} />
        </View>
    );
}
