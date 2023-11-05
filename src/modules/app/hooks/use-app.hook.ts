import { useAppSelector } from '@/plugins/redux';

// app slice
import { app_selector, app_reducerActions, appApi } from '@/modules/app/redux';

const useApp = () => {
  const appState = useAppSelector(app_selector);

  const [app_checkServerStatus, { isLoading: app_checkServerStatusIsLoading }] = appApi.useLazyCheckServerStatusQuery();

  return {
    ...appState,
    ...app_reducerActions,
    app_checkServerStatus,
    app_checkServerStatusIsLoading,
  };
};

export { useApp };
