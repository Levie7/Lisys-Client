import { notification as AntNotification } from 'antd';

import { Icon } from '../components/Icon';

export function Notification({
    description,
    title,
    type,
}: {
    description: string;
    title: string;
    type: string;
}) {
    switch (type) {
        case 'login':
            return AntNotification.open({
                message: title,
                description,
                icon: Icon['smile'],
            });
    }
}
