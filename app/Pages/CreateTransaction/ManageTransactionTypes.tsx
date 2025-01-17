import style from "@/styling/style";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import IconButton from "../../../components/myComponents/IconButton";
import { TransactionType } from "@/classes/TransactionType";

export default function ManageTransactionTypes() {
    const [inputText, setInputText] = useState("");
    const [toggle, setToggle] = useState(false); // used to force the component to re-render

    const handleSave = () => {
        TransactionType.addType(inputText);
        setToggle(!toggle);
    };

    const handleRemoveType = (type: string) => {
        TransactionType.removeType(type);
        setToggle(!toggle);
    };

    return (
        <View>
            <Text style={style.h2c}>Manage Types</Text>
            <Text style={style.h3}>Existing Types</Text>
            {TransactionType.getTypes().map((type) => {
                return (
                    <View id={type} style={style.rowContainerSpaceBtwn}>
                        <Text style={style.t4}>{type}</Text>
                        <IconButton
                            name="times"
                            color="red"
                            width={"10%"}
                            flex={0}
                            onPress={() => handleRemoveType(type)}
                        />
                    </View>
                );
            })}
            <Text style={style.h3}>Add New Type</Text>
            <View style={style.rowContainer}>
                <TextInput placeholder="New Type" onChangeText={setInputText} style={style.textInput} />
                <IconButton name="floppy-o" onPress={handleSave} flex={0} />
            </View>
        </View>
    );
}
