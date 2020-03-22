import {
    DashboardOutlined,
    DeleteOutlined,
    EditOutlined,
    GlobalOutlined,
    HddOutlined,
    LeftOutlined,
    LoadingOutlined,
    LockOutlined,
    MedicineBoxOutlined,
    PlusOutlined,
    SettingOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as React from 'react';

interface Icons {
    [key: string]: JSX.Element;
}

export const Icon: Icons = {
    back: <LeftOutlined />,
    dashboard: <DashboardOutlined />,
    delete: <DeleteOutlined />,
    edit: <EditOutlined />,
    global: <GlobalOutlined />,
    hdd: <HddOutlined />,
    loading: <LoadingOutlined />,
    lock: <LockOutlined />,
    medicine_box: <MedicineBoxOutlined />,
    plus: <PlusOutlined />,
    setting: <SettingOutlined />,
    shop: <ShopOutlined />,
    user: <UserOutlined />,
};
