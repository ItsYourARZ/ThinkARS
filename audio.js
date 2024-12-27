const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';  // Change to pause icon
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';  // Change to play icon
  }
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Update duration when audio loads
audio.addEventListener('loadedmetadata', () => {
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

// Allow seeking by clicking on the progress bar
progressBarContainer.addEventListener('click', (e) => {
  const rect = progressBarContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const clickPercent = clickX / width;
  audio.currentTime = clickPercent * audio.duration;
});