import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";

type IconButtonProps = {
    name: string;
    size?: number;
    color?: string;
    title?: string;
    flex?: number;
    width?: DimensionValue;
    height?: DimensionValue;
    borderWidth?: number;
    onPress: () => void;
};

export default function IconButton({ name, size, color, title, flex, height, width, borderWidth, onPress }: IconButtonProps) {
    const iconSize = size ? size : 30;

    const IconButtonStyle = StyleSheet.create({
        centerdText: {
            textAlign: "center",
            fontSize: iconSize / 2,
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={{ flex: flex ?? 1, height: height, width: width, borderWidth: borderWidth }}>
            {/*if the name provided is invalid, it will be converted into a '?', so any errorneous inputs can be ignored*/}
            {/*@ts-ignore*/}
            <FontAwesome name={name} color={color} size={iconSize} style={{ textAlign: "center" }} />
            {title && <Text style={IconButtonStyle.centerdText}>{title}</Text>}
        </TouchableOpacity>
    );
}
