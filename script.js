//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root"); // ORIGINAL GIVEN CODE
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`; ORIGINAL GIVEN CODE
  
  const episodeContainer = document.getElementById("episodeContainer");

  const episode = document.createElement("ul");

  episodeList.forEach(episode => {
    let thisEpisode = document.createElement("li");
    thisEpisode.style.listStyle = "none";

    let heading = document.createElement("h1");
    episode["season"] < 10
      ? (heading.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`)
      : (heading.innerText = `${episode["name"]} - S${episode["season"]}E${episode["number"]}`);
    episode["number"] < 10
      ? (heading.innerText = `${episode["name"]} - S0${episode["season"]}E0${episode["number"]}`)
      : (heading.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`);
    thisEpisode.appendChild(heading);
    
    let thumb = document.createElement("img");
    thumb.src = episode["image"]["medium"];
    thisEpisode.appendChild(thumb);

    let summary = document.createElement("p");
    summary.innerText = episode["summary"].replace("<p>", "").replace("</p>", "");
    thisEpisode.appendChild(summary);

    episodeContainer.appendChild(thisEpisode)
  })
}

window.onload = setup;

