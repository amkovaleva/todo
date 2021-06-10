import {reactive} from "vue";

export default {
    install: (app) => {

        const popUpInfo = reactive({
            open: false,
            title: 'Подтвердите действие.',
            messageBase: 'Вы действительно хотите ',
            message: '',
            collBackParams: null,
            buttons: [],
        });

        app.provide('popUpInfo', popUpInfo);


        let openPopUp = () => {
            popUpInfo.open = true;
        };

        let closePopUp = () => {
            popUpInfo.open = false;
        };

        let keyup = (event) => {
            if (event.key === 'Escape')
                closePopUp();
        };
        document.addEventListener('keyup', keyup);


        app.config.globalProperties.$popUpAlert = (message) => {
            popUpInfo.message = message;
            popUpInfo.buttons = [];
            openPopUp();
        };

        app.config.globalProperties.$closePopUp = () => {
            closePopUp();
        };

        app.config.globalProperties.$popUpQuestion = (message, buttons, collBackParams = null) => {
            popUpInfo.message = message;
            popUpInfo.collBackParams = collBackParams;
            popUpInfo.buttons = buttons;
            openPopUp();
        };

    }
}