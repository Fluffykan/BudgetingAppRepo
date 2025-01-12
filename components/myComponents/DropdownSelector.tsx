import { TouchableOpacity, Text, View, StyleProp, TextStyle } from "react-native";
import { useState } from "react";
import style from "@/styling/style";

type DropdownSelectorProps = {
    options: string[];
    title: string;
    store: (type: string) => void;
    textStyle?:StyleProp<TextStyle>;
};

export default function DropdownSelector({ options, title, store, textStyle }: DropdownSelectorProps) {
    const [isOpen, toggleOpen] = useState(false);

    function onSelect(option: string) {
        store(option);
        toggleOpen(false);
    }

    return (
        <View style={style.dropdownSelector}>
            <TouchableOpacity onPress={() => toggleOpen(!isOpen)}>
                <Text style={textStyle}>{title}</Text>
            </TouchableOpacity>
            {isOpen &&
                options.map((option) => (
                    <TouchableOpacity onPress={() => onSelect(option)} key={option}>
                        <Text style={textStyle}>{option}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
