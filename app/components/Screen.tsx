import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Screen = (props: any) => {
    const insets = useSafeAreaInsets();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} style={{ paddingTop: insets.top, paddingBottom: 15 }} className="flex flex-1 px-5">
            {props.children}
        </KeyboardAvoidingView>
    )
}