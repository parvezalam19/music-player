const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const VolumeBar =  document.getElementById('volume-bar')
const VolumeProgress =  document.getElementById('volume-progress')

const songs = [
  {
    name: "kk1",
    displayName: "Pal",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk2",
    displayName: "Khuda Jane",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk3",
    displayName: "Thadap Thadap",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk4",
    displayName: "Kya mujhe pyaar hain ",
    artist: "Krishnakumar Kunnath(KK)",
  },
];

let isPlaying = false;
function playSong() {
  // progressBar();
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
}

// playBtn.addEventListener('click' , playSong)

function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function progressBar(e) {
  //   console.log(music.duration);
  progress.style.width = `${(music.currentTime / music.duration) * 100}%`;
const {currentTime , duration} = e.target;
 const durationMinutes =  Math.floor(duration/60)
const durationseconds = Math.floor(duration%60)
console.log(durationMinutes);
if(durationseconds){
    durationEl.textContent =`${durationMinutes} : ${durationseconds}`;

}
let currentMinutes = Math.floor(currentTime/60)
let currentseconds =  Math.floor(currentTime%60)

    if(currentseconds<10){
        currentseconds=`0${currentseconds}`
      }
    currentTimeEl.textContent = `${currentMinutes} : ${currentseconds}`
 

// console.log(e)





}

music.addEventListener("timeupdate", progressBar);

function loadSongs(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
let songIndex = 0; //0
function previousSong() {
  songIndex = songIndex - 1; //-1
  if (songIndex < 0) {
    songIndex = songs.length - 1; //4-1//3
  }
  loadSongs(songs[songIndex]); //songs[1]
  playSong();
}
function nextSong() {
  //3
  songIndex = songIndex + 1; //3+1 =4
  if (songIndex > songs.length - 1) {
    songIndex = 0; //4-1
  }
  loadSongs(songs[songIndex]); //songs[1]
  playSong();
}

prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);


function volumecontrol(e){

let volume= e.offsetX/VolumeBar.clientWidth
VolumeProgress.style.width=`${volume*100}%`
music.volume=volume
const VolumeIcon = document.getElementById('volume-icon')

VolumeIcon.style.color = '#242323'
if(volume<0.1){
    volume=0
    VolumeIcon.style.color = 'gray'
}
if(volume>0.9){
    volume=1
}


}

VolumeBar.addEventListener('click' , volumecontrol)


function progressUpdater(e){
const updater =  e.offsetX/progressContainer.clientWidth;
progress.style.width = `${updater*100}%`
music.currentTime = updater* music.duration
}

progressContainer.addEventListener('click' , progressUpdater)