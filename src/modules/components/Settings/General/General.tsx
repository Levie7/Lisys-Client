import * as React from 'react';

import { InfoSetting } from 'src/modules/components/Settings/InfoSetting/InfoSetting';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Button } from 'src/shared/components/Button';
import { Form } from 'src/shared/components/Form';
import { Select } from 'src/shared/components/Select';
import { UIContext } from 'src/shared/contexts/UIContext';

import { generalInfo } from './constants';

export class General extends React.Component<{}> {
    render() {
        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                    <Breadcrumb.Item>General</Breadcrumb.Item>
                </Breadcrumb>
                <Form>
                    <InfoSetting
                        description={generalInfo.dateTime.description}
                        title={generalInfo.dateTime.title}
                    >
                        <Form.Item label='Date Format'>
                            <Select>
                                <Select.Option value='ddmmyy'>dd/mm/yyy</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='Time Format'>
                            <Select>
                                <Select.Option value='His'>Hour:Minute:Second</Select.Option>
                                <Select.Option value='is'>Minute:Second</Select.Option>
                            </Select>
                        </Form.Item>
                    </InfoSetting>
                    <InfoSetting
                        description={generalInfo.language.description}
                        title={generalInfo.language.title}
                    >
                        <Form.Item label={generalInfo.language.title}>
                            <Select defaultValue='english'>
                                <Select.Option value='english'>English</Select.Option>
                                <Select.Option value='indonesia'>Indonesia</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <UIContext.Consumer>
                                {({ isMobile }) => (
                                    <Button className={isMobile ? 'w-100' : ''} type='primary'>
                                        Save
                                    </Button>
                                )}
                            </UIContext.Consumer>
                        </Form.Item>
                    </InfoSetting>
                </Form>
            </>
        );
    }
}
