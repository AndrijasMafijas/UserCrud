import { useState } from "react";
import axios from "axios";

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://0c7cf7d8-cd4b-4e74-a67d-7ada0b746a5f-00-3ulimiiso45oj.janeway.replit.dev/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      onLogin(); // Obavesti App da je login uspešan
    } catch (err) {
      setError("Pogrešan email ili lozinka");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Prijavi se</button>
      </form>
      <p>
        Note:
        <br /> email: jane.doe@example.com
        <br />
        password: password123
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
