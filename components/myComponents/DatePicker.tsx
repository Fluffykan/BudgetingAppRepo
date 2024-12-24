import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type DatePickerProps = {
    date: Date;
    setDate: (date: Date) => void;
};

export default function DatePicker({ date, setDate }: DatePickerProps) {
    const [isVisible, setVisible] = useState(false);

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date) {
            setDate(date);
        }
        setVisible(!isVisible);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                <Text>{Intl.DateTimeFormat("en-GB").format(date)}</Text>
            </TouchableOpacity>
            {isVisible && <RNDateTimePicker value={date} onChange={onDateChange} maximumDate={new Date()} />}
        </View>
    );
}
