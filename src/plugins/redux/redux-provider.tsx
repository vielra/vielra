import React, { FC, PropsWithChildren } from 'react';

// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// store
import { persistor, store } from '@/plugins/redux';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
