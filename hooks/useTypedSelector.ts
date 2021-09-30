import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TReducer } from "../store";


export const useTypedSelector:TypedUseSelectorHook<TReducer> = useSelector