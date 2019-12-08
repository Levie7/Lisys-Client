import * as React from 'react';

import { Divider } from 'src/shared/components/Divider';
import { Form } from 'src/shared/components/Form';
import { Input } from 'src/shared/components/Input';
import { Upload } from 'src/shared/components/Upload';

import { formItemLayout } from '../constants';
import { ActionSetting } from './ActionSetting';

export class CompanySetting extends React.Component<{}> {
    render() {
        return (
            <>
                <Divider orientation='left'>Company Information</Divider>
                <Form {...formItemLayout}>
                    <Form.Item label='Company Name'>
                        <Input placeholder='PT. Lisys' id='name' />
                    </Form.Item>
                    <Form.Item label='Company Year'>
                        <Input placeholder='2019' id='year' />
                    </Form.Item>
                    <Form.Item label='Company Logo'>
                        <Upload name='company_logo' listType='picture-card' />
                    </Form.Item>
                    <Divider />
                    <ActionSetting />
                </Form>
            </>
        );
    }
}
