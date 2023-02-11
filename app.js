console.log('Starting');

//Initialize the Variables\
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPLay = document.getElementById('masterPLay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {
    songName: 'Baby Song by Emiway Bantai and Young Galib',
    filePath: 'songs/1.mp3',
    coverPath: 'covers/1.jpg',
  },
  {
    songName: 'Ektarfa by King ',
    filePath: 'songs/2.mp3',
    coverPath: 'covers/2.jpg',
  },
  {
    songName: 'Maar Dala x Divine Drill remix',
    filePath: 'songs/3.mp3',
    coverPath: 'covers/3.jpg',
  },
  {
    songName: 'Mere Warga by KaKa',
    filePath: 'songs/4.mp3',
    coverPath: 'covers/4.jpg',
  },
  {
    songName: 'Silsila ye Chaahat ka prod.by: MXTON',
    filePath: 'songs/5.mp3',
    coverPath: 'covers/5.jpg',
  },
  {
    songName: 'Kalesh Chhori',
    filePath: 'songs/6.mp3',
    coverPath: 'covers/6.jpg',
  },
  
];

songsItems.forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// audioElement.play();

// Hnadle play/pause click
masterPLay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPLay.classList.remove('fa-play-circle');
    masterPLay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPLay.classList.remove('fa-pause-circle');
    masterPLay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
  // update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPLay ')).forEach(
    (element) => {
      element.classList.remove('fa-circle-pause');
      element.classList.add('fa-circle-play');
    }
  );
};

Array.from(document.getElementsByClassName('songItemPLay ')).forEach(
  (element) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = `songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex-1].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPLay.classList.remove('fa-play-circle');
      masterPLay.classList.add('fa-pause-circle');
    });
  }
);

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=6){
    songIndex = 0
  }else{
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex-1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPLay.classList.remove('fa-play-circle');
  masterPLay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex = 0
  }else{
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex-1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPLay.classList.remove('fa-play-circle');
  masterPLay.classList.add('fa-pause-circle');
})