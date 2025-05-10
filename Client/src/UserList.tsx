import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./types";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://0c7cf7d8-cd4b-4e74-a67d-7ada0b746a5f-00-3ulimiiso45oj.janeway.replit.dev/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const filteredUsers = response.data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
    setUsers(filteredUsers);
    //users = filteredUsers;
  };
  const deleteFunction = async (id: number) => {
    await axios.delete(
      `https://0c7cf7d8-cd4b-4e74-a67d-7ada0b746a5f-00-3ulimiiso45oj.janeway.replit.dev/users/${id}`
    );
    fetchUsers();
  };

  const modifyFunction = async (id: number) => {
    if (regex.test(email)) {
      await axios.put(
        `https://0c7cf7d8-cd4b-4e74-a67d-7ada0b746a5f-00-3ulimiiso45oj.janeway.replit.dev/users/${id}`,
        { name, email }
      );
      fetchUsers();
    } else {
      console.log("Ne valja e-mail");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
            <button onClick={() => deleteFunction(u.id)}>Delete</button>
            <button onClick={() => modifyFunction(u.id)}>Modify</button>
          </li>
        ))}
      </ul>
      <h2>Modify area</h2>
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
    </div>
  );
};
