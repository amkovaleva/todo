export default {
    install: (app, reactive) => {

        let currentVNumber = -1,
            versions = reactive(new Map());

        app.config.globalProperties.$version = () => {
            return versions.get(currentVNumber);
        }

        app.config.globalProperties.$addVersion = (note, isFirstVersion = false) => {
            if (isFirstVersion) {
                currentVNumber = -1;
                versions = reactive(new Map());
            }

            let versionsForDel = Array(versions.keys()).filter((key) => key > currentVNumber);
            versionsForDel.forEach((key) => versions.delete(key));

            currentVNumber++;

            versions.set(currentVNumber, {
                name: note.name,
                todos: JSON.parse(JSON.stringify(note.todos))
            });
        }

        app.config.globalProperties.$moveVersion = (isBack) => {
            let newVersion = (isBack ? -1 : 1) + currentVNumber;
            if (!versions.has(newVersion))
                return;

            currentVNumber = newVersion;
        }

    }
}