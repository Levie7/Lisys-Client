import * as React from 'react';
import { Form } from 'antd';

import { Info } from 'src/shared/components/Info';
import { Input, InputArea } from 'src/shared/components/Input';
import { SaveButton } from 'src/shared/components/SaveButton';
import { Spin } from 'src/shared/components/Spin';
import {
    CATEGORIES,
    CATEGORY_BY_ID,
    createCategory,
    getCategoryById,
    updateCategory,
} from 'src/shared/graphql/Category/schema.gql';
import { mutationForm } from 'src/shared/graphql/mutationForm';
import { ErrorHandler } from 'src/shared/utilities/errors';
import { Progress } from 'src/shared/utilities/progress';

interface CategoryFormProps {
    formType: string;
    recordKey?: string;
}

export function CategoryForm({ formType, recordKey }: CategoryFormProps) {
    let [form] = Form.useForm();

    let mutation = mutationForm(formType, formType === 'create' ? createCategory : updateCategory);
    let query = handleQuery(
        { isSkip: formType === 'create' ? true : false, variables: { id: recordKey } },
        getCategoryById
    );
    if (mutation.loading || query.loading) return <Spin />;

    let initialValues = {
        name: query.data?.getCategoryById.name,
        description: query.data?.getCategoryById.description,
    };

    function handleFinish(values: any) {
        Progress(true);

        let { name, description = '' } = values;
        let fetchQuery;
        let payload = {
            id: recordKey,
            name,
            description,
        };

        switch (formType) {
            case 'create':
                fetchQuery = [{ query: CATEGORIES }];
                form.resetFields(['name', 'description']);
                break;
            case 'update':
                fetchQuery = [
                    { query: CATEGORIES },
                    { query: CATEGORY_BY_ID, variables: { id: recordKey } },
                ];
                break;
            default:
                break;
        }

        mutation.action({
            refetchQueries: fetchQuery,
            variables: {
                payload,
            },
        });
    }

    function handleQuery(options: any, queries: any) {
        let { data, loading } = queries({
            onError(error: any) {
                ErrorHandler(error);
            },
            skip: options && options.isSkip,
            variables: options && options.variables,
        });

        return {
            data,
            loading,
        };
    }

    return (
        <Form form={form} initialValues={initialValues} layout='vertical' onFinish={handleFinish}>
            <Info
                description='General fields to create or update category data'
                title='General Information'
            >
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{ required: true, message: 'Please input the name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label='Description' name='description'>
                    <InputArea />
                </Form.Item>
                <Form.Item>
                    <SaveButton />
                </Form.Item>
            </Info>
        </Form>
    );
}
