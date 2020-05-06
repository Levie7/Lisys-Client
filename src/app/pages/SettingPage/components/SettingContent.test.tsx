import { shallow } from 'enzyme';
import React from 'react';

import { SettingContent } from './SettingContent';

describe('SettingContent', () => {
    let props = {
        category: 'company',
        isDefault: true,
        title: 'title',
    };
    let wrap = shallow(<SettingContent {...props} />);

    it('should render setting content component', () => {
        expect(wrap.find('#SettingContent').exists()).toBeTruthy();
    });

    describe('when is not Default', () => {
        beforeEach(() => {
            props = {
                category: 'category',
                isDefault: false,
                title: 'title',
            };
            wrap.setProps(props);
        });

        it('should render setting content header component', () => {
            expect(wrap.find('UserManagement').exists()).toBeTruthy();
        });
    });

    describe('when is Default', () => {
        beforeEach(() => {
            props = {
                category: 'category',
                isDefault: true,
                title: 'title',
            };
            wrap.setProps(props);
        });

        it('should render setting content header component', () => {
            expect(wrap.find('Memo(SettingContentHeaderPure)').exists()).toBeTruthy();
        });

        describe('when category is company', () => {
            beforeEach(() => {
                props = {
                    category: 'company',
                    isDefault: true,
                    title: 'title',
                };
                wrap.setProps(props);
            });

            it('should render setting content with company form', () => {
                expect(wrap.find('CompanyForm').exists()).toBeTruthy();
            });
        });

        describe('when category is general', () => {
            beforeEach(() => {
                props = {
                    category: 'general',
                    isDefault: true,
                    title: 'title',
                };
                wrap.setProps(props);
            });

            it('should render setting content with general form', () => {
                expect(wrap.find('GeneralForm').exists()).toBeTruthy();
            });
        });
    });
});
