const token = "01589a01eaaa45c2a9a64f973692e731";
const baseUrl = "https://api.football-data.org/v4/competitions/2000";

function getStandings() {
  axios
    .get("https://api.football-data.org/v4/competitions/2000/standings", {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    })
    .then((res) => {
      const standings = res.data.standings;
      for (standing of standings) {
        let tableContent = "";
        for (row of standing.table) {
          tableContent += `
          <!-- TEAM -->
          <li class="list-group-item">
            <div class="row">
              <div
                class="col-4 col-sm-4 d-flex align-items-center justify-content-center"
              >
                <span class="flag">
                  <img
                    class="img-fluid rounded-circle me-3 border border-2"
                    src="${row.team.crest}"
                    alt=""
                  />
                </span>
                <h5 class="mb-0 ms-1">
                  <b>${row.team.tla}</b>
                </h5>
              </div>
              <div class="col-2 col-sm-2 text-center">${row.won}</div>
              <div class="col-2 col-sm-2 text-center">${row.lost}</div>
              <div class="col-2 col-sm-2 text-center">${row.draw}</div>
              <div class="col-2 col-sm-2 text-center"><b>${row.points}</b></div>
            </div>
          </li>
          `;
        }
        const content = `
        <div class="col-sm-12 col-md-6 mb-4">
            <div class="card shadow border-0">
              <div class="card-header bg-primary text-center">
                <b>${standing.group}</b>
              </div>
              <div class="row m-0 bg-secondary">
                <div class="col-4 col-sm-4 text-center">team</div>
                <div class="col-2 col-sm-2 text-center">W</div>
                <div class="col-2 col-sm-2 text-center">L</div>
                <div class="col-2 col-sm-2 text-center">D</div>
                <div class="col-2 col-sm-2 text-center">Pts</div>
              </div>
              <!-- TEAMS -->
              <ul class="list-group list-group-flush">
            ${tableContent}
              </ul>
              <!-- // TEAMS // -->
              <!-- // STANDINGS // -->
            </div>
          </div>
        `;
        document.getElementById("standings").innerHTML += content;
      }
    })
    .catch((error) => console.log(error));
}

function getMatches() {
  const matches = `${baseUrl}/matches`;
  axios
    .get(matches, {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    })
    .then((res) => {
      const matches = res.data.matches;
      for (match of matches) {
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;
        const utcDate = match.utcDate;
        const matchTime = new Date(utcDate);
        const matchInfo = matchTime.getHours();

        if (homeTeam.name == null) {
          continue;
        }

        const content = `
        <div class='row ms-3 me-3'>
        <!-- MATCHES COL -->
        <div class= 'container'>
        <div class="matches__card card shadow rounded-pill mb-4" style="overflow: hidden;">
        <div class="row card-body p-0">
          <!-- FIRST TEAM COL -->
          <div class="matches__col--first pt-3 pb-3 bg-primary d-flex flex-column align-items-center justify-content-center">
            <div class="flag">
              <img class="img-fluid rounded-circle" src="${
                homeTeam.crest
              }" alt=""
              style="width: 2rem; height: 2rem;" />
            </div>
            <h5 style="margin: auto 4px;">
              <b>${homeTeam.tla}</b>
            </h5>
          </div>
          <!--// FIRST TEAM COL //-->
          <!-- MATCH INFO -->
          <div class="d-flex align-items-center justify-content-around">
            <div class="score-1">
              <h3>
              ${match.score.fullTime.home ?? "SOON"}
              </h3>
            </div>
            <div class="time text-center">
              <h6 class= 'fw-bold pt-2'>${match.group ?? 'Match'}</h6>
              <h1>X</h1>
              <h6 class= 'fw-bold'>${matchInfo}:00</h6>
            </div>
            <div class="score-2">
            <h3>
            ${match.score.fullTime.away ?? "SOON"} 
            </h3>
            </div>
          </div>
          <!--// MATCH INFO //-->
            <!-- SECOND TEAM COL -->
            <div class="matches__col--second pt-3 pb-3 bg-primary d-flex flex-column align-items-center justify-content-center">
              <div class="flag">
                <img class="img-fluid rounded-circle" src="${
                  awayTeam.crest
                }" alt=""
                style="width: 2rem; height: 2rem;" />
              </div>
              <h5 style="margin: auto 4px;">
                <b>${awayTeam.tla}</b>
              </h5>
            </div>
            <!--// SECOND TEAM COL //-->
        </div>
        </div>
        <!--// MATCHES COL ///-->
        </div></div>
        `;
        document.getElementById("match").innerHTML += content;
      }
    });
}

getStandings();
getMatches();
