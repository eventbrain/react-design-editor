import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';
import i18n from 'i18next';

import Canvas from '../../../canvas/Canvas';
import AnimationProperty from '../properties/AnimationProperty';

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
	id: 'animations',
	fill: 'rgba(0, 0, 0, 1)',
	stroke: 'rgba(255, 255, 255, 0)',
};

const AnimationModal = ({ visible, animation, onOk, onCancel }) => {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	const [state, setState] = useState({
		width: 150,
		height: 150,
	});
	const [form] = Form.useForm();

	useEffect(() => {
		const waitForTimeout = waitForContainerRender(containerRef);
		return () => {
			clearTimeout(waitForTimeout);
		};
	}, []);

	//TODO: Corregir esto
	// UNSAFE_componentWillReceiveProps(nextProps) {
	// 	if (!nextProps.visible) {
	// 		if (this.canvasRef) {
	// 			this.canvasRef.handler.animationHandler.stop('animations');
	// 		}
	// 		return;
	// 	}
	// 	if (JSON.stringify(nextProps.animation) !== JSON.stringify(this.props.animation)) {
	// 		this.waitForCanvasRender(this.canvasRef, nextProps.animation);
	// 	}
	// 	nextProps.form.resetFields();
	// }

	const waitForCanvasRender = (canvas, animation) => {
		return setTimeout(() => {
			if (canvas) {
				canvas.handlers.setById('animations', 'animation', animation);
				return;
			}
			waitForCanvasRender(canvasRef, animation);
		}, 5);
	};

	const waitForContainerRender = container => {
		return setTimeout(() => {
			if (container) {
				setState(() => {
					canvasRef.current.handler.add(option);
					return { width: container.clientWidth, height: container.clientHeight };
				});
			}
			waitForContainerRender(containerRef);
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
					value={animation.title}
					onChange={e => {
						onChange(
							null,
							{ animation: { title: e.target.value } },
							{ animation: { ...animation, title: e.target.value } },
						);
					}}
				/>
			</Form.Item>
			{AnimationProperty.render(this.canvasRef, form, { animation, id: 'animations' })}
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

export default AnimationModal;
