import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import i18n from 'i18next';
import { useSetFieldFormValue } from '../../../hooks/useSetFieldFormValue';
import UrlModal from '../../../components/common/UrlModal';
import FileUpload from '../../../components/common/FileUpload';

const ImageProperty = ({ canvasRef, form, data }) => {
	const [imageLoadType, setImageLoadType] = useState(data?.imageLoadType || 'file');
	const [handleChange] = useSetFieldFormValue(form);

	const handleImageLoadType = e => {
		const { value } = e.target;
		setImageLoadType(value);
		handleChange(e);
	};

	if (!data) return null;

	return (
		<>
			<Form.Item
				name="imageLoadType"
				label={i18n.t('imagemap.image.image-load-type')}
				colon={false}
				initialValue={imageLoadType}
			>
				<Radio.Group name="imageLoadType" size="small" onChange={handleImageLoadType}>
					<Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
					<Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
				</Radio.Group>
			</Form.Item>
			{imageLoadType === 'file' ? (
				<Form.Item
					name="file"
					label={i18n.t('common.file')}
					colon={false}
					rules={[{ required: true }]}
					initialValue={data?.file}
					onChange={handleChange}
				>
					<FileUpload accept="image/*" />
				</Form.Item>
			) : (
				<Form.Item name="src" initialValue={data?.src} onChange={handleChange}>
					<UrlModal />
				</Form.Item>
			)}
		</>
	);
};

export default ImageProperty;
