import { Form, Input, Slider, Switch, Col, InputNumber, Row } from 'antd';
import i18n from 'i18next';
import { useGeneralProperty } from '../../../hooks/useGeneralProperty';

const GeneralProperty = ({ canvasRef, form, data }) => {
	const { handleSwitch, parseDimension } = useGeneralProperty({ form, data });
	const { width, height, scaleY, scaleX } = data;
	const parseWidth = parseDimension(width, scaleX);
	const parseHeight = parseDimension(height, scaleY);
	return (
		<>
			<Row>
				<Col span={12}>
					<Form.Item
						name="locked"
						label={i18n.t('common.locked')}
						colon={false}
						rules={[{ type: 'boolean' }]}
						initialValue={data?.locked}
						valuePropName="checked"
					>
						<Switch name="locked" size="small" onChange={handleSwitch} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="visible"
						label={i18n.t('common.visible')}
						colon={false}
						rules={[{ type: 'boolean' }]}
						valuePropName="checked"
						initialValue={data?.visible}
					>
						<Switch size="small" onChange={handleSwitch} />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item name="name" label={i18n.t('common.name')} colon={false} initialValue={data?.name}>
				<Input />
			</Form.Item>
			<Row>
				<Col span={12}>
					<Form.Item
						name="width"
						label={i18n.t('common.width')}
						colon={false}
						rules={[{ type: 'number', required: true, message: 'Please input width', min: 1 }]}
						initialValue={parseWidth}
					>
						<InputNumber min={1} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name="height"
						label={i18n.t('common.height')}
						colon={false}
						rules={[{ type: 'number', required: true, message: 'Please input height', min: 1 }]}
						initialValue={parseHeight}
					>
						<InputNumber min={1} />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<Form.Item
						name={'left'}
						label={i18n.t('common.left')}
						colon={false}
						rules={[{ required: true, message: 'Please input x position' }]}
						initialValue={data?.left}
					>
						<InputNumber />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label={i18n.t('common.top')}
						colon={false}
						name={'top'}
						rules={[{ required: true, message: 'Please input y position' }]}
						initialValue={data?.top}
					>
						<InputNumber />
					</Form.Item>
				</Col>
			</Row>
			{/*//TODO: Mirar si se lee el valor */}
			{data.superType === 'element' && (
				<Form.Item
					name="angle"
					label={i18n.t('common.angle')}
					colon={false}
					rules={[{ type: 'number', required: true, message: 'Please input rotation' }]}
					initialValue={data.angle}
				>
					<Slider min={0} max={360} />
				</Form.Item>
			)}
		</>
	);
};

export default GeneralProperty;
