import * as React from 'react';

import { InfoSetting } from 'src/modules/components/Settings/InfoSetting/InfoSetting';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Button } from 'src/shared/components/Button';
import { Form } from 'src/shared/components/Form';
import { Input } from 'src/shared/components/Input';
import { Upload } from 'src/shared/components/Upload';
import { UIContext } from 'src/shared/contexts/UIContext';

import { companyInfo } from './constants';

export class Company extends React.Component<{}> {
    render() {
        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                    <Breadcrumb.Item>Company</Breadcrumb.Item>
                </Breadcrumb>
                <Form>
                    <InfoSetting
                        description={companyInfo.companyInformation.description}
                        title={companyInfo.companyInformation.title}
                    >
                        <Form.Item label='Company Name'>
                            <Input placeholder='PT. Lisys' id='name' />
                        </Form.Item>
                        <Form.Item
                            extra='Year the company was founded until now'
                            label='Company Year'
                        >
                            <Input id='year' />
                        </Form.Item>
                    </InfoSetting>
                    <InfoSetting
                        description={companyInfo.companyLogo.description}
                        title={companyInfo.companyLogo.title}
                    >
                        <Form.Item label='Company Logo'>
                            <Upload name='company_logo' listType='picture-card' />
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
