import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.runAsync(
    `CREATE TABLE IF NOT EXISTS places(
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      long REAL NOT NULL
    )`
  );
}

export async function insearPlacedb(place) {
  console.log("insert data init", place);
  try {
    return database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, long) VALUES (?,?,?,?,?)`,
      [
        place.title,
        place.imageUri,
        place.location.address,
        place.location.lat,
        place.location.long,
      ]
    );
  } catch (error) {
    console.log("Insert faild in db");
  }
}
