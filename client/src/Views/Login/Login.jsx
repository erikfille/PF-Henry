import React from "react";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

import styles from "./Login.module.css";

export default function Login() {
  const [user, setUser] = useState({});

  const clientID =
  "756465634743-0hd8ke48er3tkrt4siag4o30m7h73a8c.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log(response);
    setUser(response);
  };

  const onFailure = () => {
    console.log("something went wrong");
  };

  return (
    <div className="LoginContainer">
      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
        />
      </div>
    </div>
  );
}
