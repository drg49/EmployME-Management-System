import React from "react"
import * as api from '../api/employees'
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../store/counterStore"
import SideNav from "./SideNav"

export default function Home() {
    const counterState = useSelector(state => state.counter)
    const dispatch = useDispatch()
    
    React.useEffect(() => console.log(counterState));

    return (
      <main>
        <SideNav />
        <div id="home-page">
          <div id="redux-example">
            <button onClick={() => dispatch(actions.increment())}>Increment</button>
            <p>{counterState.numValue}</p>
          </div>
          <div id="fetch-example">
            <button onClick={api.GetEmployees}>Get Data</button>
          </div>
        </div>
      </main>
    )
}