import { mount } from 'enzyme';
import React from 'react';

import { CrudDrawer } from './CrudDrawer';

describe('CrudDrawer', () => {
    let wrap: any;
    let props = {
        customContent: jest.fn(),
        data: {
            barcode: '123',
            buy_price: '123',
            category: {
                id: 'id1',
                name: 'category1',
            },
            code: 'code1',
            id: 'id1',
            min_stock: '1',
            name: 'name1',
            sell_price: '123',
            status: 'active',
            stock: '1',
            uom: {
                id: 'id1',
                name: 'uom1',
            },
            variant: {
                id: 'id1',
                name: 'variant1',
            },
        },
        loading: false,
        module: 'Master',
        visible: true,
        title: { en: 'Medicine', id: 'Obat' },
        handleClose: jest.fn(),
    };
    it('should render CrudDrawer', () => {
        wrap = mount(<CrudDrawer {...props} />);
        expect(wrap.find('Memo(CrudDrawerPure)').exists()).toBeTruthy();
    });

    describe('when render module except Master', () => {
        beforeEach(() => {
            props = { ...props, module: 'Purchasing' };
            wrap = mount(<CrudDrawer {...props} />);
        });

        it('should render Drawer with 1000 width', () => {
            expect(wrap.find('Memo()').props().width).toEqual(1000);
        });
    });
});
