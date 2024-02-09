<template>
    <div class="login">
        <h2>Login {{ Login() }}</h2>
        <h2>Roles {{  UserRoles()?.join(" ") }}</h2>
        <h2>Access Token {{ AccessToken() }}</h2>
        <button @click="LogOut">Log Out</button>
        <button @click="Weather">Weather</button>
    </div>
</template>

<script lang="ts">
import { DefineComponent, defineComponent } from 'vue';
import KeycloakService from '@/security/KeycloakService';
import HttpService from "@/services/HttpService";

export default defineComponent({
    name: "LoginComponent",
    methods: {
        Login() {
            return KeycloakService.GetUserName();
        },
        AccessToken() {
            return KeycloakService.GetAccessToken();
        },
        UserRoles() {
            return KeycloakService.GetUserRoles();
        },
        LogOut() {
            return KeycloakService.CallLogOut();
        },
        Weather() {
            HttpService.getAxiosClient()
            .get("http://localhost:8050/WeatherForecast")
            .then(
                (p) => alert(JSON.stringify(p.data)),
                (e) => alert(e.message)
            );
        },
    },
});
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>