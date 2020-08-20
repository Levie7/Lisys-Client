import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/app/shell/Page';

import { createAuthTokenStorage } from 'src/core/graphql/auth';

import { queryForm, queryList } from 'src/shared/graphql';
import { getAccessPermissionByRoleId } from 'src/shared/graphql/Permission/schema.gql';
import { getUserByUsername } from 'src/shared/graphql/User/schema.gql';
import { Notification } from 'src/shared/utilities/notification';

import { getLanguage } from '../SettingPage/helpers';
import { MasterStatistic } from './containers/MasterStatistic';
import { PurchasingGraph, SalesGraph } from './containers/DashboardGraph';
import { notification } from './constants';
import { Permission } from 'src/core/api';

export const HomePage = ({ history }: RouteComponentProps) => {
    let storage = createAuthTokenStorage();
    let auth = storage.getToken();
    let queryUser = queryForm({
        query: getUserByUsername,
        variables: { username: auth },
    });
    let queryPermission = queryList({
        skip: !queryUser.data,
        query: getAccessPermissionByRoleId,
        variables: { role_id: queryUser.data?.getUserByUsername.role.id },
    });

    if (queryUser.loading || queryPermission.loading) {
        return null;
    }

    let hasDashboardPermission = queryPermission.data?.getAccessPermissionByRoleId.find(
        (permission: Permission) =>
            permission.action!.name === 'Access' &&
            permission.menu!.key === 'Dashboard' &&
            permission.status === 'active'
    );

    if (!hasDashboardPermission) {
        history.replace('/sales');

        return null;
    }

    let lang = getLanguage();
    let gretting = localStorage.getItem('greeting');
    if (gretting !== 'greet') {
        Notification({
            description: notification.description[lang],
            title: notification.title[lang],
            type: 'login',
        });
        localStorage.setItem('greeting', 'greet');
    }

    return (
        <Page>
            <MasterStatistic lang={lang} />
            <SalesGraph lang={lang} />
            <PurchasingGraph lang={lang} />
        </Page>
    );
};
