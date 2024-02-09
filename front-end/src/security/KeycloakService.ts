import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak();

interface CallbackOneParam<T1 = void, T2 = void> {
    (param1: T1): T2;
}

/**
 * Initializes keycloak instance and calls the provided callback function if successfully authenticated.
 * 
 * @param onAuthenticatedCallback 
 */
const Login = (onAuthenticatedCallback: CallbackOneParam) => {
    keycloakInstance
        .init({ onLoad: "login-required"})
        .then(function (authenticated) {
            authenticated ? onAuthenticatedCallback() : alert("non authenticated");
        })
        .catch((e) => {
            console.dir(e);
            console.log(`keycloak init exception: ${e}`);
        });
};

const UserName = (): string | undefined =>
    keycloakInstance?.tokenParsed?.preferred_username;

const Token = (): string | undefined => keycloakInstance?.token;

const UserRoles = (): string[] | undefined => {
    if (keycloakInstance.resourceAccess === undefined) return undefined;
    if (keycloakInstance.resourceAccess["administration-vuejs"] === undefined) return undefined;
    return keycloakInstance.resourceAccess["administration-vuejs"].roles;
};

const UpdateToken = (successCallback: any) => 
    keycloakInstance.updateToken(60).then(successCallback).catch(doLogin);

const doLogin = keycloakInstance.login;

const isLoggedIn = () => !!keycloakInstance.token;

const LogOut = () => keycloakInstance.logout();

const KeycloakService = {
    CallLogin: Login,
    GetUserName: UserName,
    GetAccessToken: Token,
    GetUserRoles: UserRoles,
    UpdateToken: UpdateToken,
    IsLoggedIn: isLoggedIn,
    CallLogOut: LogOut,
};

export default KeycloakService;