import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type DropDownTrayHeaderProps = {
    title: string;
    isOpen: boolean;
    borderWidth?:number;
    setIsOpen: (bool: boolean) => void;
};

/**
 * UI for a clickable area that when clicked, will expose another UI element
 * @param title the text to be displayed
 * @param isOpen whether the other UI element is visible
 * @param setIsOpen a function to set the value of isOpen
 * @returns a TouchableOpacity that toggles the value of isOpen
 */
export default function DropdownTrayHeader({ title, isOpen, borderWidth, setIsOpen }: DropDownTrayHeaderProps) {
    const style = StyleSheet.create({
        buttonContainer: {
            height: "5%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderWidth: borderWidth ?? 0,
        },
    });
    
    
    if (isOpen) {
        return (
            <TouchableOpacity onPress={() => setIsOpen(false)} style={style.buttonContainer}>
                <Text>{title} </Text>
                <FontAwesome name="chevron-up" />
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => setIsOpen(true)} style={style.buttonContainer}>
                <Text>{title} </Text>
                <FontAwesome name="chevron-down" />
            </TouchableOpacity>
        );
    }
}

