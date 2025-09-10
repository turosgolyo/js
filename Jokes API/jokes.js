function getRandom() {
  fetch("https://official-joke-api.appspot.com/jokes/random", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((joke) => {
      document.getElementById(
        "jokes"
      ).innerHTML = `<div class="joke">Type: ${joke.type}<br>${joke.setup} - ${joke.punchline}</div>`;
    });
}

function getById() {
  let id = document.getElementById("id").value;

  fetch(`https://official-joke-api.appspot.com/jokes/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((joke) => {
      document.getElementById(
        "jokes"
      ).innerHTML = `<div class="joke">Type: ${joke.type}<br>${joke.setup} - ${joke.punchline}</div>`;
    });
}

function getByType() {
  let type = document.getElementById("type").value;

  fetch(`https://official-joke-api.appspot.com/jokes/${type}/random`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((joke) => {
      document.getElementById(
        "jokes"
      ).innerHTML = `<div class="joke">Type: ${joke[0].type}<br>${joke[0].setup} - ${joke[0].punchline}</div>`;
    });
}
