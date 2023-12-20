import Home from "@/pages/Home/Home";
import Posts from "@/pages/Posts/Posts"
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import PostDetail from "@/components/PostDetail.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/posts/:id',
        component: PostDetail
    }
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})