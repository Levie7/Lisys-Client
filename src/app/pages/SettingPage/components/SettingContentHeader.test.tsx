import { mount } from 'enzyme';
import React from 'react';

import { Crud } from 'src/core/graphql/types';

import { SettingContentHeader } from './SettingContentHeader';

describe('SettingContentHeader', () => {
    const props: {
        crud: Crud;
        title: string;
    } = {
        crud: {
            section: 'role',
            action: 'list',
        },
        title: 'title',
    };
    const wrap = mount(<SettingContentHeader crud={props.crud} title={props.title} />);

    it('should render setting content header component', () => {
        expect(wrap.find('Breadcrumb').exists()).toBeTruthy();
        expect(wrap.find('BreadcrumbItem').exists()).toBeTruthy();
    });

    describe('when crud is defined and section is not main and action is not back', () => {
        it('should render breadcrumb section and action', () => {
            expect(wrap.props().crud.section).not.toBe('main');
            expect(wrap.props().crud.action).not.toBe('back');
            expect(
                wrap.containsAnyMatchingElements([<span>List</span>, <span>Role</span>])
            ).toBeTruthy();
        });
    });

    describe('when crud is defined and section is main and action is back', () => {
        beforeEach(() => {
            wrap.setProps({ crud: { section: 'main', action: 'back' }, title: 'title' });
        });

        it('should not render breadcrumb section and action', () => {
            expect(wrap.props().crud.section).toBe('main');
            expect(wrap.props().crud.action).toBe('back');
            expect(
                wrap.containsAnyMatchingElements([<span>List</span>, <span>Role</span>])
            ).toBeFalsy();
        });
    });
});
