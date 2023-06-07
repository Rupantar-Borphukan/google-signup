import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(res) {
    console.log("Encoded JWT ID token: " + res.credential);
    var userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signIng").hidden = true;
  }
  useEffect(() => {
    // Global Google
    window.google.accounts.id.initialize({
      client_id:
        "879059362764-alnq2q1u8qkri0v1dml7vi8ktokgli46.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(document.getElementById("signIng"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="App">
      <div id="signIng"></div>
      {
        user && <div>
          <img src={user.picture} className="mt-10 rounded-xl"/>
          <h4 className="mt-5 font-inter">{user.name}</h4>
        </div>
      }
    </div>
  );
}

export default App;
