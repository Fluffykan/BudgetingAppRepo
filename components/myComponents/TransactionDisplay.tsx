import { Transaction } from "@/classes/Transaction";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import style from "@/styling/style";
import IconButton from "./IconButton";

type TransactionDisplayProps = {
    transactions:Transaction[];
    setTransactions: (newTransactions:Transaction[]) => void;
}

export default function TransactionDisplay({transactions, setTransactions}:TransactionDisplayProps) {
    function handleDeleteTransaction(target:Transaction) {
        // TODO: implement function
        setTransactions(transactions.filter(transaction => transaction != target));
    }
    return (
        <ScrollView>
            {
                transactions.sort((t1:Transaction, t2:Transaction) => {
                    return t1.getDate() > t2.getDate() ? -1 : 1;
                }).map(transaction => 
                    <View key={transaction.getId()} style={style.transactionDisplayComponent}>
                        <View style={TransactionDisplayStyle.detailsContainer}>
                            <Text>{transaction.getType()}</Text>
                            <Text>{transaction.getAmount().toString()}</Text>
                            <Text style={{flexWrap: 'wrap'}}>{Intl.DateTimeFormat('en-GB').format(transaction.getDate())}</Text>
                            {transaction.getDescription().length != 0 && <Text>{transaction.getDescription()}</Text>}
                        </View>
                        <View style={TransactionDisplayStyle.buttonContainer}>
                            <IconButton name="trash" onPress={() => handleDeleteTransaction(transaction)} />
                        </View>
                    </View>
                )
            }
        </ScrollView>

    )
}

const TransactionDisplayStyle = StyleSheet.create({
    detailsContainer: {
        width: '85%'
    }, 
    buttonContainer: {
        width: '15%',
        alignContent: 'center',
        justifyContent: 'center',
    }
})