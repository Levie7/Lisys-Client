export declare type RowSelectionType = 'checkbox' | 'radio';
export declare type SelectionItemSelectFn = (key: string[]) => void;
export declare type SelectionSelectFn<T> = (
    record: T,
    selected: boolean,
    selectedRows: Object[],
    nativeEvent: Event
) => void;
export declare type TableSelectWay =
    | 'onSelect'
    | 'onSelectMultiple'
    | 'onSelectAll'
    | 'onSelectInvert';

export interface SelectionItem {
    key: string;
    text: React.ReactNode;
    onSelect?: SelectionItemSelectFn;
}

export interface TableRowSelection<T> {
    type?: RowSelectionType;
    selectedRowKeys?: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => Object;
    onSelect?: SelectionSelectFn<T>;
    onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    onSelectInvert?: (selectedRowKeys: string[] | number[]) => void;
    selections?: SelectionItem[] | boolean;
    hideDefaultSelections?: boolean;
    fixed?: boolean;
    columnWidth?: string | number;
    selectWay?: TableSelectWay;
    columnTitle?: string | React.ReactNode;
}
