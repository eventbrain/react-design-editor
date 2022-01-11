export const useOnSwitch = () => {
	const handleChange = (state, event) => {
		const { target } = event;
		return {
			...event,
			target: {
				...target,
				value: state,
			},
		};
	};
	return [handleChange];
};
