// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2402-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */

const state = {
  players: [],
};

const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(API_URL);
    const data = await response.json();
    state.players = data.data.players;
    // console.log(data);
    // console.log(state.players);
    return state.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async playerId => {
  try {
    // TODO
    const playerURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`;
    const response = await fetch(playerURL);
    const data = await response.json();
    console.log(data.data.player);
    return data.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
// fetchSinglePlayer(3718);

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async playerObj => {
  const { name, breed, status, imageUrl } = playerObj;

  try {
    // TODO
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, breed, status, imageUrl }),
    });

    const data = await response.json();
    console.log(data);
    return data;
    alert("Success");
    // location.reload();
    return data;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};
// addNewPlayer({
//   name: "LargeDog",
//   breed: "Cat",
//   status: "field",
//   imageUrl: "https://www.google.com/images/largeDog",
// });
/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async playerId => {
  console.log(playerId);
  try {
    // TODO
    const response = await fetch(API_URL + `/${playerId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // if (!response.ok) {
    //   // This will handle HTTP errors, not just network errors
    //   throw new Error(
    //     `Failed to delete player with ID ${playerId}, status code: ${response.status}`
    //   );
    // }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

// const player = [
//   {
//     id: 1,
//     name: "John Doe",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//   },
// ];

const renderAllPlayers = playerList => {
  // TODO
  if (!playerList) {
    return console.log("No new players available");
  }
  const main = document.querySelector("main");
  main.innerHTML = "";

  let row = document.createElement("div");
  row.className = "row";

  playerList.forEach((player, index) => {
    let card = document.createElement("div");
    card.classList = "card shadow cursor-pointer col-md-4";

    let cardBody = document.createElement("div");
    cardBody.classList =
      "card-body d-flex justify-content-center align-items-center flex-column cursor";

    let nameDisplay = document.createElement("h5");
    nameDisplay.innerText = player.name;
    nameDisplay.classList = "card-title";

    let idDisplay = document.createElement("p");
    idDisplay.innerText = `ID: ${player.id}`;
    idDisplay.classList = "card-text";

    let imgTag = document.createElement("img");
    imgTag.classList = "img-fluid rounded-start frontImage";
    imgTag.src = player.imageUrl;
    imgTag.alt = `Image of ${player.name}`;
    // console.log(player);
    // console.log(imgTag);

    const detailsButton = document.createElement("button");
    detailsButton.classList = "btn btn-primary";
    detailsButton.textContent = "See details";
    detailsButton.onclick = () => renderSinglePlayer(player);

    const removeButton = document.createElement("button");
    removeButton.classList = "btn btn-danger ms-2";
    removeButton.textContent = "Remove";
    // removeButton.onclick = () => {
    removeButton.addEventListener("click", () => {
      removePlayer(player.id);
      alert("Its been deleted.");
      location.reload();
    });

    cardBody.appendChild(nameDisplay);
    cardBody.appendChild(idDisplay);
    cardBody.appendChild(imgTag);
    cardBody.appendChild(detailsButton);
    cardBody.appendChild(removeButton);
    card.appendChild(cardBody);
    row.appendChild(card);

    if ((index + 1) % 3 === 0 || index + 1 === playerList.length) {
      main.appendChild(row);
      row = document.createElement("div");
      row.className = "row";
    }
  });
};
// renderAllPlayers(player);
// const { name, id, imageUrl } = fetchAllPlayers(playerList);

// const main = document.getElementById("main");
// main.innerText = `<p>${name}</p>``<p>${id}</p>``<p>${imageUrl}</p>`;

// console.log(name, id, imageUrl);

// const div = createElement("div");
// div = main;
// console.log(fetchAllPlayers(playerList));

// card.textContent = `<p>${name}</p>``<p>${id}</p>``<p>${imageUrl}</p>`;
// `<button>See details</button>``<button>Remove from roster</button>`;
// console.log("this is the renderAllPlayer", main);
// return main;
// };

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = player => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Create card element
  const card = document.createElement("div");
  card.classList = "card shadow-sm mb-3";

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.classList = "card-body";

  // Name display
  const nameDisplay = document.createElement("h5");
  nameDisplay.classList = "card-title";
  nameDisplay.textContent = player.name;

  // ID display
  const idDisplay = document.createElement("p");
  idDisplay.textContent = `ID: ${player.id}`;
  idDisplay.classList = "card-text";

  // Breed display
  const breedDisplay = document.createElement("p");
  breedDisplay.textContent = `Breed: ${player.breed || "Unknown"}`;
  breedDisplay.classList = "card-text";

  // Image display
  const imgTag = document.createElement("img");
  imgTag.classList = "img-fluid rounded photoIcon";
  imgTag.src = player.imageUrl;
  imgTag.alt = `Image of ${player.name}`;

  // Team name display
  const teamDisplay = document.createElement("p");
  teamDisplay.textContent = `Team: ${player.teamName || "Unassigned"}`;
  teamDisplay.className = "card-text";

  // Back to all players button
  const backButton = document.createElement("button");
  backButton.className = "btn btn-primary";
  backButton.textContent = "Back to all players";
  backButton.onclick = () => {
    // fetchAllPlayers().then(players => renderAllPlayers(players));
    location.reload(); // Fetch and render all players
  };

  // Append elements to the card body
  cardBody.appendChild(nameDisplay);
  cardBody.appendChild(idDisplay);
  cardBody.appendChild(breedDisplay);
  cardBody.appendChild(imgTag);
  cardBody.appendChild(teamDisplay);
  cardBody.appendChild(backButton);

  // Append the card body to the card
  card.appendChild(cardBody);

  // Append the card to the main container
  main.appendChild(card);
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    const form = document.querySelector("#new-player-form");
    const inputName = document.createElement("input");
    const inputBreed = document.createElement("input");
    const inputStatus = document.createElement("input");
    const inputImage = document.createElement("input");
    const inputSubmit = document.createElement("button");

    inputName.setAttribute("name", "name");
    inputBreed.setAttribute("name", "breed");
    inputStatus.setAttribute("name", "status");
    inputImage.setAttribute("name", "image");
    inputSubmit.setAttribute("type", "submit");
    // inputImage.classList = "frontImage";
    // inputStatus.attributes.name = "status";
    // inputImage.attributes.name = "image";
    // inputSubmit.attributes.id = "submit";

    const inputNameLabel = document.createElement("label");
    const inputBreedLabel = document.createElement("label");
    const inputStatusLabel = document.createElement("label");
    const inputImageLabel = document.createElement("label");

    inputNameLabel.textContent = "Name";
    inputBreedLabel.textContent = "Breed";
    inputStatusLabel.textContent = "Status";
    inputImageLabel.textContent = "Image";

    inputSubmit.textContent = "Submit";
    inputSubmit.id = "submit";

    const arrayInputs = [
      inputNameLabel,
      inputName,
      inputBreedLabel,
      inputBreed,
      inputStatusLabel,
      inputStatus,
      inputImageLabel,
      inputImage,
      inputSubmit,
    ];

    for (const el of arrayInputs) {
      form.appendChild(el);
    }

    inputSubmit.addEventListener("click", e => {
      e.preventDefault();

      const name = inputName.value;
      const breed = inputBreed.value;
      const status = inputStatus.value;
      const imageUrl = inputImage.value;
      // imageUrl.classList = "frontImage";

      console.log({ name, breed, status, imageUrl });
      addNewPlayer({ name, breed, status, imageUrl });
      // .then(response => {
      //   console.log("Player added:", response);
      // });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
