import { useEffect, useState } from "react";

type Flower = {
  id: number;
  user_id: number;
  common_name: string;
  scientific_name: string | null;
  season: string | null;
  color: string | null;
  description: string | null;
};

function FlowersPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [userId, setUserId] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [season, setSeason] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const loadFlowers = async () => {
    try {
      const res = await fetch("http://localhost:3001/flowers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Unable to load flowers");
        return;
      }

      setFlowers(data);
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  useEffect(() => {
    loadFlowers();
  }, []);

  const clearForm = () => {
    setUserId("");
    setCommonName("");
    setScientificName("");
    setSeason("");
    setColor("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const url =
      editingId === null
        ? "http://localhost:3001/flowers"
        : `http://localhost:3001/flowers/${editingId}`;

    try {
      const res = await fetch(url, {
        method: editingId === null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: Number(userId),
          common_name: commonName,
          scientific_name: scientificName,
          season,
          color,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Operation failed");
        return;
      }

      setMessage(
        editingId === null
          ? "Flower created successfully"
          : "Flower updated successfully",
      );

      clearForm();
      await loadFlowers();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  const editFlower = (flower: Flower) => {
    setEditingId(flower.id);
    setUserId(String(flower.user_id));
    setCommonName(flower.common_name);
    setScientificName(flower.scientific_name || "");
    setSeason(flower.season || "");
    setColor(flower.color || "");
    setDescription(flower.description || "");
  };

  const deleteFlower = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/flowers/${id}`, {
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

      setMessage("Flower deleted successfully");
      await loadFlowers();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="page">
      <h1>Flowers</h1>

      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <input
          placeholder="Common Name"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          required
        />

        <input
          placeholder="Scientific Name"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />

        <input
          placeholder="Season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingId === null ? "Add Flower" : "Update Flower"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      {message && <p className="message">{message}</p>}

      <div className="cards">
        {flowers.map((flower) => (
          <div className="card" key={flower.id}>
            <h3>{flower.common_name}</h3>
            <p>Scientific name: {flower.scientific_name || "-"}</p>
            <p>Season: {flower.season || "-"}</p>
            <p>Color: {flower.color || "-"}</p>
            <p>{flower.description || "No description"}</p>

            <div className="actions">
              <button onClick={() => editFlower(flower)}>Edit</button>
              <button onClick={() => deleteFlower(flower.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlowersPage;
