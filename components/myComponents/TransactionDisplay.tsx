import { Transaction } from "@/classes/Transaction";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import style from "@/styling/style";
import IconButton from "./IconButton";
import * as FileSystem from "expo-file-system";
import { SAVE_FILE_PATH } from "@/constants/SaveFileAddress";

type TransactionDisplayProps = {
    transactions: Transaction[];
    masterList: Transaction[];
    setMasterList: (newTransactions: Transaction[]) => void;
    styling?: "normal" | "popup";
};

/**
 * Creates the UI for a list of transactions
 *
 * @param transactions The transactions to be displayed
 * @param masterList The array of all transactions
 * @param setMasterList
 * @param styling UI modifications based on where the component is used
 */
export default function TransactionDisplay({
    transactions,
    masterList,
    setMasterList,
    styling,
}: TransactionDisplayProps) {
    const chosenStyling = styling
        ? styling == "popup"
            ? style.transactionDisplayComponentPopup
            : style.transactionDisplayComponent
        : style.transactionDisplayComponent;

    async function handleDeleteTransaction(target: Transaction) {
        // TODO: implement function
        // get updated array without the deleted transaction
        const filteredList: Transaction[] = masterList.filter((transaction) => transaction != target);
        // convert array to csv and write to save file
        await FileSystem.writeAsStringAsync(
            SAVE_FILE_PATH,
            filteredList.reduce((prev, next) => prev + "\n" + next.toString(), "")
        );
        // update list
        setMasterList(filteredList);
        console.log("done");
    }

    return (
        <ScrollView>
            {transactions
                .sort((t1: Transaction, t2: Transaction) => {
                    return t1.getDate() > t2.getDate() ? -1 : 1;
                })
                .map((transaction) => (
                    <View key={transaction.getId()} style={chosenStyling}>
                        <View style={TransactionDisplayStyle.detailsContainer}>
                            <Text>{transaction.getType()}</Text>
                            <Text>{transaction.getAmount().toString()}</Text>
                            <Text style={{ flexWrap: "wrap" }}>
                                {Intl.DateTimeFormat("en-GB").format(transaction.getDate())}
                            </Text>
                            {transaction.getDescription().length != 0 && <Text>{transaction.getDescription()}</Text>}
                        </View>
                        <View style={TransactionDisplayStyle.buttonContainer}>
                            <IconButton name="trash" onPress={() => handleDeleteTransaction(transaction)} />
                        </View>
                    </View>
                ))}
        </ScrollView>
    );
}

const TransactionDisplayStyle = StyleSheet.create({
    detailsContainer: {
        width: "85%",
    },
    buttonContainer: {
        width: "15%",
        alignContent: "center",
        justifyContent: "center",
    },
});
