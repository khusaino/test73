import { createStore } from "vuex";
import tasks from './moduls/tasks'


export default createStore({
  modules: {
    tasks
  },
});
