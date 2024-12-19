import { TouchableOpacity, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { useState } from "react";

type DropdownSelectorProps = {
    options: string[];
    title: string;
    store: (type: string) => void;
};

export default function DropdownSelector({
    options,
    title,
    store,
}: DropdownSelectorProps) {
    const [isOpen, toggleOpen] = useState(false);

    function onSelect(option: string) {
        store(option);
        toggleOpen(false);
    }

    return (
        <ThemedView style={{ borderWidth: 1 }}>
            <TouchableOpacity onPress={() => toggleOpen(!isOpen)}>
                <Text>{title}</Text>
            </TouchableOpacity>
            {isOpen &&
                options.map((option) => (
                    <TouchableOpacity
                        onPress={() => onSelect(option)}
                        key={option}
                    >
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
        </ThemedView>
    );
}
