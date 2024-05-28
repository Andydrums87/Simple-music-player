"use strict"

const audioFiles = [
  {
  songTitle: 'Lost In The City Lights',
  artist: 'Cosmo Sheldrake',
  img: 'cover-1.png',
  file: "lost-in-city-lights-145038.mp3",
  },
  {
  songTitle: 'Forest Lullaby',
  artist: 'Andrew Joseph',
  img: 'cover-2.png',
  file: 'forest-lullaby-110624.mp3',
  },
  ];
  
  const progressPlayer = document.getElementById("player_progress");
  const progress = document.getElementById("progress");
  const musicTime = document.querySelector(".music_time");
  const currentTime = document.getElementById("current_time");
  const duration = document.getElementById("duration")
  const playBtn = document.getElementById("play-btn");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const coverPhoto = document.getElementById("cover-photo");
  const title = document.getElementById("song-title");
  const artistName = document.getElementById("artist");

  
  const music = new Audio();
  
  let isPlaying = false;
  let musicIndex = 0;
  
  function togglePlay() {
  if (isPlaying) {
  pauseMusic();
  } else {
  playMusic();
  }
  }
  
  function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();

  }
  
  function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("pause", "title");
  music.pause();
  }
  
  function loadMusic (audioFiles) {
  music.src = audioFiles.file;
  title.textContent = audioFiles.songTitle;
  artistName.textContent = audioFiles.artist;
  coverPhoto.src = audioFiles.img;
  }
  
  function changeMusic(direction) {
  musicIndex = musicIndex + direction + (audioFiles.length % audioFiles.length);
  loadMusic(audioFiles[musicIndex]);
  pauseMusic();
  }

  function setProgressBar(e) {
    const width = progressPlayer.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width) * music.duration;
    
    
  }
  
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progress.style.width = `${ProgressPercent}%`;

}

function displayTime () {
  var minutes = Math.floor(music.currentTime / 60) + "";
  var seconds =  Math.floor(music.currentTime % 60) + "";
  if (seconds < 10) {
    currentTime.innerHTML = minutes + ":" + "0" + seconds
  } else {
    currentTime.innerHTML = Math.floor(music.currentTime / 60) + ":" +  Math.floor(music.currentTime % 60) + "";
  }

    duration.innerHTML = Math.floor(music.duration / 60) + ":" + Math.floor(music.duration % 60) + "";
    

    }

  const btnEvents = () => {
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", () => changeMusic(1));
  prevBtn.addEventListener("click", () => changeMusic(-1));

  progressPlayer.addEventListener("click", setProgressBar);
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  music.addEventListener("timeupdate", displayTime);
  };

  
  document.addEventListener("DOMContentLoaded", btnEvents);
  
  loadMusic(audioFiles[musicIndex]);