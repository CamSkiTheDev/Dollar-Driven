import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'

export default function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact component={Login} />
			</Switch>
		</Layout>
	)
}
