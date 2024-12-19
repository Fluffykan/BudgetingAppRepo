import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import { TransactionType } from "@/constants/TransactionType";
import { useState } from "react";
import DropdownSelector from "@/components/myComponents/DropdownSelector";
import DatePicker from "@/components/myComponents/DatePicker";
import { Transaction } from "@/classes/Transaction";
import { router } from 'expo-router';
import style from '@/styling/style';

export default function createTransactionPage() {

    // TODO: validation should be done on launch of the app.
    const enusreDataFileExists = async () => {
        console.log('starting')
        const path = FileSystem.documentDirectory + '/data.txt';
        // check for data file
        const dirExists = await FileSystem.getInfoAsync(path);
        console.log('...')

        // create file if it does not exist
        if (!dirExists) {
            await FileSystem.writeAsStringAsync(path, 'testing');
        }

        const content = await FileSystem.readAsStringAsync(path);
        console.log(content);
    }

    const [transactionType, setType] = useState<TransactionType>(TransactionType.OTHERS);
    const [amount, setAmount] = useState<number>(0.00);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    const showAlert = () =>
        Alert.alert(
          'Success!',
          'Your transaction has been saved',
          [
            {
              text: 'Back',
              onPress: () => router.back // navigate to home screen
            },
          ],
          {
            cancelable: true,
            onDismiss: () => router.back // navigate to home screen
          },
        );

    async function handleSave() {
        const path = FileSystem.documentDirectory + '/data.txt';
        const newTransaction = new Transaction(transactionType, amount, date, description);
        const currData = await FileSystem.readAsStringAsync(path);
        const appendedData = currData + '\n' + newTransaction.toString();
        await FileSystem.writeAsStringAsync(path, appendedData);
        showAlert();
    }



    return (
        <View style={style.pageContainer}>
            <Text>Transaction Details</Text>
            <Text>Transaction Type</Text>
            <DropdownSelector title={transactionType} options={Object.values(TransactionType)} store={setType} />
            <Text>Amount</Text>
            <TextInput placeholder="$0.00" inputMode="decimal" onChangeText={(text:string) => setAmount(Number.parseFloat(text))}/>
            <Text>Date</Text>
            <DatePicker date={date} setDate={setDate}/>
            <Text>Description {"(Optional)"}</Text>
            <TextInput placeholder="Lunch at Dominos" onChangeText={setDescription} />
            <Button title='Save' onPress={() => handleSave()} />
        </View>
    )
}