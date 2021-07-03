import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Layout>
  );
}
