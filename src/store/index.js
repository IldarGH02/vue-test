import {createStore} from "vuex";
import {postsModule} from "@/store/modules/postsModule";


export default createStore({
    modules: {
        post: postsModule
    }
})