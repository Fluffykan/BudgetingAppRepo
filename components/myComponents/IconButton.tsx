import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";

type IconButtonProps = {
    name: string;
    size?: number;
    color?: string;
    bgColor?: string;
    title?: string;
    flex?: number;
    width?: DimensionValue;
    height?: DimensionValue;
    borderWidth?: number;
    flexDir?: "row" | "column";
    onPress: () => void;
};

/**
 * Creates a Button with an icon and an optional title
 *
 * @param name Name of the icon (FontAwesome Icons only)
 * @param size Size of the button
 * @param color Color of the button's icon
 * @param bgColor Color of the button's background
 * @param title Text to be displayed on the button
 * @param flex Flex value
 * @param width Width of the button relative to the container in %
 * @param height Height of the button relative to conatiner in %
 * @param borderWidth Width of the button's border
 * @param flexDir Alignment of the text and icon
 * @param onPress Function to execute upon pressing the button
 */
export default function IconButton({
    name,
    size,
    color,
    title,
    flex,
    height,
    width,
    borderWidth,
    flexDir,
    bgColor,
    onPress,
}: IconButtonProps) {
    const iconSize = size ? size : 30;

    const IconButtonStyle = StyleSheet.create({
        centerdText: {
            textAlign: "center",
            fontSize: iconSize / 2,
        },
    });

    if (flexDir == "column" || flexDir == undefined) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flex: flex ?? 1,
                    height: height,
                    width: width,
                    borderWidth: borderWidth,
                    backgroundColor: bgColor,
                }}
            >
                {/*if the name provided is invalid, it will be converted into a '?', so any errorneous inputs can be ignored*/}
                {/*@ts-ignore*/}
                <FontAwesome name={name} color={color} size={iconSize} style={{ textAlign: "center" }} />
                {title && <Text style={IconButtonStyle.centerdText}>{title}</Text>}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: flex ?? 1,
                height: height,
                width: width,
                borderWidth: borderWidth,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: bgColor,
                padding: 1,
            }}
        >
            {title && <Text style={IconButtonStyle.centerdText}>{title} </Text>}
            {/*if the name provided is invalid, it will be converted into a '?', so any errorneous inputs can be ignored*/}
            {/*@ts-ignore*/}
            <FontAwesome name={name} color={color} size={iconSize} style={{ textAlign: "center" }} />
        </TouchableOpacity>
    );
}
