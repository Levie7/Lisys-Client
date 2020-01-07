interface REACT_STATICS {
    childContextTypes: true;
    contextType: true;
    contextTypes: true;
    defaultProps: true;
    displayName: true;
    getDefaultProps: true;
    getDerivedStateFromError: true;
    getDerivedStateFromProps: true;
    mixins: true;
    propTypes: true;
    type: true;
}

interface KNOWN_STATICS {
    name: true;
    length: true;
    prototype: true;
    caller: true;
    callee: true;
    arguments: true;
    arity: true;
}

interface MEMO_STATICS {
    $$typeof: true;
    compare: true;
    defaultProps: true;
    displayName: true;
    propTypes: true;
    type: true;
}

interface FORWARD_REF_STATICS {
    $$typeof: true;
    render: true;
    defaultProps: true;
    displayName: true;
    propTypes: true;
}

declare type NonReactStatics<
    S extends React.ComponentType<any>,
    C extends {
        [key: string]: true;
    } = {}
> = {
    [key in Exclude<
        keyof S,
        S extends React.MemoExoticComponent<any>
            ? keyof MEMO_STATICS | keyof C
            : S extends React.ForwardRefExoticComponent<any>
            ? keyof FORWARD_REF_STATICS | keyof C
            : keyof REACT_STATICS | keyof KNOWN_STATICS | keyof C
    >]: S[key];
};

export declare type Matching<InjectedProps, DecorationTargetProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
        ? InjectedProps[P] extends DecorationTargetProps[P]
            ? DecorationTargetProps[P]
            : InjectedProps[P]
        : DecorationTargetProps[P];
};

export declare type GetProps<C> = C extends React.ComponentType<infer P> ? P : never;

export declare type ConnectedComponentClass<
    C extends React.ComponentType<any>,
    P
> = React.ComponentClass<JSX.LibraryManagedAttributes<C, P>> &
    NonReactStatics<C> & {
        WrappedComponent: C;
    };

export declare type FormWrappedProps<TOwnProps extends WrappedFormInternalProps> = <
    C extends React.ComponentType<Matching<TOwnProps, GetProps<C>>>
>(
    component: C
) => ConnectedComponentClass<C, Omit<TOwnProps, keyof WrappedFormInternalProps>>;

declare type FormCreateOptionMessagesCallback = (...args: any[]) => string;

interface FormCreateOptionMessages {
    [messageId: string]: string | FormCreateOptionMessagesCallback | FormCreateOptionMessages;
}

export interface FormCreateOption<T> {
    name?: string;
    validateMessages?: FormCreateOptionMessages;
    withRef?: boolean;

    onFieldsChange?: (props: T, fields: any, allFields: any) => void;
    onValuesChange?: (props: T, changedValues: any, allValues: any) => void;
    mapPropsToFields?: (props: T) => void;
}

export declare type ValidationRule = {
    enum?: string | string[];
    len?: number;
    max?: number;
    message?: React.ReactNode;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    type?: string;
    whitespace?: boolean;

    transform?: (value: any) => any;
    validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
};
export declare type ValidateCallback<V> = (errors: any, values: V) => void;

export declare type GetFieldDecoratorOptions = {
    exclusive?: boolean;
    initialValue?: any;
    preserve?: boolean;
    rules?: ValidationRule[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;

    getValueFromEvent?: (...args: any[]) => any;
    getValueProps?: (value: any) => any;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
};

export declare type DomScrollIntoViewConfig = {
    alignWithLeft?: boolean;
    alignWithTop?: boolean;
    allowHorizontalScroll?: boolean;
    offsetBottom?: number;
    offsetLeft?: number;
    offsetRight?: number;
    offsetTop?: number;
    onlyScrollIfNeeded?: boolean;
};
export declare type ValidateFieldsOptions = {
    first?: boolean;
    firstFields?: string[];
    force?: boolean;
    scroll?: DomScrollIntoViewConfig;
};
export declare type WrappedFormUtils<V = any> = {
    getFieldsValue(
        fieldNames?: Array<string>
    ): {
        [field: string]: any;
    };
    getFieldValue(fieldName: string): any;

    setFieldsValue(obj: Object, callback?: Function): void;

    setFields(obj: Object): void;

    validateFields(
        fieldNames: Array<string>,
        options: ValidateFieldsOptions,
        callback: ValidateCallback<V>
    ): void;
    validateFields(options: ValidateFieldsOptions, callback: ValidateCallback<V>): void;
    validateFields(fieldNames: Array<string>, callback: ValidateCallback<V>): void;
    validateFields(fieldNames: Array<string>, options: ValidateFieldsOptions): void;
    validateFields(fieldNames: Array<string>): void;
    validateFields(callback: ValidateCallback<V>): void;
    validateFields(options: ValidateFieldsOptions): void;
    validateFields(): void;

    validateFieldsAndScroll(
        fieldNames: Array<string>,
        options: ValidateFieldsOptions,
        callback: ValidateCallback<V>
    ): void;
    validateFieldsAndScroll(options: ValidateFieldsOptions, callback: ValidateCallback<V>): void;
    validateFieldsAndScroll(fieldNames: Array<string>, callback: ValidateCallback<V>): void;
    validateFieldsAndScroll(fieldNames: Array<string>, options: ValidateFieldsOptions): void;
    validateFieldsAndScroll(fieldNames: Array<string>): void;
    validateFieldsAndScroll(callback: ValidateCallback<V>): void;
    validateFieldsAndScroll(options: ValidateFieldsOptions): void;
    validateFieldsAndScroll(): void;

    getFieldError(name: string): string[] | undefined;
    getFieldsError(names?: Array<string>): Record<string, string[] | undefined>;

    isFieldValidating(name: string): boolean;
    isFieldTouched(name: string): boolean;
    isFieldsTouched(names?: Array<string>): boolean;

    resetFields(names?: Array<string>): void;
    getFieldDecorator<T extends Object = {}>(
        id: keyof T,
        options?: GetFieldDecoratorOptions
    ): (node: React.ReactNode) => React.ReactNode;
};

export interface FormComponentProps<V = any> extends WrappedFormInternalProps<V>, RcBaseFormProps {
    form: WrappedFormUtils<V>;
}

export interface WrappedFormInternalProps<V = any> {
    form: WrappedFormUtils<V>;
}

export interface RcBaseFormProps {
    wrappedComponentRef?: any;
}
