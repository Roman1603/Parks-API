"use strict";

// keyAPI and URL
const api_key = "yaiKgqrLSPyQhcq5ytnDQWAHDK3ESlpzbouZcadD";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//Display Results
function displayResults(responseJson) {
  let arrayState = responseJson.data;
  $("#results-list").empty();
  arrayState.forEach(x =>
    $("#results-list").append(
      `            <li>
            <h3>${x.fullName}</h3>
            <p>${x.description}</p>
            <p>${x.directionsInfo}</p>
            <p>URL: <a href="${x.url}" target="_blank">${x.url}</a></p>
            <p>Directions Info: <a href="${x.directionsUrl}" target="_blank">${x.directionsUrl}</a></p>
        </li>,`
    )
  );
  $("#results").removeClass("hidden");
}

//GetParkLocation
function getParkInfo(query, maxResults = 10) {
  const params = {
    api_key,
    stateCode: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

//Event Listener
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParkInfo(searchTerm, maxResults);
  });
}

$(watchForm);
