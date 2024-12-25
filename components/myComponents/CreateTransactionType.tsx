import style from "@/styling/style";
import { useState } from "react";
import { TextInput, View } from "react-native";
import IconButton from "./IconButton";
import { TransactionType } from "@/classes/TransactionType";

type CreateTransactionTypeProps = {
    setIsVisible: (b: boolean) => void;
};

export default function CreateTransactionType({ setIsVisible }: CreateTransactionTypeProps) {
    const [inputText, setInputText] = useState("");

    const handleSave = () => {
        TransactionType.addType(inputText);
        setIsVisible(false);
    };

    return (
        <View style={style.rowContainer}>
            <TextInput placeholder="New Type" onChangeText={setInputText} style={style.textInput} />
            <IconButton name="floppy-o" onPress={handleSave} flex={0} />
        </View>
    );
}
