import { Text, View } from "react-native"
import { Screen } from "../components/Screen"
import { Event } from "../models/event"
import { Header } from "../components/Header"
import { useMMKV, useMMKVObject } from "react-native-mmkv"
import { Subheader } from "../components/Subheader"
import moment from "moment"

export const HistoryDetailScreen = (props:any) => {
    const eventKey = props.route.params.eventKey;
    const [event, _] = useMMKVObject<Event>(eventKey);
    const emoji = event?.type === 'eat' ? '🍼' : event?.type === 'sleep' ? '💤' : '💩';
    
    if(!event) return null;
    
    return (
        <Screen>
            <View className="gap-5">
                <View>
                    <Header text={`${emoji} ${moment(event.date).format('MMMM d, h:mm a')}`}></Header>
                </View>
                <View>
                    <Subheader text="Details"></Subheader>
                    {event.duration && event.type === 'eat' &&<Text>{event.duration}min</Text>}
                    {event.duration && event.type === 'sleep' &&<Text>{event.duration}hrs</Text>}
                    {event.mlConsumed && <Text>{event.mlConsumed}mL</Text>}
                    {event.type === 'poop' && <Text>{event.wet && '1'}{event.wet && event.poopy && '&'}{event.poopy && 2}</Text>}
                </View>
                <View>
                    <Subheader text="Notes"></Subheader>
                    <Text>{event?.note || 'No notes'}</Text>
                </View>
            </View>
        </Screen>
    )
}