const template = (obj) => {
    return `
   <div class="player">
      <table>
          <thead>
              <tr>
                  <th colspan="9">${obj.constructor}</th>
              </tr>
              <tr>
                  <th colspan="2">
                  Lose<br>Tied<br>Win</th>
                  <th>Chase Effect</th>
                  <th>Chase Opponent</th>
                  <th>Run Away</th>
                  <th>Population</th>
                  <th>Average Score</th>
                  <th>Higher Score</th>
                  <th>Generation</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td colspan="2">${obj.info.lose}<br>${obj.info.tied}<br>${obj.info.win}</td>
                  <td>${obj.info.chase_effect}</td>
                  <td>${obj.info.chase_opponent}</td>
                  <td>${obj.info.run_away}</td>
                  <td>${obj.population}</td>
                  <td>${obj.average_score}</td>
                  <td>${obj.info.high_score}</td>
                  <td>${obj.generation}</td>
              </tr>
          </tbody>
      </table>
  </div>
  `
}

export default template