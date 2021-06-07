import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import NoteHelper from './plugins/NoteHelper'
import CommandKeys from './plugins/CommandKeys'
import ConfirmPopUp from './plugins/ConfirmPopUp'

const popUpInfo = reactive({
    open: false,
    title: 'Подтвердите действие.',
    messageBase: 'Вы действительно хотите ',
    message: '',
    collBackYes: null,
    collBackNo: null,
    collBackParams: null,
    justAlert: false,
});

let notesApp = createApp(App);
notesApp.use(router);
notesApp.use(ConfirmPopUp, popUpInfo);
notesApp.use(CommandKeys, reactive);
notesApp.use(NoteHelper, router, popUpInfo, reactive);
notesApp.mount('#app');
