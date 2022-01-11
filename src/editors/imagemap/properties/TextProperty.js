import { useState } from 'react';
import { Form, Slider, Col, Select, Tag, Row, Divider, Radio } from 'antd';
import sortBy from 'lodash/sortBy';
import { useSetFieldFormValue } from '../../../hooks/useSetFieldFormValue';

import Icon from '../../../components/icon/Icon';
import Fonts from '../../../components/font/fonts';

const fonts = Fonts.getFonts();
const tagsAlignText = ['left', 'right', 'justify', 'center'];

const TextProperty = ({ canvasRef, form, data }) => {
	return (
		<>
			<Col span={16}>
				<Form.Item
					name="fontFamily"
					label="Font Family"
					colon={false}
					initialValue={data?.fontFamily}
				>
					<Select>
						{Object.keys(fonts).map(font => {
							return (
								<Select.OptGroup key={font} label={font.toUpperCase()}>
									{sortBy(fonts[font], ['name']).map(f => (
										<Select.Option key={f.name} value={f.name}>
											{f.name}
										</Select.Option>
									))}
								</Select.OptGroup>
							);
						})}
					</Select>
				</Form.Item>
			</Col>
			<Col span={8}>
				<Form.Item
					name="fontSize"
					label="Font Size"
					colon={false}
					initialValue={data?.fontSize || '32'}
				>
					<Select>
						{Array.from({ length: 60 }, (v, k) => (
							<Select.Option key={k} value={`${k + 1}`}>
								{k + 1}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Divider orientation="left">font style</Divider>
			<Row justify="left">
				<Col span={4}>
					<Form.Item
						name="fontWeight"
						valuePropName="checked"
						initialValue={data?.fontWeight === 'bold'}
					>
						<Tag.CheckableTag className="rde-action-tag">
							<Icon name="bold" />
						</Tag.CheckableTag>
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item
						name="fontStyle"
						valuePropName="checked"
						initialValue={data?.fontStyle === 'italic'}
					>
						<Tag.CheckableTag className="rde-action-tag">
							<Icon name="italic" />
						</Tag.CheckableTag>
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item name="linethrough" valuePropName="checked" initialValue={data?.linethrough}>
						<Tag.CheckableTag className="rde-action-tag">
							<Icon name="strikethrough" />
						</Tag.CheckableTag>
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item name="underline" valuePropName="checked" initialValue={data?.underline}>
						<Tag.CheckableTag className="rde-action-tag">
							<Icon name="underline" />
						</Tag.CheckableTag>
					</Form.Item>
				</Col>
			</Row>
			<Divider />
			<Row justify="left">
				<Col span={24}>
					<Form.Item label="text align" name="textAlign">
						<Radio.Group>
							{tagsAlignText.map(tag => (
								<Radio.Button key={tag} value={tag}>
									<Icon name={`align-${tag}`} />
								</Radio.Button>
							))}
						</Radio.Group>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item
						label="Line Height"
						colon={false}
						name="lineHeight"
						rules={[{ type: 'number' }]}
						initialValue={data?.lineHeight}
					>
						<Slider min={0} max={100} />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item
						label="Char Spacing"
						colon={false}
						name="charSpacing"
						rules={[{ type: 'number' }]}
						initialValue={data?.charSpacing}
					>
						<Slider min={0} max={100} />
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};

export default TextProperty;
