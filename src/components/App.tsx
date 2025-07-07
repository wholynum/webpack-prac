import { useState } from "react"
import './App.scss';

export const App = () => {
	const [count, setCount] = useState(0);
	const inc = () => setCount(prev => prev + 1)
	const dec = () => setCount(prev => prev - 1)
	const reset = () => setCount(0)
	return (
		<div>
			<div>Hello world!</div>
			<h1>{count}</h1>
			<button className="inc" onClick={inc}>inc</button>
			<button className="dec" onClick={dec}>dec</button>
			<button className="reset" onClick={reset}>reset</button>
		</div>
	)
}