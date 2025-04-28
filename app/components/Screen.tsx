import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Screen = (props: any) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: insets.top, paddingBottom: 15 }} className="flex flex-1 px-5">
            {props.children}
        </View>
    )
}