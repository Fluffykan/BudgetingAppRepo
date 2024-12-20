import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useRef, useState } from "react";
import DropdownSelector from "@/components/myComponents/DropdownSelector";
import DatePicker from "@/components/myComponents/DatePicker";
import { Transaction, TransactionType } from "@/classes/Transaction";
import { router } from "expo-router";
import style from "@/styling/style";

export default function createTransactionPage() {
    // TODO: validation should be done on launch of the app.
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

    const [transactionType, setType] = useState("Select Type");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");

    const showAlert = () =>
        Alert.alert(
            "Success!",
            "Your transaction has been saved",
            [
                {
                    text: "Back",
                    onPress: () => router.back, // navigate to home screen
                },
            ],
            {
                cancelable: true,
                onDismiss: () => router.back, // navigate to home screen
            }
        );

    async function handleSave() {
        const path = FileSystem.documentDirectory + "/data.txt";
        if (transactionType == "Select Type") {
            console.log("no type chosen");
            return;
        }
        const newTransaction = new Transaction(transactionType.toString(), Number(formatAmount()), date, description);
        const currData = await FileSystem.readAsStringAsync(path);
        const appendedData = currData + "\n" + newTransaction.toString();
        await FileSystem.writeAsStringAsync(path, appendedData);
        showAlert();
    }

    // input amount component

    function handleOnChangeTextAmount(text: string) {
        if (!isNaN(Number(text))) {
            setAmount(Number(text));
        }
    }

    /**
     * 
     * @returns a string representing the amount input by the user in 2 decimal places
     */
    function formatAmount(): string {
      const decimal = amount % 100 < 10 ? '0' + amount % 100 : amount % 100;
      const int = Math.floor(amount / 100);
      return int + '.' + decimal;
    }


    /* 
    inputRef is always used to point to the hidden text input. Should it be no longer in use,
    delete the following line:

    const handleClick = () => inputRef.current.focus();
    */
    const inputRef = useRef(null);
    // @ts-ignore
    const handleClick = () => inputRef.current.focus();

    return (
        <View style={style.pageContainer}>
            <Text>Transaction Details</Text>
            <Text>Transaction Type</Text>
            <DropdownSelector
                title={transactionType.toString()}
                options={Object.keys(TransactionType).filter((key) => isNaN(Number(key)))}
                store={setType}
            />
            <Text>Amount</Text>
            <TouchableOpacity onPress={handleClick}>
              <Text>{formatAmount()}</Text>
            </TouchableOpacity>

            <View style={style.hiddenElement}>
                <TextInput
                    ref={inputRef}
                    value={amount.toString()}
                    placeholder="0"
                    maxLength={12}
                    inputMode="decimal"
                    caretHidden={true}
                    onChangeText={handleOnChangeTextAmount}
                />
            </View>

            <Text>Date</Text>
            <DatePicker date={date} setDate={setDate} />
            <Text>Description</Text>
            <TextInput placeholder="(Max 50 chars)" maxLength={50} onChangeText={setDescription} />
            <Button title="Save" onPress={() => handleSave()} />
        </View>
    );
}
