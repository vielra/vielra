import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootDispatch } from './config-store';
import { RootState } from './root-reducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => RootDispatch = useDispatch;

export { useAppSelector, useAppDispatch };
