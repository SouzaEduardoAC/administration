import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import KeycloakService from "@/security/KeycloakService";

const HttpMethods = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
};

const _axios = axios.create();

const cb = (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${KeycloakService.GetAccessToken()}`;
    return config;
};

const configureAxiosKeycloak = (): void => {
    _axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            if (KeycloakService.IsLoggedIn()) {
                KeycloakService.UpdateToken(cb(config));
            }

            return config;
        }
    );
};

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
    HttpMethods,
    configureAxiosKeycloak,
    getAxiosClient,
};

export default HttpService;