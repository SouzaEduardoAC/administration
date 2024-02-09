import { createApp, render } from 'vue'
import App from './App.vue'
import KeycloakService from './security/KeycloakService'
import HttpService from './services/HttpService';

const renderApp = () => {
    createApp(App).mount('#app')   
};

KeycloakService.CallLogin(renderApp);
HttpService.configureAxiosKeycloak();