import { Collapse } from 'antd';
import { Flex } from '../flex';

export const NoItemSelected = () => {
	return (
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
			<h3>No items selected</h3>
		</Flex>
	);
};
