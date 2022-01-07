import React from 'react';
import PropTypes from 'prop-types';
import { Form, Collapse, List } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';
import { Flex } from '../../../components/flex';

const { Panel } = Collapse;

const NodeProperties = React.memo(
	({ canvasRef, selectedItem }) => {
		//TODO:Mirar esto
		const [form] = Form.useForm();

		const showArrow = false;
		return (
			<Scrollbar>
				<Form form={form} layout="horizon" colon={false}>
					<Collapse bordered={false}>
						{selectedItem && PropertyDefinition[selectedItem.type] ? (
							Object.keys(PropertyDefinition[selectedItem.type]).map(key => {
								return (
									<Panel
										key={key}
										header={PropertyDefinition[selectedItem.type][key].title}
										showArrow={showArrow}
									>
										{PropertyDefinition[selectedItem.type][key].component.render(
											canvasRef,
											form,
											selectedItem,
										)}
									</Panel>
								);
							})
						) : (
							<Flex
								justifyContent="center"
								alignItems="center"
								style={{
									width: '100%',
									height: '100%',
									color: 'rgba(0, 0, 0, 0.45)',
									fontSie: 16,
									padding: 16,
								}}
							>
								<List />
							</Flex>
						)}
					</Collapse>
				</Form>
			</Scrollbar>
		);
	},
	(prevProps, nextProps) => {
		if (prevProps.selectedItem && nextProps.selectedItem) {
			if (prevProps.selectedItem.id !== nextProps.selectedItem.id) {
				return {
					...nextProps,
					reset: true,
				};
			}
		}
	},
);

NodeProperties.propTypes = {
	canvasRef: PropTypes.any,
	selectedItem: PropTypes.object,
	reset: PropTypes.bool,
};

export default NodeProperties;
