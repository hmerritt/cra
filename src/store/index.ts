import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers";

const logger = createLogger({
	collapsed: true
	// Exclude "COUNT_INCREMENT" type from redux-logger
	// predicate: (getState, action) => action.type !== "COUNT_INCREMENT",
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		const middleware = getDefaultMiddleware();

		// Add development middleware
		if (process.env.NODE_ENV === "development") {
			middleware.push(logger);
		}

		return middleware;
	},
	devTools: process.env.NODE_ENV !== "production"
	//   enhancers: [reduxBatch],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
