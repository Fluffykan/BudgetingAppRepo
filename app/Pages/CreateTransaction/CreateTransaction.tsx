import { View, Text, TextInput, Alert, TouchableOpacity, Modal } from "react-native";
import { useEffect, useRef, useState } from "react";
import DropdownSelector from "@/components/myComponents/DropdownSelector";
import DatePicker from "@/components/myComponents/DatePicker";
import { Transaction } from "@/classes/Transaction";
import style from "@/styling/style";
import { TransactionType } from "@/classes/TransactionType";
import * as FileSystem from "expo-file-system";
import { NEW_TRANSACTION_DATE_FILE_PATH, SAVE_FILE_PATH } from "@/constants/SaveFileAddress";
import { router } from "expo-router";
import ManageTransactionTypes from "./ManageTransactionTypes";
import IconButton from "@/components/myComponents/IconButton";

export default function CreateTransactionPage() {
    // useStates to store the user's inputs
    const [transactionType, setType] = useState("Select Type");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");

    useEffect(() => {
        getTargetDate();
    }, []);

    const getTargetDate = async () => {
        const date = await FileSystem.readAsStringAsync(NEW_TRANSACTION_DATE_FILE_PATH);
        setDate(new Date(date));
    };

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
        if (transactionType == "Select Type" || amount == 0) {
            showAlertError(transactionType == "Select Type", amount == 0);
            return;
        }
        await appendNewTransaction();
        router.back();
    };

    return (
        <View style={style.paddedFlexContainer}>
            <View style={style.flexContainer}>
                <View style={style.flexContainer}>
                    <Text style={style.h2}>Transaction Details</Text>
                    <Text style={style.h3}>Transaction Type</Text>
                    <DropdownSelector
                        title={transactionType.toString()}
                        options={TransactionType.getTypes()}
                        store={setType}
                        textStyle={style.h4}
                    />

                    <TouchableOpacity onPress={() => setisCreateNewTypeWindowOpen(true)}>
                        <Text style={style.centeredText}>Manage Transaction Types</Text>
                    </TouchableOpacity>

                    <Modal visible={isCreateNewTypeWindowOpen} transparent={true}>
                        <TouchableOpacity
                            style={style.flexContainer}
                            onPress={() => setisCreateNewTypeWindowOpen(false)}
                        />
                        <View style={style.topPaddedPopup}>
                            <ManageTransactionTypes />
                        </View>
                    </Modal>

                    <Text style={style.h3}>Amount</Text>
                    <TouchableOpacity onPress={handleClick}>
                        <Text style={style.t3}>{formatAmount()}</Text>
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

                    <Text style={style.h3}>Date</Text>
                    <DatePicker style={style.t3} date={date} setDate={setDate} />
                    <Text style={style.h3}>Description</Text>
                    <View style={style.rowContainer}>
                        <TextInput
                            placeholder="(Max 50 chars)"
                            maxLength={50}
                            onChangeText={setDescription}
                            style={style.t4}
                        />
                    </View>
                </View>
                <View style={style.rowContainer}>
                    <IconButton name="window-close" color="red" title="Close" onPress={() => router.back()} />
                    <IconButton name="floppy-o" color="green" title="Save" onPress={handleSave} />
                </View>
            </View>
        </View>
    );
}
