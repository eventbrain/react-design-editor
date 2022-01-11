import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';
import i18n from 'i18next';

import Canvas from '../../../canvas/Canvas';
import StyleProperty from '../properties/StyleProperty';

const option = {
	type: 'i-text',
	text: '\uf3c5',
	fontFamily: 'Font Awesome 5 Free',
	fontWeight: 900,
	fontSize: 60,
	width: 30,
	height: 30,
	editable: false,
	name: 'New marker',
	tooltip: {
		enabled: false,
	},
	left: 200,
	top: 50,
	id: 'styles',
};

const StyleModal = ({ visible, style, onOk, onCancel }) => {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	const [state, setState] = useState({
		width: 150,
		height: 150,
	});

	//TODO: Ver esto
	const [form] = Form.useForm();

	useEffect(() => {
		const waitForTimeout = waitForContainerRender(containerRef);
		return () => {
			clearTimeout(waitForTimeout);
		};
	}, []);

	//TODO: Mirar esto
	// UNSAFE_componentWillReceiveProps(nextProps) {
	// 	let { style } = nextProps;
	// 	if (!style || !Object.keys(style).length) {
	// 		style = {
	// 			fill: 'rgba(0, 0, 0, 1)',
	// 			opacity: 1,
	// 			stroke: 'rgba(255, 255, 255, 0)',
	// 			strokeWidth: 1,
	// 		};
	// 	}
	// 	delete style.strokeDashArray;
	// 	this.waitForCanvasRender(canvasRef, style);
	// 	nextProps.form.resetFields();
	// }

	const waitForCanvasRender = (canvas, style) => {
		return setTimeout(() => {
			if (canvas) {
				Object.keys(style).forEach(key => {
					canvas.handlers.setById('styles', key, style[key]);
				});
				return;
			}
			waitForCanvasRender(canvasRef, style);
		}, 5);
	};

	const waitForContainerRender = container => {
		return setTimeout(() => {
			if (container) {
				setState(() => {
					canvasRef.rurrent.handler.add(option);
					return {
						width: container.clientWidth,
						height: container.clientHeight,
					};
				});
			}
			this.waitForContainerRender(containerRef);
		}, 5);
	};

	const { width, height } = state;
	return (
		<Modal onOk={onOk} onCancel={onCancel} visible={visible}>
			<Form.Item
				label={i18n.t('common.title')}
				required
				colon={false}
				hasFeedback
				help={validateTitle.help}
				validateStatus={validateTitle.validateStatus}
			>
				<Input
					value={style.title}
					onChange={e => {
						onChange(null, { title: e.target.value }, { ...style, title: e.target.value });
					}}
				/>
			</Form.Item>
			{StyleProperty.render(this.canvasRef, form, style)}
			<div ref={containerRef}>
				<Canvas
					ref={canvasRef}
					editable={false}
					canvasOption={{ width, height, backgroundColor: '#f3f3f3' }}
					workareaOption={{ backgroundColor: 'transparent' }}
				/>
			</div>
		</Modal>
	);
};

export default StyleModal;
