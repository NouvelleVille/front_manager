import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import AppNavbar from "./components/navbar";
import RegisterForm from "./components/register";
import { UserProvider } from "./context/user";




function App() {


  return (
    <div className="wrapper">
      <UserProvider>
        <Router>

          <div className="container-fluid">
            <AppNavbar />
          </div>
          <div className="container-fluid mt-5">
            <Switch>
              <Route path="/register">
                <RegisterForm />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Logout />
            </Switch>
          </div>

        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
