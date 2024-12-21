import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useRef, useState } from "react";
import DropdownSelector from "@/components/myComponents/DropdownSelector";
import DatePicker from "@/components/myComponents/DatePicker";
import { Transaction, TransactionType } from "@/classes/Transaction";
import style from "@/styling/style";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "./IconButton";

type CreateTransactionButtonProps = {
    transactions: Transaction[];
    setTransactions: (newTransactions: Transaction[]) => void;
};

export default function CreateTransactionButton({ transactions, setTransactions }: CreateTransactionButtonProps) {
    const [isVisible, setVisible] = useState(false);

    function toggleModal() {
        setVisible(!isVisible);
    }

    const unsavedChangesWarning = () =>
        Alert.alert(
            "Warning",
            "There are unsaved changes, exit anyway?",
            [
                {
                    text: "Close",
                    onPress: () => setVisible(false),
                },
            ],
            {
                cancelable: true,
            }
        );

    return (
        <TouchableOpacity style={createTransactionButtonStyle.floatingButton} onPress={toggleModal}>
            <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={unsavedChangesWarning}>
                <CreateTransactionPage
                    transactions={transactions}
                    setTransactions={setTransactions}
                    setVisible={setVisible}
                />
            </Modal>
            <FontAwesome name="plus" style={createTransactionButtonStyle.iconStyle} size={30} />
        </TouchableOpacity>
    );
}

const createTransactionButtonStyle = StyleSheet.create({
    floatingButton: {
        height: 50,
        width: 50,
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 25,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        textAlign: "center",
    },
});

type CreateTransactionPageProps = {
    transactions: Transaction[];
    setTransactions: (newTransactions: Transaction[]) => void;
    setVisible: (visibility: boolean) => void;
};
export function CreateTransactionPage({ transactions, setTransactions, setVisible }: CreateTransactionPageProps) {
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
    function appendNewTransaction() {
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
        setTransactions([...transactions, newTransaction]);
        setVisible(false);
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

    return (
        <View style={style.modalContainer}>
            <View style={style.modalContentContainer}>
                <View>
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
                </View>
                <View style={style.flexRowContainer}>
                    <View style={{ width: "50%" }}>
                        <Button title="Close" onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ width: "50%" }}>
                        <Button title="Save" onPress={appendNewTransaction} />
                    </View>
                </View>
            </View>
        </View>
    );
}
