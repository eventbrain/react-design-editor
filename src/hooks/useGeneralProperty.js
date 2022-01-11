import { useEffect } from 'react';
import { useSetFieldFormValue } from './useSetFieldFormValue';
import { useOnSwitch } from './useOnSwitch';

export const useGeneralProperty = ({ form, data }) => {
	const [handleChange] = useSetFieldFormValue(form);
	const [onSwitch] = useOnSwitch();

	const handleSwitch = (state, event) => {
		const newEvent = onSwitch(state, event);
		handleChange(newEvent);
	};

	const parseDimension = (dimension, scale) => parseInt(dimension * scale, 10);

	useEffect(() => {
		const { width, height, scaleY, scaleX } = data;
		const newWidth = parseDimension(width, scaleX);
		const newHeight = parseDimension(height, scaleY);
		form.setFieldsValue({ ...data, width: newWidth, height: newHeight });
	});

	return { handleSwitch, parseDimension };
};
