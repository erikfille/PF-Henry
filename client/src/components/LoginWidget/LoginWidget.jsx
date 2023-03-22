import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

export default function LoginWidget() {
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
    <div>
      <div>
        <img
          src="https://lh3.googleusercontent.com/a/AGNmyxaV2D-6qoMPizr_-xsfV-v5Gez1I3XarpyoxT2DfcM=s96-c"
          alt="logoApp"
        />
      </div>
      <hr />
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" validated={true} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" validated={true} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
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
