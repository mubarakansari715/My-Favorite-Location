class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = {
      lat: location.lat,
      long: location.long,
      address: location.address,
    };
    this.id = new Date().toString() + Math.random().toString();
  }
}

export default Place;
