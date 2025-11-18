const UMD_LOCATION_ID = "fc5cd0de-25c6-4d33-afc4-c420156e9a3e";
const BASE_URL = "https://mycscgo.com/api/v3/location/" + UMD_LOCATION_ID;
type Room = {
  label: string;
  roomId: string;
};
/**
 * Fetch all rooms and return only those with optional label
 */
export async function getRooms(label = "") {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Error fetching location: ${res.status}`);
  const data = await res.json();

  label = label.toLowerCase();

  return sortRoomsByLabel(
    data.rooms
      .filter((room: Room) => room.label.toLowerCase().includes(label))
      .map((room: Room) => ({ label: room.label, roomId: room.roomId })),
  );
}

export async function getMachines(roomId: string) {
  const res = await fetch(`${BASE_URL}/room/${roomId}/machines`);
  if (!res.ok) throw new Error(`Error fetching location: ${res.status}`);
  const data = await res.json();

  return data;
}

/**
 * Fetch summaries for each room and return structured data
 * @param {Array} rooms - Array of objects with {label, roomId}
 */
export async function getRoomSummaries(rooms: Room[]) {
  const results = await Promise.all(
    rooms.map(async (room) => {
      const summaryRes = await fetch(`${BASE_URL}/room/${room.roomId}/summary`);
      if (!summaryRes.ok) throw new Error(`Error fetching room ${room.roomId}`);
      const summary = await summaryRes.json();

      return {
        label: summary.roomLabel,
        roomId: summary.roomId,
        washers: {
          available: summary.washers.available,
          total: summary.washers.total,
        },
        dryers: {
          available: summary.dryers.available,
          total: summary.dryers.total,
        },
      };
    }),
  );

  return results;
}

/**
 * Sort a list of rooms by ascending label
 * @param {Array} rooms - Array of room objects with a 'label' property
 */
export function sortRoomsByLabel(rooms: Room[]) {
  return rooms.slice().sort((a, b) => a.label.localeCompare(b.label));
}
