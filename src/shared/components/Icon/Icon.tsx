import {
    AuditOutlined,
    ClusterOutlined,
    DashboardOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    GlobalOutlined,
    GoldOutlined,
    HddOutlined,
    LeftOutlined,
    LoadingOutlined,
    LockOutlined,
    MedicineBoxOutlined,
    PartitionOutlined,
    PlusOutlined,
    SearchOutlined,
    SettingOutlined,
    ShopOutlined,
    SmileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as React from 'react';

interface Icons {
    [key: string]: JSX.Element;
}

export const Icon: Icons = {
    action: <DownOutlined />,
    back: <LeftOutlined />,
    category: <ClusterOutlined />,
    dashboard: <DashboardOutlined />,
    delete: <DeleteOutlined />,
    edit: <EditOutlined />,
    global: <GlobalOutlined />,
    hdd: <HddOutlined />,
    loading: <LoadingOutlined />,
    lock: <LockOutlined />,
    medicine_box: <MedicineBoxOutlined />,
    plus: <PlusOutlined />,
    search: <SearchOutlined />,
    setting: <SettingOutlined />,
    shop: <ShopOutlined />,
    smile: <SmileOutlined style={{ color: '#108ee9' }} />,
    supplier: <AuditOutlined />,
    uom: <GoldOutlined />,
    user: <UserOutlined />,
    variant: <PartitionOutlined />,
};
