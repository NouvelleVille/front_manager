import { Button } from "react-bootstrap";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import RegisterForm from "./components/register";
import { UserProvider } from "./context/user";
import apiFetcher from "./utils/axios";


function App() {


  const verifyToken = () => {
    apiFetcher.verifyToken();
  }


  const refreshToken = () => {
    apiFetcher.refreshToken();
  }

  return (
    <div className="App">

      
      <UserProvider>
      <Button onClick={verifyToken}>VerifyToken</Button>
      <Button onClick={refreshToken}>Refresh Token</Button>
        <div className="container">
          <Logout/>
          <RegisterForm/>
        <LoginForm/>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
