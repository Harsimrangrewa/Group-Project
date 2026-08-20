import { useEffect, useState } from "react";

type Garden = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  location: string | null;
};

function GardensPage() {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const loadGardens = async () => {
    try {
      const res = await fetch("http://localhost:3001/gardens", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Unable to load gardens");
        return;
      }

      setGardens(data);
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  useEffect(() => {
    loadGardens();
  }, []);

  const clearForm = () => {
    setUserId("");
    setName("");
    setDescription("");
    setLocation("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      editingId === null
        ? "http://localhost:3001/gardens"
        : `http://localhost:3001/gardens/${editingId}`;

    const method = editingId === null ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: Number(userId),
          name,
          description,
          location,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Operation failed");
        return;
      }

      setMessage(
        editingId === null
          ? "Garden created successfully"
          : "Garden updated successfully",
      );

      clearForm();
      loadGardens();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  const editGarden = (garden: Garden) => {
    setEditingId(garden.id);
    setUserId(String(garden.user_id));
    setName(garden.name);
    setDescription(garden.description || "");
    setLocation(garden.location || "");
  };

  const deleteGarden = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/gardens/${id}`, {
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

      setMessage("Garden deleted successfully");
      loadGardens();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div>
      <h1>Gardens</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <input
          placeholder="Garden Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">
          {editingId === null ? "Add Garden" : "Update Garden"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <hr />

      {gardens.map((garden) => (
        <div key={garden.id}>
          <h3>{garden.name}</h3>
          <p>User ID: {garden.user_id}</p>
          <p>{garden.description}</p>
          <p>{garden.location}</p>

          <button onClick={() => editGarden(garden)}>Edit</button>

          <button onClick={() => deleteGarden(garden.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default GardensPage;
