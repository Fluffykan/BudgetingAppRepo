import { TouchableOpacity, Text, View } from "react-native";
import { useState } from "react";
import style from "@/styling/style";

type DropdownSelectorProps = {
    options: string[];
    title: string;
    store: (type: string) => void;
};

export default function DropdownSelector({ options, title, store }: DropdownSelectorProps) {
    const [isOpen, toggleOpen] = useState(false);

    function onSelect(option: string) {
        store(option);
        toggleOpen(false);
    }

    return (
        <View style={style.dropdownSelector}>
            <TouchableOpacity onPress={() => toggleOpen(!isOpen)}>
                <Text>{title}</Text>
            </TouchableOpacity>
            {isOpen &&
                options.map((option) => (
                    <TouchableOpacity onPress={() => onSelect(option)} key={option}>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
