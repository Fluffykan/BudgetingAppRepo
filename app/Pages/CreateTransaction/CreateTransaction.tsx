import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useRef, useState } from "react";
import DropdownSelector from "@/components/myComponents/DropdownSelector";
import DatePicker from "@/components/myComponents/DatePicker";
import { Transaction } from "@/classes/Transaction";
import style from "@/styling/style";
import { FontAwesome } from "@expo/vector-icons";
import { TransactionType } from "@/classes/TransactionType";
import DropdownTrayHeader from "../../../components/myComponents/DropdownTrayHeader";
import CreateTransactionType from "../../../components/myComponents/CreateTransactionType";
import * as FileSystem from "expo-file-system";
import { SAVE_FILE_PATH } from "@/constants/SaveFileAddress";
import { Link, router } from "expo-router";

export default function CreateTransactionPage() {
    // useStates to store the user's inputs
    const [transactionType, setType] = useState("Select Type");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");

    const showAlertError = (typeNotDefined: boolean, amountEqualsZero: boolean) => {
        const errorMsg = (typeNotDefined ? "No type chosen\n" : "") + (amountEqualsZero ? "Amount cannot be 0" : "");
        return Alert.alert(
            "Error!",
            errorMsg,
            [
                {
                    text: "Back",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    /**
     * Updates the save file with the new transaction
     */
    async function appendNewTransaction() {
        console.log("saving");
        if (transactionType == "Select Type" || amount == 0) {
            showAlertError(transactionType == "Select Type", amount == 0);
            return;
        }
        const newTransaction: Transaction = new Transaction(
            transactionType.toString(),
            Number(formatAmount()),
            date,
            description
        );

        // update the save file
        const oldSaveFile = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);

        const newSaveFile = oldSaveFile + "\n" + newTransaction.toString();

        await FileSystem.writeAsStringAsync(SAVE_FILE_PATH, newSaveFile);

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
        const decimal = amount % 100 < 10 ? "0" + (amount % 100) : amount % 100;
        const int = Math.floor(amount / 100);
        return int + "." + decimal;
    }

    /* 
    inputRef is always used to point to the hidden text input. Should it be no longer in use,
    delete the following line:

    const handleClick = () => inputRef.current.focus();
    */
    const inputRef = useRef(null);
    // @ts-ignore
    const handleClick = () => inputRef.current.focus();

    // Add new transaction type component
    const [isCreateNewTypeWindowOpen, setisCreateNewTypeWindowOpen] = useState(false);

    const handleSave = async () => {
        await appendNewTransaction();
        router.back();
    }

    return (
        <View style={style.paddedFlexContainer}>
            <View style={style.flexContainer}>
                <View style={style.flexContainer}>
                    <Text>Transaction Details</Text>
                    <Text>Transaction Type</Text>
                    <DropdownSelector
                        title={transactionType.toString()}
                        options={TransactionType.getTypes()}
                        store={setType}
                    />
                    <DropdownTrayHeader
                        title="Add New Transaction Type"
                        isOpen={isCreateNewTypeWindowOpen}
                        setIsOpen={setisCreateNewTypeWindowOpen}
                    />
                    {isCreateNewTypeWindowOpen && <CreateTransactionType setIsVisible={setisCreateNewTypeWindowOpen} />}

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
                            style={style.textInput}
                        />
                    </View>

                    <Text>Date</Text>
                    <DatePicker date={date} setDate={setDate} />
                    <Text>Description</Text>
                    <View style={style.rowContainer}>
                        <TextInput
                            placeholder="(Max 50 chars)"
                            maxLength={50}
                            onChangeText={setDescription}
                            style={style.textInput}
                        />
                    </View>
                        
                    
                </View>
                <View style={style.rowContainer}>
                    <View style={{ width: "50%" }}>
                        <Button title="Close" onPress={() => router.back()} />
                    </View>
                    <View style={{ width: "50%" }}>
                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </View>
    );
}
