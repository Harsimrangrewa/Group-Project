import { useEffect, useState } from "react";

type EventItem = {
  id: number;
  garden_id: number;
  organizer_id: number;
  title: string;
  description: string | null;
  event_date: string;
  max_attendees: number | null;
};

function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gardenId, setGardenId] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Unable to load events");
        return;
      }

      setEvents(data);
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const clearForm = () => {
    setGardenId("");
    setOrganizerId("");
    setTitle("");
    setDescription("");
    setEventDate("");
    setMaxAttendees("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const url =
      editingId === null
        ? "http://localhost:3001/events"
        : `http://localhost:3001/events/${editingId}`;

    try {
      const res = await fetch(url, {
        method: editingId === null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          garden_id: Number(gardenId),
          organizer_id: Number(organizerId),
          title,
          description,
          event_date: eventDate,
          max_attendees: maxAttendees ? Number(maxAttendees) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Operation failed");
        return;
      }

      setMessage(
        editingId === null
          ? "Event created successfully"
          : "Event updated successfully",
      );

      clearForm();
      await loadEvents();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  const editEvent = (event: EventItem) => {
    setEditingId(event.id);
    setGardenId(String(event.garden_id));
    setOrganizerId(String(event.organizer_id));
    setTitle(event.title);
    setDescription(event.description || "");

    setEventDate(event.event_date ? event.event_date.substring(0, 16) : "");

    setMaxAttendees(
      event.max_attendees !== null ? String(event.max_attendees) : "",
    );
  };

  const deleteEvent = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/events/${id}`, {
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

      setMessage("Event deleted successfully");
      await loadEvents();
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="page">
      <h1>Events</h1>

      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="number"
          placeholder="Garden ID"
          value={gardenId}
          onChange={(e) => setGardenId(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Organizer ID"
          value={organizerId}
          onChange={(e) => setOrganizerId(e.target.value)}
          required
        />

        <input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Maximum Attendees"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
        />

        <button type="submit">
          {editingId === null ? "Add Event" : "Update Event"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      {message && <p className="message">{message}</p>}

      <div className="cards">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <h3>{event.title}</h3>
            <p>Garden ID: {event.garden_id}</p>
            <p>Organizer ID: {event.organizer_id}</p>
            <p>{event.description || "No description"}</p>
            <p>{event.event_date}</p>
            <p>
              Max attendees:{" "}
              {event.max_attendees !== null
                ? event.max_attendees
                : "Not specified"}
            </p>

            <div className="actions">
              <button onClick={() => editEvent(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
