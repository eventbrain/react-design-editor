import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const FileUpload = ({ onChange, limit, accept, value }) => {
	const [state, setState] = useState({
		fileList: value ? [value] : [],
	});

	const { fileList } = state;
	const props = {
		accept,
		name: 'file',
		multiple: false,
		onChange: info => {
			const isLimit = info.file.size / 1024 / 1024 < limit;
			if (!isLimit) {
				message.error(`Limited to ${limit}MB or less`);
				return false;
			}
			onChange(info.file);
		},
		onRemove: file => {
			setState(({ fileList }) => {
				const index = fileList.indexOf(file);
				const newFileList = fileList.slice();
				newFileList.splice(index, 1);
				onChange(null);
				return { fileList: newFileList };
			});
		},
		beforeUpload: file => {
			const isLimit = file.size / 1024 / 1024 < limit;
			if (!isLimit) return false;
			setState({
				fileList: [file],
			});
			return false;
		},
		fileList,
	};

	return (
		<Dragger {...props}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
			<p className="ant-upload-hint">{`Support for a single upload. Limited to ${limit}MB or less`}</p>
		</Dragger>
	);
};

FileUpload.propTypes = {
	onChange: PropTypes.func,
	limit: PropTypes.number,
	accept: PropTypes.string,
};

FileUpload.defaultProps = {
	limit: 5,
};

export default FileUpload;
