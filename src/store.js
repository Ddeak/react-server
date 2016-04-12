import { createStore } from 'redux'
import rootReducer from './reducer'

export default function makeStore() {
	return createStore(rootReducer)
}