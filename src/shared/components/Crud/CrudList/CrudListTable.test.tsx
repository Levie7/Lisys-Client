import { mount } from 'enzyme';
import React from 'react';

import { CrudListTable, CrudListTableProps } from './CrudListTable';

describe('CrudListTable', () => {
    let wrap: any;
    const props: CrudListTableProps = {
        columns: [],
        dataSource: [{ key: '1', status: 'active' }],
        lang: 'en',
        hasStatus: true,
        handleDelete: jest.fn(),
        handleRecord: jest.fn(),
    };

    it('should render CrudListTable', () => {
        wrap = mount(<CrudListTable {...props} />);
        expect(wrap.find('Memo(CrudListTablePure)').exists()).toBeTruthy();
    });

    it('shoul render data with status active', () => {
        expect(wrap.find('Memo(StatusPure)').exists()).toBeTruthy();
    });
});
