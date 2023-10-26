import { createStore, useStore as BaseStore } from 'vuex'

import user from './modules/user'
const store = createStore({
  modules: { user },
})

export function useStore<T = IStore.ModuleState>() {
  return BaseStore<T>
}

export default store
