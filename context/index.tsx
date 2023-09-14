"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  user: {wallet: number, balance: string, address:string}[]
};

type ActionType = {
  type: string;
  data: any;
};

const initialState: StateType = {
  user: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "UPDATE_USER":
        return { ...state, user: [...action.data] };
    // case "INCREMENT":
    //   return { ...state, count: state.count + 1 };
    // case "DECREMENT":
    //   return { ...state, count: state.count - 1 };
    // case "RESET":
    //   return { ...state, count: 0 };
    default:
      return state;
  }
};

export const GeneralContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const GeneralContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};