const template = ({ constructor, lifes, life_points, score }) => {
    return `
   <div class="player">
      <table>
          <thead>
              <tr>
                  <th colspan="3">${constructor}</th>
              </tr>
              <tr>
                  <th>Lifes</th>
                  <th>Life points</th>
                  <th>Score</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>${lifes}</td>
                  <td>${life_points}</td>
                  <td>${score}</td>
              </tr>
          </tbody>
      </table>
  </div>
  `
}

export default template