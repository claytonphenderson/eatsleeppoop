import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Card } from "../components/Card";
import { Subheader } from "../components/Subheader";
import { PrimaryButton } from "../components/Button";
import React, { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { storage, TrackingNavigation } from "../App";

export const RecordPoopScreen = (props: any) => {
    const listRef = useRef<FlatList>(null);
    const [selected, setSelected] = useState<{ wet: boolean, poopy: boolean }>({ wet: false, poopy: false });
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const options = [<DateStep dateState={[date, setDate]} />, <HowMuch selectedState={[selected, setSelected]} />, <Notes noteState={[notes, setNotes]} />];
    const navigation = useNavigation<TrackingNavigation>();

    const save = () => {
        storage.set(`poop-${date.getTime()}`, JSON.stringify({
            id: `poop-${date.getTime()}`,
            type: 'poop',
            date,
            poopy: selected.poopy,
            wet: selected.wet,
            note: notes
        }));

        navigation.navigate('TrackingScreen');
    }

    return (
        <Screen>
            <View className="flex-row gap-2">
                <Header text='💩' />
                <Header text='Poop' />
            </View>
            <View className="flex flex-1">

            </View>
            <View style={{ height: 360 }} className="gap-5">
                <View className="flex items-center">
                    <Text className="text-black text-base">Swipe to the right for more 👉</Text>
                </View>
                <FlatList
                    ref={listRef}
                    horizontal
                    snapToAlignment="center"
                    snapToInterval={320}
                    data={options}
                    ItemSeparatorComponent={() => (<View className="w-3"></View>)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    decelerationRate="fast"
                    renderItem={({ item }) => item}

                ></FlatList>
                <View className="pb-5">
                    <PrimaryButton
                        disabled={!selected.wet && !selected.poopy}
                        text='Submit'
                        onPress={() => save()}></PrimaryButton>
                </View>
            </View>
        </Screen>
    )
}


const DateStep = (props: { dateState: [Date, React.Dispatch<React.SetStateAction<Date>>] }) => {
    const [date, setDate] = props.dateState;
    return (
        <Card>
            <View className="min-w-80 flex-1">
                <View>
                    <Subheader text='When?' subtext="Pick a date and time"></Subheader>
                </View>
                <View className="flex-1 justify-center pr-3  items-center">
                    <RNDateTimePicker maximumDate={new Date()} key={'when'} mode='datetime' display='default' value={date} onChange={(_, date) => setDate(new Date(date!))} />
                </View>
            </View>
        </Card>
    )
}

const HowMuch = (props: { selectedState: [{ wet: boolean, poopy: boolean }, React.Dispatch<React.SetStateAction<{ wet: boolean, poopy: boolean }>>] }) => {
    const [selected, setSelected] = props.selectedState;
    return (
        <Card>
            <View className="min-w-80">
                <Subheader text='Wet, Dirty, Or Both?'></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center gap-3">
                <TouchableOpacity className="border-2 rounded-lg border-blue" onPress={() => setSelected({ ...selected, wet: !selected.wet })}>
                    <Card>
                        <View className="flex-row gap-2">
                            {selected.wet && <Subheader text="✔️"></Subheader>}
                            <Subheader text="Wet"></Subheader>
                        </View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity className="border-2 rounded-lg border-blue" onPress={() => setSelected({ ...selected, poopy: !selected.poopy })}>
                    <Card>
                        <View className="flex-row gap-2">
                            {selected.poopy && <Subheader text="✔️"></Subheader>}
                            <Subheader text="Poopy"></Subheader>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        </Card>
    )
}

const Notes = (props: { noteState: [string, React.Dispatch<React.SetStateAction<string>>] }) => {
    const [_, setNote] = props.noteState;
    return (
        <Card>
            <View className="min-w-80">
                <Subheader text='Notes' subtext="Anything interesting? (optional)"></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center pt-3">
                <TextInput onChangeText={(t) => setNote(t)} className="bg-slate-50 flex-1 rounded-lg p-3" verticalAlign="top" multiline></TextInput>
            </View>
        </Card>
    )
}