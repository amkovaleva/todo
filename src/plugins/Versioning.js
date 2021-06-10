export default {
    install: (app, reactive) => {

        let currentVNumber = -1, lastSavedVersion = -1,
            versions = reactive(new Map());

        window.addEventListener("beforeunload", (e) => {
            if (currentVNumber === lastSavedVersion || app.config.globalProperties.$route.name !== 'Note') {
                return undefined;
            }

            let confirmationMessage = 'Имеются несохраненные изменения. Вы действительно хотите покинуть страницуб потеряв изменения?';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });

        app.config.globalProperties.$version = () => {
            return versions.get(currentVNumber);
        };

        app.config.globalProperties.$lastSavedVersion = () => {
            return versions.get(lastSavedVersion);
        };

        app.config.globalProperties.$checkSaveCurVersion = () => {
            if (currentVNumber === lastSavedVersion) {
                return true;
            }
            async function resPopUp() {
                let promise = new Promise((resolve) => {

                    app.config.globalProperties.$popUpQuestion('покинуть страницу без сохранения изменений', [
                        {
                            name: 'Да', callBack: () => {
                                resolve(true)
                            }
                        },
                        {
                            name: 'Нет', callBack: () => {
                                resolve(false)
                            }
                        }
                    ]);
                });
                let result = await promise;
                return result;
            }
            return resPopUp();
        };


        let clearVersionsMoreThen = (version) => {
            let versionsForDel =  Array.from( versions.keys() ).filter((key) => key > version);
            versionsForDel.forEach((key) => versions.delete(key));
        };

        app.config.globalProperties.$addVersion = (note, isSavedVersion = false, isNeedAddVersion = true) => {

            if(isSavedVersion && !isNeedAddVersion){
                lastSavedVersion = currentVNumber;
                return;
            }
            if (isSavedVersion) {
                currentVNumber = -1;
                versions = reactive(new Map());
            }

            clearVersionsMoreThen(currentVNumber);

            currentVNumber++;
            if(isSavedVersion)
                lastSavedVersion = currentVNumber;

            versions.set(currentVNumber, {
                name: note.name,
                todos: JSON.parse(JSON.stringify(note.todos))
            });
        }

        let resetVersionTo = (version, callBack) => {
            currentVNumber = version;
            clearVersionsMoreThen(currentVNumber);
            callBack();
        };

        app.config.globalProperties.$moveVersion = (callBack, isBack, isBackToSave = false) => {

            if (isBackToSave) {

                let buttons = [{
                    name: (lastSavedVersion) ? 'Да, до последнего сохранения' : 'Да',
                    callBack: () =>{ resetVersionTo(lastSavedVersion, callBack); }
                }];

                if(lastSavedVersion){
                    buttons.push({
                        name: 'Да, все изменения',
                        callBack: () =>{ resetVersionTo(0, callBack); }
                    });
                }
                buttons.push({ name: 'Нет', callBack: null });


                app.config.globalProperties.$popUpQuestion('отменить изменения', buttons );
                return;
            }

            let newVersion = (isBack ? -1 : 1) + currentVNumber;
            if (!versions.has(newVersion))
                return;

            currentVNumber = newVersion;
            callBack();
        }
    }
}