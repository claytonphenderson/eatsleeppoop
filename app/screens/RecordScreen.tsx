import { View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Card } from "../components/Card";
import { Subheader } from "../components/Subheader";

export const RecordScreen = (props: any) => {
    const subject: 'Eat' | 'Sleep' | 'Poop' = props.route.params.subject;
    return (
        <Screen>
            <View>
                <Header text={subject} />
            </View>
            <View className="flex flex-1">

            </View>
            <View>
                <Card>
                    <View>
                        <Subheader text='When?' subtext="Pick a date and time"></Subheader>
                    </View>
                    <RNDateTimePicker mode='datetime' display="inline" value={new Date()} />
                </Card>
            </View>
        </Screen>
    )
}