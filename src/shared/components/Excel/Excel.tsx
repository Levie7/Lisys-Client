import * as React from 'react';
import Workbook from 'react-excel-workbook';

import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';

interface ExcelProps {
    column: {
        label: string;
        value: string;
    }[];
    data: any;
    fileName: string;
    sheetName: string;
}

export const Excel = React.memo<ExcelProps>(({ column, data, fileName, sheetName }) => (
    <Workbook
        filename={fileName}
        element={
            <Button className='bg-green fg-white mr-2' type='default'>
                {Icon['excel']} Excel
            </Button>
        }
    >
        <Workbook.Sheet data={data} name={sheetName}>
            {column.map((column: { label: string; value: string }) => (
                <Workbook.Column key={column.label} label={column.label} value={column.value} />
            ))}
        </Workbook.Sheet>
    </Workbook>
));
