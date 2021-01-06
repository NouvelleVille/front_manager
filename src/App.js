import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LightController from "./components/lights";
import LoginForm from "./components/login";
import AppNavbar from "./components/navbar";
import RegisterForm from "./components/register";
import { UserProvider } from "./context/user";




function App() {


  return (
    <div className="wrapper">
      <UserProvider>
        <Router>
          <div className="container">
            <AppNavbar />
          </div>
          <div className="container-fluid">
            <Switch>

              <Route path="/lights">
                <LightController/>
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
            </Switch>
          </div>

        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
