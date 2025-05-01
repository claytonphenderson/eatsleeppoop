import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ToggleSwitch = (props: { options: string[], onSelectChange: (selected: string) => void, initialOptionsIndex?: number }) => {
    const [selected, setSelected] = useState(props.initialOptionsIndex ? props.options[props.initialOptionsIndex] : props.options[0]);

    const handlePress = (newValue: string) => {
        setSelected(newValue);
        props.onSelectChange(newValue);
        console.log('toggle emitted' , newValue)
    }

    return (
        <View className="bg-white h-18 rounded-md flex-row justify-around items-center p-2">
            {props.options.map(option => {
                return (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handlePress(option)}
                        className={`${selected === option ? 'bg-blue ' : ''} p-2 rounded-md flex-1`}>
                        <Text className={`${selected === option ? 'text-white' : ''} font-semibold text-center text-xl`}>{option}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}