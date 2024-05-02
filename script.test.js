const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach(player => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let player;
  beforeAll(async () => {
    player = await fetchSinglePlayer(4512);
  });

  test("return single player ID", async () => {
    expect(player.id).toEqual(4512);
  });
});

// TODO: Tests for `addNewPlayer`
describe("addNewPlayer", () => {
  test("check to see if its been success", async () => {
    const player = await addNewPlayer({
      name: "Joo",
      breed: "Dog",
      status: "field",
      imageUrl:
        "https://img.huffingtonpost.com/asset/55b7c8541700002600565bf4.jpeg?ops=scalefit_960_noupscaleGoogle.com/dog.jpg",
    });

    expect(player.success).toBe(true);
  });
});

// (Optional) TODO: Tests for `removePlayer`
describe("removePlayer", () => {
  test("check to see if the player is available to delete", async () => {
    const player = await removePlayer(4503);
    expect(player.success).toBe(true);
  });
});
