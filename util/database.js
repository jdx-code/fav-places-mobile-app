import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabaseSync('places.db');

export async function init() {
  return await database.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`
  );
}

export async function insertPlace(place) {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`, 
      [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
    );
    console.log('Result is', result);
    return result;
  } catch (error) {
    throw error; // This will handle the error and reject as in the original function
  }
}

export async function fetchPlaces() {
  const placesArray = [];
  const places = await database.getAllAsync('SELECT * FROM places');
  console.log('places', places);
  places.forEach((place) => placesArray.push(
      new Place(place.title, place.imageUri, {address: place.address, latitude: place.lat, longitude: place.lng}, place.id )
  ))
  return placesArray;
}

// export async function fetchPlaceDetails(id) {
//   const stmt = await database.prepareAsync('SELECT * FROM places WHERE id = $id');
//   const result = await stmt.executeAsync({$id: id});
//   const firstRow = await result.getFirstAsync();
//   await result.resetAsync();
//   return firstRow
// }

export async function fetchPlaceDetails(id) {
  const stmt = await database.prepareAsync('SELECT * FROM places WHERE id = $id');
  const result = await stmt.executeAsync({ $id: id });
  const firstRow = await result.getFirstAsync();
  await result.resetAsync();

  if (!firstRow) {
    return null; // Handle case where no place is found
  }

  // Create a Place instance using the data from the database
  const fetchedPlace = new Place(
    firstRow.title, // Assuming the database has a 'title' column
    firstRow.imageUri, // Assuming the database has an 'imageUri' column
    {
      address: firstRow.address, // Assuming the database has an 'address' column
      lat: firstRow.lat,         // Assuming the database has a 'lat' column
      lng: firstRow.lng          // Assuming the database has a 'lng' column
    },
    firstRow.id // The place id
  );

  return fetchedPlace;
}