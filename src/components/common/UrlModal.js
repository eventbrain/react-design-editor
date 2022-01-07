import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, Input } from 'antd';
import i18n from 'i18next';

import Icon from '../icon/Icon';

const UrlModal = ({onChange, value}) => {
  const [state, setState] = useState({
    url: value || '',
    tempUrl: value || '',
    visible: false,
  });

  const onOk = () => {
    const { tempUrl } = state;
    onChange(tempUrl);
    setState({
      ...state,
      visible: false,
      url: tempUrl,
    });
  }

  const onCancel = () => {
    modalHandlers.onHide();
  }

  const onClick = () => {
    modalHandlers.onShow();
  },


	const modalHandlers = {
		onShow: () => {
			setState({
        ...state,
				visible: true,
			});
		},
		onHide: () => {
			setState({
        ...state,
				visible: false,
			});
		},
	};

  const label = (
    <>
      <span style={{ marginRight: 8 }}>{i18n.t('common.url')}</span>
      <Button onClick={onClick} shape="circle" className="rde-action-btn">
        <Icon name="edit" />
      </Button>
    </>
  );

  const { url, visible } = state;
  return (
    <>
      <Form.Item
        name="url"
        label={label}
        colon={false}
        rules={[{ required: true }]}
        message={i18n.t('validation.enter-property', { arg: i18n.t('common.url') })}
        initialValue={url || ''}
      >
        <span style={{ wordBreak: 'break-all' }}>{url}</span>
      </Form.Item>
      <Modal onCancel={onCancel} onOk={onOk} visible={visible}>
        <Form.Item label={i18n.t('common.url')} colon={false}>
          <Input
            defaultValue={url}
            onChange={e => {
              setState({ ...state, tempUrl: e.target.value });
            }}
          />
        </Form.Item>
      </Modal>
    </>
  );
}

UrlModal.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  form: PropTypes.any,
};

export default UrlModal;
