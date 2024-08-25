class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // location is an object containing latitude and longitude properties.
        this.id = new Date().toString() + Math.random().toString();
    }
}