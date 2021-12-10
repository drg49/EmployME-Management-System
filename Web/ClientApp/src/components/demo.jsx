import React from "react"
import * as api from '../api/employees'
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../store/counterStore"

export default function Demo() {
    const counterState = useSelector(state => state.counter)
    const dispatch = useDispatch()
    
    React.useEffect(() => console.log(counterState));

    return (
        <div id="home-page">
          <div id="redux-example">
            <button onClick={() => dispatch(actions.increment())}>Increment</button>
            <p>{counterState.numValue}</p>
          </div>
          <div id="fetch-example">
            <button onClick={api.GetEmployees}>Get Data</button>
          </div>
        </div>
    )
};
