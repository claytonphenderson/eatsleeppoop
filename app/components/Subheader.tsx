import { Text, View } from "react-native"

export const Subheader = (props: { text: string, subtext?: string }) => {
    return (
        <View>
            <Text className='text-2xl font-bold text-black'>{props.text}</Text>
            {props.subtext && <Text className='xl font-normal text-black'>{props.subtext}</Text>}
        </View>
    )
}