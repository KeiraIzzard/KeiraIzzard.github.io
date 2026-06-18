const trackList = [
    {
      src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/erokia_ambient-wave-56-msfxp7-78.mp3",
      title: "Ambient Wave",
      artist: "Erokia"
    },
    {
      src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
      title: "Hes",
      artist: "p-hase"
    },
    {
      src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
      title: "Leapt",
      artist: "p-hase"
    }
  ];
  
  const myAudio       = document.querySelector("#my-audio");
  const progressBar   = document.querySelector("#progress-bar");
  const playPauseBtn  = document.querySelector("#play-pause-button");
  const playPauseImg  = document.querySelector("#play-pause-img");
  const muteBtn       = document.querySelector("#mute-unmute-button");
  const muteImg       = document.querySelector("#mute-unmute-img");
  const fastFwdBtn    = document.querySelector("#fast-forward-button");
  const fullscreenBtn = document.querySelector("#fullscreen-button");
  const heartBtn      = document.querySelector("#heart-button");
  const likesDisplay  = document.querySelector("#likes");
  const songTitle     = document.querySelector(".song-information h1");
  const songArtist    = document.querySelector(".song-information p");
  const vinylImg      = document.querySelector(".vinyl-record img");
  
  myAudio.addEventListener("timeupdate", function () {
    const percent = (myAudio.currentTime / myAudio.duration) * 100;
    progressBar.style.width = percent + "%";
  });
  
  playPauseBtn.addEventListener("click", togglePlayback);
  
  function togglePlayback() {
    if (myAudio.paused || myAudio.ended) {
      myAudio.play();
      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
      vinylImg.style.animationPlayState = "running";
    } else {
      myAudio.pause();
      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
      vinylImg.style.animationPlayState = "paused";
    }
  }
  
  muteBtn.addEventListener("click", toggleAudio);
  
  function toggleAudio() {
    if (myAudio.muted) {
      myAudio.muted = false;
      muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    } else {
      myAudio.muted = true;
      muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    }
  }
  
  fastFwdBtn.addEventListener("click", fastForward);
  
  function fastForward() {
    if (myAudio.playbackRate === 1.0) {
      myAudio.playbackRate = 2.0;
    } else {
      myAudio.playbackRate = 1.0;
    }
  }
  
  document.querySelector("#track1-button").addEventListener("click", function () {
    playTrack(0);
  });
  document.querySelector("#track2-button").addEventListener("click", function () {
    playTrack(1);
  });
  document.querySelector("#track3-button").addEventListener("click", function () {
    playTrack(2);
  });
  
  function playTrack(index) {
    const track = trackList[index];
    myAudio.src = track.src;
    myAudio.load();
    myAudio.play();
    songTitle.textContent  = track.title;
    songArtist.textContent = track.artist;
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    vinylImg.style.animationPlayState = "running";
  }
  
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  
  let likes = 0;
  heartBtn.addEventListener("click", updateLikes);
  
  function updateLikes() {
    likes++;
    likesDisplay.textContent = likes;
  }
  
  let timerInterval = null;
  let timeLeft = 25 * 60;
  
  const timerDisplay = document.querySelector("#timer-display");
  const timerStartBtn = document.querySelector("#timer-start");
  const timerResetBtn = document.querySelector("#timer-reset");
  
  timerStartBtn.addEventListener("click", toggleTimer);
  timerResetBtn.addEventListener("click", resetTimer);
  
  function toggleTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStartBtn.textContent = "Start";
    } else {
      timerInterval = setInterval(countDown, 1000);
      timerStartBtn.textContent = "Pause";
    }
  }
  
  function countDown() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.textContent = "Done!";
      timerStartBtn.textContent = "Start";
      return;
    }
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = minutes + ":" + String(seconds).padStart(2, "0");
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    timerDisplay.textContent = "25:00";
    timerStartBtn.textContent = "Start";
  }