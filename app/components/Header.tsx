import { Text, View } from "react-native"

export const Header = (props: { text: string, subtext?: string }) => {
    return (
        <View>
            <Text className='text-3xl font-bold text-black'>{props.text}</Text>
        </View>
    )
}