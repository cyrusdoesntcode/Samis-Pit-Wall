/* ===================================================================
   main.js
   Written by Sami Shaharear Nur (ID: 25224560) for the web dev
   assignment. Loaded on index.html ONLY. Two things happen here:

   1) showWelcomeMessage() - builds a welcome banner with JS and
      drops it in at the top of the page (assignment part a).

   2) The Pit Stop Reaction Challenge - a small reaction-time game
      (assignment part c - the "new JS function" that takes user
      input). Real F1 pit crews change all four tyres in under
      2.5 seconds, so this compares your reflexes to that.
   =================================================================== */

// ---------- 1) Welcome message (index page only) -------------------
function showWelcomeMessage() {
	var hour = new Date().getHours();
	var greeting = "Good evening";
	if (hour < 12) {
		greeting = "Good morning";
	} else if (hour < 18) {
		greeting = "Good afternoon";
	}

	var banner = document.createElement("div");
	banner.className = "welcome-banner";
	banner.textContent = greeting + "! Welcome to my Red Bull Racing fan page \uD83C\uDFC1";

	var slot = document.getElementById("welcome-slot");
	slot.appendChild(banner);
}

// ---------- 2) Pit Stop Reaction Challenge --------------------------
// Game state
var pitState = "idle";      // idle | waiting | go
var pitTimeoutId = null;
var pitStartTime = null;

function startPitChallenge() {
	var light = document.getElementById("pit-light");
	var message = document.getElementById("pit-message");
	var startBtn = document.getElementById("pit-start-btn");
	var goBtn = document.getElementById("pit-go-btn");

	// Reset visuals. The React button is enabled from this point on so an
	// early click can actually reach reactPit() and be scored as a jump
	// start - a disabled button never fires click events in real browsers.
	light.style.background = "#e30118";
	light.style.boxShadow = "0 0 22px rgba(227,1,24,0.6)";
	message.innerHTML = "Wait for the light to turn green...";
	startBtn.disabled = true;
	goBtn.disabled = false;
	pitState = "waiting";

	// Random delay so you can't just count seconds - between 1.2s and 4s
	var delay = 1200 + Math.random() * 2800;
	pitTimeoutId = setTimeout(function () {
		light.style.background = "#3ecf3e";
		light.style.boxShadow = "0 0 26px rgba(62,207,62,0.75)";
		message.textContent = "GO! Click \"React!\" now!";
		pitStartTime = Date.now();
		pitState = "go";
		goBtn.disabled = false;
	}, delay);
}

function reactPit() {
	var light = document.getElementById("pit-light");
	var message = document.getElementById("pit-message");
	var startBtn = document.getElementById("pit-start-btn");
	var goBtn = document.getElementById("pit-go-btn");

	if (pitState === "waiting") {
		// Clicked before the light turned green - jump start
		clearTimeout(pitTimeoutId);
		message.textContent = "Jump start! A real pit crew would be sent home for that. Try again.";
		startBtn.disabled = false;
		goBtn.disabled = true;
		pitState = "idle";
		return;
	}

	if (pitState !== "go") {
		return;
	}

	var reactionMs = Date.now() - pitStartTime;
	var verdict;
	if (reactionMs < 250) {
		verdict = "Unreal - that's faster than most real F1 pit crews!";
	} else if (reactionMs < 400) {
		verdict = "Excellent! That is genuine pit-crew speed.";
	} else if (reactionMs < 600) {
		verdict = "Solid reflexes - a bit more practice and you'd be on the crew.";
	} else {
		verdict = "A little slow for the pit lane - give it another go!";
	}

	message.innerHTML = "Your reaction time: <strong>" + reactionMs + " ms</strong><br>" + verdict;
	light.style.background = "#fdd900";
	light.style.boxShadow = "0 0 22px rgba(253,217,0,0.6)";
	startBtn.disabled = false;
	goBtn.disabled = true;
	pitState = "idle";
}

// ---------- Wire everything up once the page has loaded -------------
document.addEventListener("DOMContentLoaded", function () {
	showWelcomeMessage();

	var startBtn = document.getElementById("pit-start-btn");
	var goBtn = document.getElementById("pit-go-btn");
	if (startBtn) {
		startBtn.addEventListener("click", startPitChallenge);
	}
	if (goBtn) {
		goBtn.addEventListener("click", reactPit);
	}
});
