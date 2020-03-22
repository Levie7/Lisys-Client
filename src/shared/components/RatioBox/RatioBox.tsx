import * as React from 'react';

import { classNames } from 'src/shared/utilities/classNames';

import { RATIO_CLASSES } from './constants';

export type Ratio = keyof typeof RATIO_CLASSES;

interface RatioBoxProps extends React.HTMLProps<HTMLDivElement> {
    ratio?: Ratio;
}

require('./RatioBox.sass');

export const RatioBox = React.memo<RatioBoxProps>(({ ratio, className, ...props }) => {
    className = classNames('position-relative', ratio && RATIO_CLASSES[ratio], className);

    return <div {...props} className={className} />;
});
