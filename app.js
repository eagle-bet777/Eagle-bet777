function goTo(type) {
  const user = localStorage.getItem('user');
  if (!user) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const credit = parseInt(localStorage.getItem('credit') || '0');
  if (type === 'slot') {
    if (credit < 10) {
      alert("Not enough credits to play.");
    } else {
      localStorage.setItem('credit', credit - 10);
      if (Math.random() > 0.7) {
        localStorage.setItem('credit', credit + 50);
        alert("🎉 You won 50 credits!");
      } else {
        alert("You lost 10 credits. Try again!");
      }
    }
  } else if (type === 'bet') {
    alert("⚽ Live betting feature coming soon!");
  }
}
