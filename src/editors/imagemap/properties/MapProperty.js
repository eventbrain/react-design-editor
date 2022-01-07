import React, { useEffect } from 'react';
import { Form, Input, Radio, Row, Col, InputNumber } from 'antd';
import i18n from 'i18next';
import { useSetFieldFormValue } from '../../../hooks/useSetFieldFormValue';

const MapProperty = ({ canvasRef, form, data }) => {
	const [handleChange] = useSetFieldFormValue(form);
	if (!data) {
		return null;
	}
	const layout = data.layout || 'fixed';
	return (
		<>
			<Form.Item
				name="name"
				label={i18n.t('common.name')}
				colon={false}
				rules={[{ required: false }]}
				message={i18n.t('validation.enter-arg', { arg: i18n.t('common.name') })}
				initialValue={data.name || ''}
				onChange={handleChange}
			>
				<Input />
			</Form.Item>
			<Form.Item name="layout" label={i18n.t('common.layout')} colon={false} initialValue={layout}>
				<Radio.Group size="small" name="layout" onChange={handleChange}>
					<Radio.Button value="fixed">{i18n.t('common.fixed')}</Radio.Button>
					<Radio.Button value="responsive">{i18n.t('common.responsive')}</Radio.Button>
					<Radio.Button value="fullscreen">{i18n.t('common.fullscreen')}</Radio.Button>
				</Radio.Group>
			</Form.Item>
			{layout === 'fixed' && (
				<Row>
					<Col span={12}>
						<Form.Item
							name="width"
							label={i18n.t('common.width')}
							colon={false}
							rules={[{ required: true }]}
							initialValue={data.width * data.scaleX}
							onChange={handleChange}
						>
							<InputNumber />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="height"
							label={i18n.t('common.height')}
							colon={false}
							rules={[{ required: true, type: 'number' }]}
							initialValue={data.height * data.scaleY}
							onChange={handleChange}
						>
							<InputNumber />
						</Form.Item>
					</Col>
				</Row>
			)}
		</>
	);
};

export default MapProperty;
