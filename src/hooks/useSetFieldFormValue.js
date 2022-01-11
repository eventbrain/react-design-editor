export const useSetFieldFormValue = form => {
	const onChangeInput = e => {
		const value = e.target?.value;
		const key = e.target?.id ?? e.target?.name;
		form.setFieldsValue({ [key]: value });
	};

	return [onChangeInput];
};
