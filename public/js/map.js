
  mapboxgl.accessToken = maptoken;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
zoom: 6,
  });
  const marker= new mapboxgl.Marker({ color: "red" })
  .setLngLat( listing.geometry.coordinates)
  //  .setLngLat( coordinates)
  .setPopup(new mapboxgl.Popup({offset:25})
  .setHTML(`<h4>${listing.location}</h4><p>exact location will be provided  after booking </p>`)) 
  .addTo(map);
