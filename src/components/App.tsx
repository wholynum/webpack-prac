import { useState } from "react"
import classes from './App.module.scss';
import { Link, Outlet } from "react-router-dom";
import jsPng from '@/assets/JavaScript-logo.png'
import myPhoto from '@/assets/photo_2025-07-14_18-42-50.jpg'
import AppStoreSvg from '@/assets/App_Store_(iOS).svg'

export const App = () => {
	const [count, setCount] = useState(0);
	const inc = () => setCount(prev => prev + 1)
	const dec = () => setCount(prev => prev - 1)
	const reset = () => setCount(0)
	return (
		<div>
			<h1>PLATFORM={__PLATFORM__}</h1>
			<img width={150} height={150} src={jsPng} alt="" />
			<img width={380} height={200} src={myPhoto} alt="" />
			<div>
				<AppStoreSvg width={50} height={50} fill={"#2072F3"} />
			</div>
			<Link to={'/about'}>about</Link>
			<Link to={'/shop'}>shop</Link>
			<div>Hello world!</div>
			<h1>{count}</h1>
			<button className={classes.inc} onClick={inc}>inc</button>
			<button className={classes.dec} onClick={dec}>dec</button>
			<button className={classes.reset} onClick={reset}>reset</button>
			<Outlet />
		</div>
	)
}