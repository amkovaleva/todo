import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import NoteHelper from './plugins/NoteHelper'
import CommandKeys from './plugins/CommandKeys'
import ConfirmPopUp from './plugins/ConfirmPopUp'
import Versioning from './plugins/Versioning'


let notesApp = createApp(App);
notesApp.use(router);
notesApp.use(ConfirmPopUp);
notesApp.use(CommandKeys, reactive);
notesApp.use(Versioning, reactive);
notesApp.use(NoteHelper, router, reactive);
notesApp.mount('#app');
