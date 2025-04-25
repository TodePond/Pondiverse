export async function fetchCreations() {
  const response = await fetch(
    "https://todepond--8d30672821b811f0b0cd569c3dd06744.web.val.run"
  );
  const json = await response.json();
  if (!json.ok) throw new Error("Failed to fetch creations");
  return json.rows;
}

export async function updateDatabase() {
  const response = await fetch(
    `https://todepond--d60ba2a421b911f09a39569c3dd06744.web.val.run`
  );
  const json = await response.json();
  if (!json.ok) throw new Error("Failed to update database");
  return json;
}
