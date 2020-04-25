/* eslint-disable no-undef */
$(document).ready(function () {
  // set api token
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZmlscGhhc3RlciIsImEiOiJjazllejg0emYwNWZxM2VsY2hueWt6b2l1In0.226DnS6uYaIz2IOyJW3-xQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9,
  });
  const mapboxClient = mapboxSdk({
    accessToken:
      'pk.eyJ1IjoiZmlscGhhc3RlciIsImEiOiJjazllejg0emYwNWZxM2VsY2hueWt6b2l1In0.226DnS6uYaIz2IOyJW3-xQ',
  });
  const geocodingClient = mapboxClient.geocoding;

  /* 
    === Function Defs ===
  */
  // Focus map on previously entered address.
  function focusAddress() {
    const address = $(this).text();
    const lat = $(this).data('lat');
    const lng = $(this).data('lng');
    map.flyTo({
      center: [lng, lat],
      zoom: 15,
      speed: 1.2,
      curve: 1,
      easing(t) {
        return t;
      },
    });
    console.log(`Address ${address} focused`);
  }
  function geocodeLocation() {
    const address = $('.input-wrapper__input').val();
    geocodingClient
      .forwardGeocode({
        query: address,
        mode: 'mapbox.places',
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        if (match.features.length > 0) {
          const lnglat = match.features[0].geometry.coordinates;
          console.log(lnglat);
          // Add marker to map
          const marker = new mapboxgl.Marker().setLngLat(lnglat).addTo(map);
          // Focus the marker
          map.flyTo({
            center: lnglat,
            zoom: 15,
            speed: 1.2,
            curve: 1.42,
            easing(t) {
              return t;
            },
          });
          $('.input-wrapper__input').val('');
          //
          $('<li/>')
            .append(
              $('<a/>')
                .addClass('address-link')
                .text(address)
                .attr({
                  'data-lng': lnglat[0],
                  'data-lat': lnglat[1],
                })
                .on('click', focusAddress)
            )
            .appendTo('.addressList ul');
        } else {
          console.log('Place cannot be located');
        }
      });
  }

  $('.input-wrapper__button').on('click', geocodeLocation);
  // Set accessToken and get geocode
});
