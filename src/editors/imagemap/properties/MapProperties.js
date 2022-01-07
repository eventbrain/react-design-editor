import React from 'react';
import PropTypes from 'prop-types';
import { Form, Collapse } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';

const { Panel } = Collapse;

const MapProperties = ({ canvasRef, onChange }) => {
	const [form] = Form.useForm();
	const showArrow = false;

	const handleChange = (fieldChangedValue, changedValues) => {
		onChange(fieldChangedValue, fieldChangedValue, { workarea: { ...changedValues } });
	};

	if (canvasRef) {
		const mapPropertiesDefinition = Object.entries(PropertyDefinition.map);
		const workarea = canvasRef?.handler?.workarea;
		return (
			<Scrollbar>
				<Form form={form} layout="vertical" onValuesChange={handleChange}>
					<Collapse bordered={false}>
						{mapPropertiesDefinition.map(([key, value]) => {
							const Component = value?.component;
							return (
								<Panel key={key} header={value.title} showArrow={showArrow}>
									{<Component canvasRef={canvasRef} form={form} data={workarea} />}
								</Panel>
							);
						})}
					</Collapse>
				</Form>
			</Scrollbar>
		);
	}
	return null;
};

export default MapProperties;
