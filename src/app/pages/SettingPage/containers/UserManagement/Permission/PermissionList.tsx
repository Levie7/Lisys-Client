/* eslint-disable array-callback-return */
import React from 'react';

import { Column, Menu, Permission } from 'src/core/api';

import { Spin } from 'src/shared/components/Spin';
import { CrudListTable } from 'src/shared/components/Crud/CrudList/CrudListTable';
import { Select } from 'src/shared/components/Select';
import { Switch } from 'src/shared/components/Switch';
import { useUIContext } from 'src/shared/contexts/UIContext';
import { mutationForm, queryForm } from 'src/shared/graphql';
import { getMenus } from 'src/shared/graphql/Menu/schema.gql';
import {
    getActions,
    getPermissionsByRoleId,
    PERMISSIONS,
    updatePermission,
} from 'src/shared/graphql/Permission/schema.gql';
import { classNames } from 'src/shared/utilities/classNames';

import { getRoles } from '../Role/schema.gql';

export function PermissionList() {
    let isMobile = useUIContext().isMobile;
    let [role, setRole] = React.useState('');
    let queryDataList = queryForm({
        skip: role === '',
        query: getPermissionsByRoleId,
        variables: { role_id: role },
    });
    let actionQuery = queryForm({ query: getActions });
    let roleQuery = queryForm({ query: getRoles });
    let menuQuery = queryForm({ query: getMenus });
    let mutation = mutationForm({ formType: 'update', mutations: updatePermission });

    if (roleQuery.loading || actionQuery.loading || menuQuery.loading) return <Spin />;

    let roles = roleQuery.data?.getRoles;
    let actions = actionQuery.data?.getActions;
    let menus = menuQuery.data?.getMenus;

    let permission = !queryDataList.loading ? handleData(queryDataList.data) : [];
    let permissionColumn: Column[] = [
        {
            dataIndex: 'menu',
            key: 'menu',
            title: 'Menu',
        },
    ];
    actions &&
        actions.map((action: any) =>
            permissionColumn.push({
                dataIndex: action.name,
                key: action.name,
                title: action.name,
            })
        );

    function handleChangePermission(value: boolean, id: string) {
        let ids = id.split('-');

        mutation.action({
            refetchQueries: [{ variables: { role_id: role }, query: PERMISSIONS }],
            variables: {
                payload: {
                    action: ids[0],
                    menu: ids[1],
                    role: ids[2],
                    status: value ? 'active' : 'inactive',
                },
            },
        });
    }

    function handleData(data?: any) {
        let permissionData = data?.getPermissionsByRoleId;
        if (!permissionData || !permissionData.length) {
            return [];
        }

        let menuData: any[] = [];
        menus.map((menu: Menu) => {
            let defaultData: any = {
                key: menu.name,
                menu: menu.name,
            };

            if (menu.children?.length) {
                menu.children.map((childMenu) => {
                    let defaultChildData: any = {
                        key: childMenu.name,
                        menu: childMenu.name,
                    };

                    actions.map((action: any) => {
                        let currentPermission = permissionData.find(
                            (permission: Permission) =>
                                permission.action!.name === action.name &&
                                permission.menu!.name === childMenu.name
                        );
                        let id = action.id + '-' + childMenu.id + '-' + role;
                        defaultChildData[action.name] = (
                            <Switch
                                defaultChecked={currentPermission.status === 'active'}
                                key={id}
                                handleChange={(value) => handleChangePermission(value, id)}
                            />
                        );
                    });

                    menuData.push(defaultChildData);
                });
            }

            actions.map((action: any) => {
                let currentPermission = permissionData.find(
                    (permission: Permission) =>
                        permission.action!.name === action.name &&
                        permission.menu!.name === menu.name
                );
                let id = action.id + '-' + menu.id + '-' + role;
                defaultData[action.name] = (
                    <Switch
                        defaultChecked={currentPermission.status === 'active'}
                        key={id}
                        handleChange={(value) => handleChangePermission(value, id)}
                    />
                );
            });
            menuData.push(defaultData);
        });

        return menuData;
    }

    function handleRole(value?: string) {
        setRole(value || '');
    }

    function renderCustomFilter() {
        return (
            <div className={classNames('d-flex w-25 mb-4', isMobile ? 'w-100' : '')}>
                <Select
                    allowClear
                    className='ml-4 w-100'
                    onChange={handleRole}
                    placeholder='Role'
                    showSearch
                >
                    {roles &&
                        roles.map((role: any) => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name}
                            </Select.Option>
                        ))}
                </Select>
            </div>
        );
    }

    return (
        <>
            {renderCustomFilter()}
            <CrudListTable
                columns={permissionColumn}
                dataSource={permission}
                loading={queryDataList.loading}
                pagination={false}
            />
        </>
    );
}
