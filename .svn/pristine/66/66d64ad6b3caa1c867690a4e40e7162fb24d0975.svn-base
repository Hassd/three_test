import myMethod from "@/assets/js/myMethod";
import i18n from "../language/i18n";

let Liu = new myMethod();

export default {
    IS_lOGON(state, user) {
        state.user = user;
        Liu.setStoring("user", user);
    },
    IS_SIGNOUT(state, user) {
        Liu.delStoring("user");
        state.user = "";
        window.location.href = "/";
    },
    switchLang(state, lang) {
        state.lang = lang;
        i18n.locale = lang;
        localStorage.setItem("lang", lang);
    }
};