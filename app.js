
function loadSlots() {
  document.getElementById('game').innerHTML = '<button onclick="playSlot()">Luaj Slots (-10 kredi)</button><div id="result"></div>';
}

function playSlot() {
  let credit = parseInt(localStorage.getItem('credit') || '0');
  if (credit < 10) return alert('S’ke kredi!');
  credit -= 10;
  localStorage.setItem('credit', credit);
  const symbols = ['🍒','🍋','🔔'];
  const result = [0,0,0].map(() => symbols[Math.floor(Math.random()*symbols.length)]);
  const win = result[0] === result[1] && result[1] === result[2];
  if (win) credit += 50;
  localStorage.setItem('credit', credit);
  document.getElementById('result').innerHTML = result.join(' ') + '<br>Kredite: ' + credit + (win ? ' (+50 fitim!)' : '');
}

function loadSkedina() {
  fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: { "x-apisports-key": "21dd80f1836343fea4efd90f0adb566d" }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('game');
    if (data.response.length === 0) {
      container.innerHTML = 'Nuk ka ndeshje live.';
      return;
    }
    container.innerHTML = '';
    data.response.forEach(match => {
      const team1 = match.teams.home.name;
      const team2 = match.teams.away.name;
      const time = match.fixture.status.elapsed;
      const html = '<div><strong>' + team1 + ' vs ' + team2 + '</strong> - ' + time + '' <button onclick="bet('' + team1 + ' vs ' + team2 + '')">Vendos bast</button></div>';
      container.innerHTML += html;
    });
  });
}

function bet(match) {
  let credit = parseInt(localStorage.getItem('credit') || '0');
  if (credit < 5) return alert('S’ke mjaftueshëm kredi!');
  credit -= 5;
  localStorage.setItem('credit', credit);
  alert('Bast u vendos për: ' + match + '. Kredi mbetur: ' + credit);
}
