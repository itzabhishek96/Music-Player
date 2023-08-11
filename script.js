let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

let track = document.createElement('audio');

let All_song = [
  {
    title: "Raataan Lambiyan",
    artist: "Arijit Singh",
    src: "media/Raatan Lambiyan(PagalWorld.com.se).mp3",
    imageSrc: "media/1.jpg"
  },
  {
    title: "Jaikal Mahakal",
    artist: "Amit Trivedi",
    src: "media/Jaikal Mahakal - Amit Trivedi, Suhas Sawant(Maddj.in).mp3",
    imageSrc: "media/6.jpg"
  },
  {
    title: "Aabaad Barbaad",
    artist: "Arijit Singh",
    src: "media/Aabaad Barbaad - Ludo 128 Kbps.mp3",
    imageSrc: "media/5.jpg"
  },
  {
    title: "Abhi Mujh Mein Kahin",
    artist: "Sonu Nigam",
    src: "media/Abhi Mujh Mein Kahin Agneepath 128 Kbps.mp3",
    imageSrc: "media/4.jpg"
  },
  {
    title: "O Bedardeya",
    artist: "Arijit Singh",
    src: "media/O Bedardeya Tu Jhoothi Main Makkaar 128 Kbps.mp3",
    imageSrc: "media/3.jpg"
  },
  {
    title: "Relaxed music",
    artist: "Abhi",
    src: "media/relaxing-music-with-flute-144016.mp3",
    imageSrc: "media/2.jpg"
  },
];

function load_track(index_no) {
  clearInterval(timer);
  reset_slider();

  track.src = All_song[index_no].src;
  title.innerHTML = All_song[index_no].title;
  track_image.src = All_song[index_no].imageSrc;
  artist.innerHTML = All_song[index_no].artist;
  track.load();

  timer = setInterval(range_slider, 1000);
  total.innerHTML = All_song.length;
  present.innerHTML = index_no + 1;
}

load_track(index_no);

function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}

function justplay() {
  if (Playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

function reset_slider() {
  slider.value = 0;
}

function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}

function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = All_song.length - 1;
    load_track(index_no);
    playsong();
  }
}

function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function autoplay_switch() {
 
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    auto_play.style.background = "#148f77";
  }
  next_song();
}

function range_slider() {
  let position = 0;

  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      if (index_no >= All_song.length) {
        index_no = 0;
      }
      load_track(index_no);
      playsong();
    }
  }
}

const showSongsBtn = document.getElementById('show_songs_btn');
showSongsBtn.addEventListener('click', (event) => {
  showSongsModal(event); // Pass the event object to the function
});

// Modal Functions
function showSongsModal(event) {
  const modal = document.getElementById('song_list');

  // Set the position of the popup near the button
  const btnRect = event.target.getBoundingClientRect();
  modal.style.top = `${btnRect.bottom}px`;
  modal.style.right = `${window.innerWidth - btnRect.right}px`;

  modal.style.display = 'block';
  loadSongList();
}

function hideSongsModal() {
  const modal = document.getElementById('song_list');
  modal.style.display = 'none';
}


function loadSongList() {
  const songListUl = document.getElementById('song_list_ul');
  songListUl.innerHTML = '';

  All_song.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${index + 1}. ${song.title} - ${song.artist}`;
    listItem.addEventListener('click', () => {
      index_no = index;
      load_track(index_no);
      playsong();
      hideSongsModal();
    });

    songListUl.appendChild(listItem);
  });
}
