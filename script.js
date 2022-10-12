//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root"); // ORIGINAL GIVEN CODE
  let howManyEpisodes = document.createElement("p");
  howManyEpisodes.innerText = `Got ${episodeList.length} episode(s)`
  howManyEpisodes.style.color = "red"
  rootElem.appendChild(howManyEpisodes)
  
  const episodeContainer = document.getElementById("episodeContainer");
  
  episodeList.forEach(episode => {
    let thisEpisode = document.createElement("article");
    thisEpisode.setAttribute("id", "episode");

    let heading = document.createElement("h1");
    heading.setAttribute("id", "heading")
    episode["season"] < 10
      ? (heading.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`)
      : (heading.innerText = `${episode["name"]} - S${episode["season"]}E${episode["number"]}`);
    episode["number"] < 10
      ? (heading.innerText = `${episode["name"]} - S0${episode["season"]}E0${episode["number"]}`)
      : (heading.innerText = `${episode["name"]} - S0${episode["season"]}E${episode["number"]}`);
    thisEpisode.appendChild(heading);
    
    let thumb = document.createElement("img");
    thumb.setAttribute("id", "thumb");
    thumb.src = episode["image"]["medium"];
    thisEpisode.appendChild(thumb);

    let summary = document.createElement("p");
    summary.setAttribute("id", "thumb");
    summary.innerText = episode["summary"].replace("<p>", "").replace("</p>", "");
    thisEpisode.appendChild(summary);

    episodeContainer.appendChild(thisEpisode)
  })
}

window.onload = setup;

