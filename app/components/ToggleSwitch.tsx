import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ToggleSwitch = (props: { options: string[], onSelectChange: (selected: string) => void }) => {
    const [selected, setSelected] = useState(props.options[0]);

    useEffect(() => {
        props.onSelectChange(selected);
    }, [selected]);

    return (
        <View className="bg-white h-18 rounded-md flex-row justify-around items-center p-2">
            {props.options.map(option => {
                return (
                    <TouchableOpacity
                        key={option}
                        onPress={() => setSelected(option)}
                        className={`${selected === option ? 'red' : ''} p-2 rounded-md flex-1`}>
                        <Text className={`${selected === option ? 'text-black' : ''} font-semibold text-center text-xl`}>{option}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}