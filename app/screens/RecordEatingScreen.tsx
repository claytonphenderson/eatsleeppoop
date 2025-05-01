import { FlatList, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { Screen } from "../components/Screen";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Card } from "../components/Card";
import { Subheader } from "../components/Subheader";
import { PrimaryButton } from "../components/Button";
import React, { useRef, useState } from "react";
import { PickerIOS } from '@react-native-picker/picker';
import { storage, TrackingNavigation } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useMMKVBoolean } from "react-native-mmkv";
import { Event } from "../models/event";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";

export const RecordEatingScreen = (props: any) => {
    const listRef = useRef<FlatList>(null);
    const [selected, setSelected] = useState(0);
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const options = [<DateStep dateState={[date, setDate]} />, <HowMuch selectedState={[selected, setSelected]} />, <Notes noteState={[notes, setNotes]} />];
    const navigation = useNavigation<TrackingNavigation>();
    const [measureInMin, setMeasureInMin] = useMMKVBoolean('settings-eatingMeasureInMin');
    const keyboardVisible = useKeyboardVisible();

    const save = () => {
        const val: Event = {
            id: `eat-${date.getTime()}`,
            type: 'eat',
            date,
            note: notes
        };

        if (measureInMin) val.duration = selected;
        else val.mlConsumed = selected;

        storage.set(`eat-${date.getTime()}`, JSON.stringify(val));
        navigation.navigate('TrackingScreen');
    }

    const handleSettingToggle = (newValue: string) => {
        if (newValue !== 'minutes eating') {
            setMeasureInMin(false);
            return;
        }

        setMeasureInMin(true)
    }


    return (
        <Screen>
            <View className="flex-row gap-2">
                <Header text='🍼' />
                <Header text='Eat' />
            </View>
            <View className="flex flex-1">
                {!keyboardVisible && <View className="mt-5 gap-3">
                    <View>
                        <Subheader text='Tracking mode' subtext='Select how you would like to track eating activity'></Subheader>
                    </View>
                    <View>
                        <ToggleSwitch
                            options={['mL consumed', 'minutes eating']}
                            initialOptionsIndex={measureInMin ? 1 : 0}
                            onSelectChange={(value) => handleSettingToggle(value)}
                        ></ToggleSwitch>
                    </View>
                </View>}
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
                <View className="flex-1 justify-center pr-3 items-center">
                    <RNDateTimePicker themeVariant={'light'} maximumDate={new Date()} key={'when'} mode='datetime' display='default' value={date} onChange={(_, date) => setDate(new Date(date!))} />
                </View>
            </View>
        </Card>
    )
}

const HowMuch = (props: { selectedState: [number, React.Dispatch<React.SetStateAction<number>>] }) => {
    const [selected, setSelected] = props.selectedState;
    const [measureInMin, _] = useMMKVBoolean('settings-eatingMeasureInMin');

    return (
        <Card>
            <View className="min-w-80">
                <Subheader text='How Much?' subtext={measureInMin ? 'How many minutes did baby eat?' : 'How many mL did baby eat?'}></Subheader>
            </View>
            <View className="flex-1 align-middle justify-center">
                <PickerIOS
                    selectedValue={selected}
                    onValueChange={(value, _) => setSelected(value.valueOf() as number)}
                    themeVariant={'light'}
                >
                    <PickerIOS.Item label="0" value={0}></PickerIOS.Item>
                    <PickerIOS.Item label="5" value={5}></PickerIOS.Item>
                    <PickerIOS.Item label="10" value={10}></PickerIOS.Item>
                    <PickerIOS.Item label="15" value={15}></PickerIOS.Item>
                    <PickerIOS.Item label="20" value={20}></PickerIOS.Item>
                    <PickerIOS.Item label="25" value={25}></PickerIOS.Item>
                    <PickerIOS.Item label="30" value={30}></PickerIOS.Item>
                    <PickerIOS.Item label="35" value={35}></PickerIOS.Item>
                    <PickerIOS.Item label="40" value={40}></PickerIOS.Item>
                    <PickerIOS.Item label="45" value={45}></PickerIOS.Item>
                    <PickerIOS.Item label="50" value={50}></PickerIOS.Item>
                    <PickerIOS.Item label="55" value={55}></PickerIOS.Item>
                    <PickerIOS.Item label="60" value={60}></PickerIOS.Item>
                    <PickerIOS.Item label="65" value={65}></PickerIOS.Item>
                    <PickerIOS.Item label="70" value={70}></PickerIOS.Item>
                    <PickerIOS.Item label="75" value={75}></PickerIOS.Item>
                    <PickerIOS.Item label="80" value={80}></PickerIOS.Item>
                    <PickerIOS.Item label="85" value={85}></PickerIOS.Item>
                    <PickerIOS.Item label="90" value={90}></PickerIOS.Item>
                    <PickerIOS.Item label="95" value={95}></PickerIOS.Item>
                    <PickerIOS.Item label="100" value={100}></PickerIOS.Item>
                    <PickerIOS.Item label="105" value={105}></PickerIOS.Item>
                    <PickerIOS.Item label="110" value={110}></PickerIOS.Item>
                    <PickerIOS.Item label="115" value={115}></PickerIOS.Item>
                </PickerIOS>
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
                <TextInput onChangeText={(t) => setNote(t)} className="bg-slate-50 flex-1 rounded-lg p-3 max-w-80" verticalAlign="top" multiline></TextInput>
            </View>
        </Card>
    )
}