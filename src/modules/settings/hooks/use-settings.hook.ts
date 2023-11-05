import { useAppSelector } from '@/plugins/redux';

// app slice
import { app_selector, app_reducerActions } from '@/modules/app/redux';

const useApp = () => {
  const appState = useAppSelector(app_selector);

  return {
    ...appState,
    ...app_reducerActions,
  };
};

export { useApp };
