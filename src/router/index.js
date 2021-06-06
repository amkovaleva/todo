import {createRouter, createWebHistory} from "vue-router";
import Home from '../components/Notes.vue'
import Note from '../components/Note.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: '/notes/:id',
        component: Note,
        name: "Note",
        props: true
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;