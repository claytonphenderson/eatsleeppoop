import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Alert } from 'react-native';

export const setReminderNotification = async (options: { date: Date, message: string }) => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus < 1) {
        Alert.alert('Permission Not Granted',
            'You can not set a reminder unless notification permissions are enabled'
        );
        return;
    }

    try {
        await notifee.createTriggerNotification({
            id: 'reminder',
            title: 'Your scheduled reminder',
            body: options.message,
            ios: {
                sound: 'default'
            }
        }, {
            type: TriggerType.TIMESTAMP,
            timestamp: options.date.getTime()
        });

    } catch (error) {
        Alert.alert('Reminder Not Scheduled',
            'Sorry, we could not set this reminder for you.'
        );
        console.error(error);
    }
}