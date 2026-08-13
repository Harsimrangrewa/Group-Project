import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
};

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to load users");
        return;
      }

      setUsers(data);
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      editingId === null
        ? "http://localhost:3001/users"
        : `http://localhost:3001/users/${editingId}`;

    const method = editingId === null ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        password_hash,
        bio,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || data.error || "Operation failed");
      return;
    }

    setMessage(
      editingId === null
        ? "User created successfully"
        : "User updated successfully",
    );

    setName("");
    setEmail("");
    setPassword("");
    setBio("");
    setEditingId(null);

    loadUsers();
  };

  const editUser = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio || "");
    setPassword("");
  };

  const deleteUser = async (id: number) => {
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || data.error || "Delete failed");
      return;
    }

    setMessage("User deleted successfully");
    loadUsers();
  };

  return (
    <div>
      <h1>Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password_hash}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button type="submit">
          {editingId === null ? "Add User" : "Update User"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.bio}</p>

          <button onClick={() => editUser(user)}>Edit</button>

          <button onClick={() => deleteUser(user.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
