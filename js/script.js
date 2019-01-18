// Listen for events
document.querySelector('#zip-form').addEventListener('submit', getLocation);
// Listen for delete
document.querySelector('body').addEventListener('click', deleteLocation);

// Defining function
function getLocation(e) {
  // Prevent default behaviour
  e.preventDefault();

  // Get value from input
  const zip = document.querySelector('#zip').value;

  // Make request
  fetch(`http://api.zippopotam.us/bd/${zip}`)
    .then(res => {
      // Checking status
      if (res.status == 200) {
        // Show icon
        showIcon('check');
        // Returning response
        return res.json()
      } else {
        // Show icon
        showIcon('remove');
        // Show alert on invalid input
        document.querySelector('.output').innerHTML = `
        <div class="alert alert-danger" role="alert">
          <strong>Invalid zipcode. Please try again</strong>
        </div>
        `;
        // Throw error at console
        throw Error(res.statusText);
      }
    })
    .then(data => {
      let output = '';
      let postCode = data['post code'];
      data.places.map(place => {
        output += `
          <article class="card bg-success border-success">
            <div class="card-header white-text d-flex justify-content-between align-items-center">
              <h1 class="h1-reponsive font-bold card-title">Location Info</h1>
              <i id="delete" class="fa fa-remove" style="cursor: pointer"></i>
            </div>
            
              <ul class="list-group .list-group-flush">
                <li class="list-group-item"><strong>Post code: </strong>${postCode}</li>
                <li class="list-group-item"><strong>City: </strong>${place['place name']}</li>
                <li class="list-group-item"><strong>State: </strong>${place.state}</li>
                <li class="list-group-item"><strong>Longtitude: </strong>${place.longitude ? place.longitude : 'Not any'}</li>
                <li class="list-group-item"><strong>Latitude: </strong>${place.latitude ? place.latitude : 'Not any'}</li>
              </ul>
            
          </article>
        `
      });
      document.querySelector('.output').innerHTML = output;
      document.querySelector('#zip-form').reset();
    })
    .catch(err => console.log(err))
}

// Show icon
function showIcon(icon) {
  console.log(icon)
  // Clear icons
  document.querySelector('.icon-remove').style = "opacity: 0; display: none";
  document.querySelector('.icon-check').style = "opacity: 0; display: none";
  // Show corect icon
  document.querySelector(`.icon-${icon}`).style = "opacity: 1; display: flex";
  // Removing alert after 3s
  setTimeout(() => {
    document.querySelector(`.icon-${icon}`).style = "opacity: 0; display: none";
    if (icon == 'remove') document.querySelector('.alert').style.display = 'none';
  }, 3000)
}

// Delete Location
function deleteLocation(e) {
  if (e.target.id == 'delete') {
    e.target.parentElement.parentElement.remove()
  }
}