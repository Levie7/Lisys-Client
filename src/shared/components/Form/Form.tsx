// import { Form as AntForm } from 'antd';
// import * as React from 'react';

// import { WrappedFormUtils } from './interfaces';
// import { FormItem } from './FormItem';

// export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
//     form?: WrappedFormUtils;
//     onFinish?: (values: Store) => void;
//     onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
// }

// export class Form extends React.PureComponent<FormProps> {
//     static create: any;
//     static Item: typeof FormItem;

//     render() {
//         let { children, onFinish, onSubmit, ...props } = this.props;

//         return (
//             <AntForm onFinish={onFinish} {...props}>
//                 {children}
//             </AntForm>
//         );
//     }
// }
// Form.Item = AntForm.Item;
// Form.create = AntForm.create;
export {};
