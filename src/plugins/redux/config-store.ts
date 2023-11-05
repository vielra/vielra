// redux tookit
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

// redux persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';

// root reducer
import rootReducer, { RootState } from './root-reducer';

// redux flipper
// import reduxFlipper from 'redux-flipper';

// emv
import { NODE_ENV } from '@env';

// storage
import { persistStorage } from './persist-storage';

// reducers
import { appApi } from '@/modules/app/redux';
import { baseApi } from '@/plugins/redux/base.api';
import { authApi, authSlice } from '@/modules/auth/redux';
import { phrasebookApi, phrasebookSlice } from '@/modules/phrasebook/redux';

// persist config
const persistConfig: PersistConfig<RootState> = {
  key: '@ROOT',
  storage: persistStorage,
  whitelist: [authSlice.name, phrasebookSlice.name],
};

// make persisted store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// listener middleware
export const listenerMiddleware = createListenerMiddleware();

// root store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat([baseApi.middleware, authApi.middleware, appApi.middleware, phrasebookApi.middleware]);

    // flipper debugger (for development purpose only)
    if (NODE_ENV !== 'test' && NODE_ENV === 'development') {
      // const createDebugger = require('redux-flipper').default;
      // middlewares.push(createDebugger());
      // middlewares.push(reduxFlipper());
    }

    return middlewares;
  },
});

// setup listeners to make use of feature inside RTK
setupListeners(store.dispatch);

// store that persisted
const persistor = persistStore(store);

// types
export type RootDispatch = typeof store.dispatch;

export { store, persistor };
