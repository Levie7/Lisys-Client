import * as React from 'react';

import { SettingCompany } from 'src/core/api';

import { InfoSetting } from 'src/modules/components/Settings/InfoSetting/InfoSetting';

import { Breadcrumb } from 'src/shared/components/Breadcrumb';
import { Button } from 'src/shared/components/Button';
import { Form } from 'src/shared/components/Form';
import { Input } from 'src/shared/components/Input';
import { Spin } from 'src/shared/components/Spin';
import { Upload } from 'src/shared/components/Upload';
import { UIContext } from 'src/shared/contexts/UIContext';
import { Errors } from 'src/shared/utilities/errors';
import { Message } from 'src/shared/utilities/message';
import { Progress } from 'src/shared/utilities/progress';

import { companyInfo } from './constants';
import { convertArrayOfObjectsToObject } from './helpers';
import { COMPANIES, useCompany, useUpdateCompany } from './schema.gql';

function Company(props: any) {
    const { data, error: queryError, loading: queryLoading } = useCompany();
    const [updateSetting, { error: mutationError, loading: mutationLoading }] = useUpdateCompany({
        onCompleted() {
            Progress(false);
            return <>{Message('Update data successfully', 'success')}</>;
        },
    });

    if (queryLoading || mutationLoading) return <Spin />;
    if (queryError || mutationError) return Errors(queryError! || mutationError!);

    function handleSubmit(e: any) {
        e.preventDefault();
        let { form } = props;

        form.validateFields((err: any, values: any) => {
            if (!err) {
                let { company_name, company_year } = values;

                Progress(true);
                updateSetting({
                    refetchQueries: [{ query: COMPANIES }],
                    variables: {
                        payload: [
                            { category: 'company', type: 'name', value: company_name },
                            { category: 'company', type: 'year', value: company_year },
                        ],
                    },
                });
            }
        });
    }

    function renderContent() {
        let { getFieldDecorator } = props.form;

        return (
            <Form onSubmit={handleSubmit}>
                <InfoSetting
                    description={companyInfo.companyInformation.description}
                    title={companyInfo.companyInformation.title}
                >
                    <Form.Item label='Company Name'>
                        {getFieldDecorator('company_name', {
                            initialValue: company.name,
                            rules: [{ required: true, message: 'Please set the company name' }],
                        })(<Input placeholder='PT. Lisys' />)}
                    </Form.Item>
                    <Form.Item extra='Year the company was founded until now' label='Company Year'>
                        {getFieldDecorator('company_year', {
                            initialValue: company.year,
                            rules: [{ required: true, message: 'Please set the company year' }],
                        })(<Input placeholder='2019' />)}
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
                                <Button
                                    className={isMobile ? 'w-100' : ''}
                                    htmlType='submit'
                                    type='primary'
                                >
                                    Save
                                </Button>
                            )}
                        </UIContext.Consumer>
                    </Form.Item>
                </InfoSetting>
            </Form>
        );
    }

    let company = convertArrayOfObjectsToObject(data?.getSettingsByCategory) as SettingCompany;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href='/settings'>Settings</Breadcrumb.Item>
                <Breadcrumb.Item>Company</Breadcrumb.Item>
            </Breadcrumb>
            {company ? (
                renderContent()
            ) : (
                <>{Message('Error - Failed to load data source', 'error')}</>
            )}
        </>
    );
}

export default Form.create({ name: 'companyForm' })(Company);
