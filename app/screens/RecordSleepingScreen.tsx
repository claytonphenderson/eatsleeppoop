import { FlatList, ScrollView, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Card } from "../components/Card";
import { Subheader } from "../components/Subheader";
import { PrimaryButton } from "../components/Button";
import React, { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { storage, TrackingNavigation } from "../App";
import { useNavigation } from "@react-navigation/native";

export const RecordSleepingScreen = (props: any) => {
    const listRef = useRef<FlatList>(null);
    const [selected, setSelected] = useState(0);
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const navigation = useNavigation<TrackingNavigation>();

    const options = [<DateStep dateState={[date, setDate]} />, <HowMuch selectedState={[selected, setSelected]} />, <Notes noteState={[notes, setNotes]} />];

    const save = () => {
        storage.set(`sleep-${date.getTime()}`, JSON.stringify({
            id: `sleep-${date.getTime()}`,
            type: 'sleep',
            date,
            duration: selected,
            note: notes
        }));

        navigation.navigate('TrackingScreen');
    }

    return (
        <Screen>
            <View className="flex-row gap-2">
                <Header text='💤' />
                <Header text='Sleep' />
            </View>
            <View className="flex flex-1">

            </View>
            <View style={{ height: 360 }} className="gap-5 h-2/4">
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
                        disabled={selected === 0}
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

const HowMuch = (props: { selectedState: [number, React.Dispatch<React.SetStateAction<number>>] }) => {
    const [selected, setSelected] = props.selectedState;
    return (
        <Card>
            <View className="min-w-80">
                <Subheader text='How Long?' subtext="How many hours did baby sleep?"></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center">
                <Picker
                    selectedValue={selected}
                    onValueChange={setSelected}
                >
                    <Picker.Item label="0" value={0}></Picker.Item>
                    <Picker.Item label=".5" value={.5}></Picker.Item>
                    <Picker.Item label="1" value={1}></Picker.Item>
                    <Picker.Item label="1.5" value={1.5}></Picker.Item>
                    <Picker.Item label="2" value={2}></Picker.Item>
                    <Picker.Item label="2.5" value={2.5}></Picker.Item>
                    <Picker.Item label="3" value={3}></Picker.Item>
                    <Picker.Item label="3.5" value={3.5}></Picker.Item>
                    <Picker.Item label="4" value={4}></Picker.Item>
                    <Picker.Item label="4.5" value={4.5}></Picker.Item>
                    <Picker.Item label="5" value={5}></Picker.Item>
                    <Picker.Item label="5.5" value={5.5}></Picker.Item>
                    <Picker.Item label="6" value={6}></Picker.Item>
                    <Picker.Item label="6.5" value={6.5}></Picker.Item>
                    <Picker.Item label="7" value={7}></Picker.Item>
                    <Picker.Item label="7.5" value={7.5}></Picker.Item>
                    <Picker.Item label="8" value={8}></Picker.Item>
                </Picker>
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