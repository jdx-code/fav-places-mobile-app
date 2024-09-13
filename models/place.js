export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { lat: location.lat, lng: location.lng }; // location is an object containing latitude and longitude properties.
        this.id = id;
        // this.id = new Date().toString() + Math.random().toString();
    }
}