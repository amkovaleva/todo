export default {
    install: (app, router, reactive) => {

        let notes = reactive(new Map()), data = null,
            item = localStorage.getItem('notes');

        if (item)
            data = new Map(Object.entries(JSON.parse(item)));

        if (data)
            notes = reactive(data);

        app.provide('notes', notes);

        let saveData = () => {
            localStorage.setItem('notes', JSON.stringify(Object.fromEntries(notes)));
        };

        let delNote = (id) => {
            if(notes.has(id)) {
                notes.delete(id);
                saveData();
            }
            router.push({name: 'Home'});
        };

        app.config.globalProperties.$saveNote = (note, id) => {

            let isValid = document.querySelectorAll('input[required]:invalid').length === 0;
            if (!isValid) {
                app.config.globalProperties.$popUpAlert('Проверьте данные и попробуйте сохранить еще раз!');
                return;
            }

            if (!notes.has(`${id}`))
                id = notes.size ? Math.max(...Array.from(notes.keys())) + 1 : 1;

            notes.set(`${id}`, note);
            saveData();
            router.push({name: 'Note', params: {id: id}});

            app.config.globalProperties.$popUpAlert('Заметка успешно сохранена!');
        };

        app.config.globalProperties.$deleteNote = (id) => {
            app.config.globalProperties.$popUpQuestion('удалить заметку', [{name: 'Да', callBack: delNote}, {name: 'Нет', callBack: null}], id);
        };
    }
}