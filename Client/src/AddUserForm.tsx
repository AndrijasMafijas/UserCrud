import React, { useState } from "react";
import axios from "axios";
import { User } from "./types";

export const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "https://0c7cf7d8-cd4b-4e74-a67d-7ada0b746a5f-00-3ulimiiso45oj.janeway.replit.dev/users",
      { name, email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEmail("");
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add user form</h2>
        <input
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
};
