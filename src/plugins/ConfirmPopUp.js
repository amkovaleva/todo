export default {
    install: (app, popUpInfo) => {

        app.provide('popUpInfo', popUpInfo);

        let keyup = (event) => {
            if (event.key === 'Escape')
                popUpInfo.open = false;
        };

        document.addEventListener('keyup', keyup);


        app.config.globalProperties.$popUpRes = (idConfirm) => {

            popUpInfo.open = false;

            if (idConfirm && popUpInfo.collBackYes)
                popUpInfo.collBackYes.call(null, popUpInfo.collBackParams);

            if (idConfirm && popUpInfo.collBackNo)
                popUpInfo.collBackNo.call(null, popUpInfo.collBackParams);

            popUpInfo.collBackYes = null;
            popUpInfo.collBackNo = null;
        };
    }
}