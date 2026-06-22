const API = "http://localhost:3000";

export async function getEvents() {
  const res = await fetch(`${API}/events`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API}/categories`);
  return res.json();
}

export async function createEvent(values) {
  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return res.json();
}

export async function updateEvent(id, values) {
  const res = await fetch(`${API}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return res.json();
}

export async function deleteEvent(id) {
  return fetch(`${API}/events/${id}`, {
    method: "DELETE",
  });
}
