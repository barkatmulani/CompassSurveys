import { combineReducers } from '@reduxjs/toolkit'
import SurveysSlice from '../surveys/redux/surveys.slice';

const rootReducer = combineReducers({compassSurveys: SurveysSlice})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;