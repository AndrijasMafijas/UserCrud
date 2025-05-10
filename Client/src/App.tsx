import { useState } from "react";
import { Login } from "./LoginForm";
import { UserList } from "./UserList";
import { AddUserForm } from "./AddUserForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
          <AddUserForm />
          <UserList />
        </div>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
