import { FlatList, Text, View } from "react-native"
import { Header } from "../components/Header"
import { Screen } from "../components/Screen"
import { storage } from "../App"
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import { Event } from "../models/event";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {orderBy} from 'lodash';
import { PrimaryButton } from "../components/Button";

export const HistoryScreen = () => {
    const [keys, setKeys] = useState<string[]>([]);
    useFocusEffect(
        useCallback(()=>{
            const keys = storage.getAllKeys();
            setKeys(orderBy(keys.filter(x=>!x.startsWith('settings')), k=>k.split('-')[1], 'desc'));
        }, [])
    );
    return (
        <Screen>
            <Header text="History"></Header>
            <View className="flex-1 mt-3">
                <FlatList
                data={keys}
                ItemSeparatorComponent={()=>(<View className="mb-2"></View>)}
                renderItem={({item}) => <Row storageKey={item}/>}
                >

                </FlatList>
            </View>
            <View className="mb-3">
                <PrimaryButton text="Press and hold to clear" onLongPress={()=>{storage.clearAll()}}></PrimaryButton>
            </View>
        </Screen>
    )
}

const Row = (props:{storageKey:string}) => {
    const [rowData, _] = useMMKVObject<Event>(props.storageKey);    
    if (!rowData) return null;
    return (
        <View className="flex flex-row gap-2 overflow-hidden items-center border-blue border-b-hairline">
            <View>
                <Text className="text-base text-black">{moment(rowData.date).format('dd M/D')}</Text>
                <Text className="text-base text-black">{moment(rowData.date).format('hh:mm:a')}</Text>
            </View>
            <View className="flex flex-row justify-around flex-1">
                {rowData.type === 'eat' ? <View className="flex-row">
                    <Text className="text-lg text-black">🍼</Text>
                    {rowData.duration && <Text className="text-base text-black">{rowData.duration}m</Text>}
                    {rowData.mlConsumed && <Text className="text-base text-black">{rowData.mlConsumed}mL</Text>}
                </View> : <View></View>}
                {rowData.type === 'sleep' ? <View className="flex-row">
                    <Text className="text-lg text-black">💤</Text>
                    <Text className="text-base text-black">{rowData.duration}hr</Text>
                </View> : <View></View>}
                {rowData.type === 'poop' ? <View className="flex-row">
                    <Text className="text-lg text-black">💩</Text>
                    <Text className="text-base text-black">{rowData.wet && '1'}</Text>
                    {rowData.wet && rowData.poopy && <Text className="text-base text-black"> & </Text>}
                    <Text className="text-base text-black">{rowData.poopy && '2'}</Text>
                </View> : <View></View>}
            </View>
            <Text className="flex-shrink text-base w-28 text-black" ellipsizeMode="tail" numberOfLines={1}>{rowData.note}</Text>
        </View>
    )
}