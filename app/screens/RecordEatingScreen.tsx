import { FlatList, ScrollView, TextInput, View } from "react-native";
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

export const RecordEatingScreen = (props: any) => {
    const listRef = useRef<FlatList>(null);
    const [selected, setSelected] = useState(0);
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const options = [<DateStep dateState={[date, setDate]} />, <HowMuch selectedState={[selected, setSelected]} />, <Notes noteState={[notes, setNotes]} />];
    const navigation = useNavigation<TrackingNavigation>();

    const save = () => {
        storage.set(`eat-${date.getTime()}`, JSON.stringify({
            id: `eat-${date.getTime()}`,
            type: 'eat',
            date,
            duration: selected,
            note: notes
        }));

        navigation.navigate('TrackingScreen');
    }


    return (
        <Screen>
            <View className="flex-row gap-2">
                <Header text='🍼' />
                <Header text='Eat' />
            </View>
            <View className="flex flex-1">

            </View>
            <View style={{ height: 340 }} className="gap-5">
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
                        onPress={() => save() }></PrimaryButton>
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
                <View className="flex-1 justify-center pr-3 items-center">
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
                <Subheader text='How Long?' subtext="How many minutes did baby eat?"></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center">
                <Picker
                    selectedValue={selected}
                    onValueChange={setSelected}
                >
                    <Picker.Item label="0" value={0}></Picker.Item>
                    <Picker.Item label="5" value={5}></Picker.Item>
                    <Picker.Item label="10" value={10}></Picker.Item>
                    <Picker.Item label="15" value={15}></Picker.Item>
                    <Picker.Item label="20" value={20}></Picker.Item>
                    <Picker.Item label="25" value={25}></Picker.Item>
                    <Picker.Item label="30" value={30}></Picker.Item>
                    <Picker.Item label="35" value={35}></Picker.Item>
                    <Picker.Item label="40" value={40}></Picker.Item>
                    <Picker.Item label="45" value={45}></Picker.Item>
                    <Picker.Item label="50" value={50}></Picker.Item>
                    <Picker.Item label="55" value={55}></Picker.Item>
                    <Picker.Item label="60" value={60}></Picker.Item>
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
                <Subheader text='Notes' subtext="Anything interesting?"></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center pt-3">
                <TextInput onChangeText={(t) => setNote(t)} className="bg-slate-50 flex-1 rounded-lg p-3 max-w-80" verticalAlign="top" multiline></TextInput>
            </View>
        </Card>
    )
}