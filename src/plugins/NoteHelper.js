export default {
    install: (app, router, popUpInfo, reactive) => {

        let notes = reactive(new Map()), data = null,
            item = localStorage.getItem('notes');

        if (item)
            data = new Map(Object.entries(JSON.parse(item)));

        if (data)
            notes =  reactive(data);

        app.provide('notes', notes);

        let saveData = () => {
            localStorage.setItem('notes', JSON.stringify(Object.fromEntries(notes)));
        };

        let delNote = (id) => {
            console.log(`delNote ${id}`);
            notes.delete(id);
            saveData();
            router.push({name: 'Home'});
        };

        app.config.globalProperties.$saveNote = (note, id) => {

            let isValid = document.querySelectorAll('input[required]:invalid').length === 0;
            if (!isValid)
                return;

            if (!notes.has(`${id}`))
                id = notes.size ? Math.max(...Array.from(notes.keys())) + 1 : 1;

            notes.set(`${id}`, note);
            saveData();
            router.push({name: 'Note', params: {id: id}});

            popUpInfo.message = 'Заметка успешно сохранена!';
            popUpInfo.justAlert = true;
            popUpInfo.open = true;
        };

        app.config.globalProperties.$deleteNote = (id) => {
            popUpInfo.message = 'удалить заметку';
            popUpInfo.collBackParams = id;
            popUpInfo.justAlert = false;
            popUpInfo.collBackYes = delNote;
            popUpInfo.open = true;
        };
    }
}