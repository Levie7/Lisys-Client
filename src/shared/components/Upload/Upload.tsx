import { Upload as AntUpload } from 'antd';
import * as React from 'react';

import { Icon } from 'src/shared/components/Icon';
import { Picture } from 'src/shared/components/Picture';
import { classNames } from 'src/shared/utilities/classNames';
import { Message } from 'src/shared/utilities/message';

export type ListTypes = 'picture' | 'text' | 'picture-card';

interface UploadProps {
    className?: string;
    name: string;
    listType?: ListTypes;
}

interface UploadState {
    imageUrl?: string;
    loading: boolean;
}

export class Upload extends React.Component<UploadProps, UploadState> {
    constructor(props: UploadProps) {
        super(props);
        this.state = { loading: false };

        this.getBase64 = this.getBase64.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }

    private beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            Message('You can only upload JPG/PNG file!', 'error');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            Message('Image must smaller than 2MB!', 'error');
        }

        return isJpgOrPng && isLt2M;
    }

    private getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    private handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, (imageUrl: string) =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
            );
        }
    };

    render() {
        let { imageUrl, loading } = this.state;
        let { className, listType, name } = this.props;

        let uploadButton = (
            <>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>Upload</div>
            </>
        );

        return (
            <AntUpload
                name={name}
                listType={listType}
                className={classNames('avatar-uploader', className)}
                showUploadList={false}
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <Picture alt={name} src={imageUrl} /> : uploadButton}
            </AntUpload>
        );
    }
}
