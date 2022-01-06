import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';
import { i18nClient } from './i18n';

const antResources = {
	ko: koKR,
	'ko-KR': koKR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

//TODO: Hay un error con el paquete antd
//se debe modificar el codigo en los node modules de la ruta
//./node_modules/antd/es/version/index.js
//remplazar codigo por el de acontinuación
//import pck from '../../package.json';
//const { version } = pck;
//export default version;
const render = Component => {
	const rootElement = document.getElementById('root');
	ReactDom.render(
		<AppContainer>
			<ConfigProvider locale={antResources[i18next.language]}>
				<Component />
			</ConfigProvider>
		</AppContainer>,
		rootElement,
	);
};

i18nClient();

render(App);

register();

if (module.hot) {
	module.hot.accept('./App', () => {
		render(App);
	});
}
