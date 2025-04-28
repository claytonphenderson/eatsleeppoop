import { Text, TouchableOpacity, View } from "react-native"
import { Screen } from "../components/Screen"
import { Header } from "../components/Header"
import { Card } from "../components/Card"
import { Subheader } from "../components/Subheader"
import { useNavigation } from "@react-navigation/native"
import { TrackingNavigation } from "../App"

export const TrackingScreen = () => {
    const navigation = useNavigation<TrackingNavigation>();
    return (
        <Screen>
            <View className="flex flex-1">
                <View>
                    <Header text="Eat. Sleep. Poop."></Header>
                </View>
                <View className="flex flex-1">
                </View>
                <View className="gap-3">
                    <View>
                        <Text className="text-2xl font-semibold text-black">What did the baby do?</Text>
                    </View>
                    <View className="gap-3">
                        <TouchableOpacity onPress={() => navigation.navigate('RecordScreen', { subject: 'Eat' })}>
                            <Card>
                                <Subheader text='Eat' subtext='Record time and duration of feeding'></Subheader>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RecordScreen', { subject: 'Sleep' })}>
                            <Card>
                                <Subheader text='Sleep' subtext='Record a sleep session'></Subheader>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RecordScreen', { subject: 'Poop' })}>
                            <Card>
                                <Subheader text='Poop' subtext='Record a dirty diaper'></Subheader>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Screen>
    )
}