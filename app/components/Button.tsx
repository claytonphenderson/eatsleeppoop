import { Text, TouchableOpacity } from "react-native"
import { opacity } from "react-native-reanimated/lib/typescript/Colors"

export const PrimaryButton = (props: { text: string, onPress?: () => void, onLongPress?:()=> void, disabled?: boolean}) => {
    return (
        <TouchableOpacity disabled={props.disabled} 
        className={`flex flex-row bg-blue h-16 rounded-lg justify-center items-center ${props.disabled ? 'opacity-50': 'opacity-100'}`}
        onPress={props.onPress }
        onLongPress={props.onLongPress}>
            <Text className="text-white text-xl font-semibold">{props.text}</Text>
        </TouchableOpacity>
    )
}