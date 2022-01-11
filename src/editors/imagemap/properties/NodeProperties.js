import PropTypes from 'prop-types';
import { Form, Collapse } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';
import { NoItemSelected } from '../../../components/exception/NoItemSelected';

const { Panel } = Collapse;

const NodeProperties = ({ canvasRef, selectedItem, onChange }) => {
	const [form] = Form.useForm();
	const type = selectedItem?.type;
	const nodePropertiesDefinition = PropertyDefinition[type] ?? false;

	const handleFormChange = (fieldChangedValue, changedValues) => {
		onChange(selectedItem, fieldChangedValue, changedValues);
	};

	if (!type && !nodePropertiesDefinition) return <NoItemSelected />;

	const nodePropertiesList = Object.entries(nodePropertiesDefinition);
	const showArrow = false;

	return (
		<Scrollbar>
			<Form form={form} layout="horizon" colon={false} onValuesChange={handleFormChange}>
				<Collapse bordered={false}>
					{nodePropertiesList.map(([key, value]) => {
						const Component = value?.component;
						return (
							<Panel key={key} header={value.title} showArrow={showArrow}>
								{<Component canvasRef={canvasRef} form={form} data={selectedItem} />}
							</Panel>
						);
					})}
				</Collapse>
			</Form>
		</Scrollbar>
	);
};

NodeProperties.propTypes = {
	canvasRef: PropTypes.any,
	selectedItem: PropTypes.object,
	onChange: PropTypes.func,
};

export default NodeProperties;
