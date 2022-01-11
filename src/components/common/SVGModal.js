import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio } from 'antd';
import i18n from 'i18next';

import { InputHtml } from '.';
import FileUpload from './FileUpload';

const SVGModal = React.memo(
	({ onOk, onCancel, visible }) => {
		const [state, setState] = useState({
			loadType: 'file',
			isVisible: false,
		});
		const [form] = Form.useForm();
		//TODO: Revisar todo esto
		const handleChangeSvgType = e => {
			setState({
				...state,
				loadType: e.target.value,
			});
			// this.props.form.resetFields();
			// this.setState({
			// 	loadType: e.target.value,
			// });
		};

		const handleOk = () => {
			// const { form, onOk } = this.props;
			// form.validateFields((err, values) => {
			// 	if (err) {
			// 		return;
			// 	}
			// 	if (values.svg instanceof Blob) {
			// 		const reader = new FileReader();
			// 		reader.readAsDataURL(values.svg);
			// 		reader.onload = () => {
			// 			onOk({ ...values, svg: reader.result });
			// 		};
			// 	} else {
			// 		onOk(values);
			// 	}
			// });
		};

		const handleCancel = () => {
			if (onCancel) {
				onCancel();
				return;
			}
			setState({
				...state,
				isVisible: false,
			});
		};
		const { loadType, isVisible } = state;

		return (
			<Modal
				title={i18n.t('imagemap.svg.add-svg')}
				closable
				onCancel={this.handleCancel}
				onOk={this.handleOk}
				visible={visible}
			>
				<Form form={form} colon={false}>
					<Form.Item label={i18n.t('common.type')} rules={[{ required: true }]}>
						<Radio.Group onChange={this.handleChangeSvgType}>
							<Radio.Button value="file">{i18n.t('common.file')}</Radio.Button>
							<Radio.Button value="svg">{i18n.t('common.svg')}</Radio.Button>
						</Radio.Group>
						,
					</Form.Item>
					<Form.Item
						label={loadType === 'svg' ? i18n.t('common.svg') : i18n.t('common.file')}
						rules={[{ required: true }]}
					>
						{loadType === 'svg' ? <InputHtml /> : <FileUpload accept=".svg" />}
					</Form.Item>
				</Form>
			</Modal>
		);
	},
	(prevProps, nextProps) => {
		return nextProps.visible !== prevProps.visible;
	},
);

SVGModal.propTypes = {
	onOk: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
	visible: PropTypes.bool.isRequired,
};

export default SVGModal;
