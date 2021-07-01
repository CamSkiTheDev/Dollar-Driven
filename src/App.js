import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Layout>
  );
}
