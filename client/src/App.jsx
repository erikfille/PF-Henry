import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="App">
      <button onClick={() => loginWithRedirect()}>Login</button>
      <h1>estoy funcionando</h1>
    </div>
  );
}

export default App;
