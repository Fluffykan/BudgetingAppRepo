import { TouchableOpacity, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { useState } from "react";
import { TransactionType } from "@/constants/TransactionType";

type DropdownSelectorProps = {
    options: TransactionType[];
    title: string;
    store: (type:TransactionType) => void;
}

export default function DropdownSelector({options, title, store}:DropdownSelectorProps) {
    const [isOpen, toggleOpen] = useState(false);

    function onSelect(option:TransactionType) {
        store(option);
        toggleOpen(false);
    }

    return (
        <ThemedView style={{borderWidth: 1}}>
        <TouchableOpacity onPress={() => toggleOpen(!isOpen)}>
            <Text>{title}</Text>
        </TouchableOpacity>
        {isOpen && options.map(option => 
            <TouchableOpacity onPress={() => onSelect(option)} key={option}>
                <Text>{option}</Text>
            </TouchableOpacity>)
        }
        </ThemedView>
    )
}