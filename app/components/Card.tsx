import { View } from "react-native"

export const Card = (props: any) => {
    return (
        <View className="bg-white rounded-xl p-3">
            {props.children}
        </View>
    )
}