$(document).ready(function () {
  // set api token
  L.mapbox.accessToken =
    'pk.eyJ1IjoiZmlscGhhc3RlciIsImEiOiJjazljYW92YnUwMHc3M2VubXRvenM1ZW9pIn0.6weVhlfhHOB-uKhcmRsvVA';
  // initialize map
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  // initialize geocoder
  const geocoder = L.mapbox.geocoder('mapbox.places');
  /* 
    === Function Defs ===
  */
  // Focus map on previously entered address.
  function focusAddress() {
    const address = $(this).text();
    const lat = $(this).data('lat');
    const lng = $(this).data('lng');
    mymap.setView([lat, lng], 15);
    console.log(`Address ${address} focused`);
  }
  // prints coordinates, adds to list of addresses, and puts marker on map.
  function printLocation(err, data) {
    let latlng;
    const address = $('.input-wrapper__input').val();
    console.log(`Address:  ${address}`);
    if (err) return console.error(err.stack);
    if (data.latlng) {
      console.log(data.latlng);
      latlng = data.latlng;
      L.marker(data.latlng).addTo(mymap);
      mymap.setView(latlng, 15);
      $('.input-wrapper__input').val('');
      $('<li/>')
        .append(
          $('<a/>')
            .addClass('address-link')
            .text(address)
            .attr({
              'data-lat': latlng[0],
              'data-lng': latlng[1],
            })
            .on('click', focusAddress)
        )
        .appendTo('.addressList ul');
    } else {
      console.log('Place could not be located');
    }
  }
  async function geocodeLocation() {
    const address = $('.input-wrapper__input').val();
    geocoder.query(address, printLocation);
  }

  // add tiler to map
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiZmlscGhhc3RlciIsImEiOiJjazljYW92YnUwMHc3M2VubXRvenM1ZW9pIn0.6weVhlfhHOB-uKhcmRsvVA',
    }
  ).addTo(mymap);

  $('.input-wrapper__button').on('click', geocodeLocation);
  // Set accessToken and get geocode
});
