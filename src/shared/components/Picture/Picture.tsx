import * as React from 'react';

import { Ratio, RatioBox } from 'src/shared/components/RatioBox';
import { classNames } from 'src/shared/utilities/classNames';

interface PictureProps
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    alt: string;
    imgClassName?: string;
    objectFit?: '' | 'contain' | 'scale-down' | 'cover';
    ratio?: Ratio;
    stretch?: 'none' | 'width' | 'container';
}

require('./Picture.sass');
export class Picture extends React.Component<PictureProps> {
    render() {
        let {
            alt,
            className,
            imgClassName,
            objectFit,
            ratio,
            src,
            stretch = 'none',
            title,
            ...props
        } = this.props;

        let pictureVariant = {
            Picture_Contained: stretch === 'container',
            Picture_Wide: stretch === 'width',
        };

        let pictureObjectFitStyle = {
            Picture_Contain: objectFit === 'contain',
            Picture_Cover: objectFit === 'cover',
            'Picture_Scale-Down': objectFit === 'scale-down',
        };

        return (
            <RatioBox
                className={classNames('Picture', pictureObjectFitStyle, pictureVariant, className)}
                ratio={ratio}
            >
                <img alt={alt} className={imgClassName} src={src} title={title || alt} {...props} />
            </RatioBox>
        );
    }
}
