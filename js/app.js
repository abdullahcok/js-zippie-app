// listen for submit
document.querySelector('#zip-form').addEventListener('submit', getLocationInfo);

function getLocationInfo(e) {
// get zip value from input
  const zip = document.querySelectorAll('.zip').value;

  // console.log(zip);

  //make request
  fetch(`api.zippopotam.us/tr/${zip}`)
       .then(response => {
         if(response.status != 200){
           document.querySelector('#output').innerHTML =
           `
            <p class="text-danger invalid">Invalid zipcode, please enter valid one...</p>
           `;
           throw Error(response.statusText);
         }else{
           return response.json();
         }
       })
       .then(data => {
         // show location info
         let output = '';
         data.places.forEach(place => {
           output += `
            <article class="text-primary">
              <div class="info-header">
                <p>Location Info</p>
                <button class="delete"></button>
              </div>
              <div="info-text">
                <ul>
                  <li><strong>City: </strong>${place['place name']}</li>
                  <li><strong>State: </strong>${place['state']}</li>
                  <li><strong>Longtitute: </strong>${place['longtitute']}</li>
                  <li><strong>Latitude: </strong>${place['latitude']}place name</li>
                </ul>
              </div>
            </article>
           `;
         });



      // Insert into output div
      document.querySelector("#output").innerHTML = output;
    })
    .catch(err => console.log(err));

  e.preventDefault();
}

// Show check or remove icon
function showIcon(icon) {
  // Clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location box
function deleteLocation(e) {
  if (e.target.className == "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".zip").value = "";
    document.querySelector(".icon-check").remove();
  }
}
