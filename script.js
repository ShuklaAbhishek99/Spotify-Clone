// Initialization
const audioElement = new Audio("./songs/1.mp3");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const masterSongName = document.getElementById("masterSongName");
const songItems = Array.from(document.getElementsByClassName("songItem"));
let songIndex = 0;

const songs = [
    {
        songName: "Ada Garam Masala",
        filePath: "songs/1.mp3",
        coverPath: "covers/1.jpg",
    },
    {
        songName: "Ada Remix Garam Masala",
        filePath: "songs/2.mp3",
        coverPath: "covers/2.jpg",
    },
    {
        songName: "Bhar Do Jholi Meri - Bajrangi Bhaijaan",
        filePath: "songs/3.mp3",
        coverPath: "covers/3.jpg",
    },
    {
        songName: "Chori Chori Dil Le Gaya Garam Masala",
        filePath: "songs/4.mp3",
        coverPath: "covers/4.jpg",
    },
    {
        songName: "Chori Chori Dil Le Gayi Punjabi Mc Garam Masala",
        filePath: "songs/5.mp3",
        coverPath: "covers/5.jpg",
    },
    {
        songName: "Dil Samander Garam Masala",
        filePath: "songs/6.mp3",
        coverPath: "covers/6.jpg",
    },
    {
        songName: "Falak Dekhun Sonu Nigam Garam Masala",
        filePath: "songs/7.mp3",
        coverPath: "covers/7.jpg",
    },
    {
        songName: "Kiss Me Baby Remix Garam Masala",
        filePath: "songs/8.mp3",
        coverPath: "covers/8.jpg",
    },
    {
        songName: "Kiss Me Baby Title Song Garam Masala",
        filePath: "songs/9.mp3",
        coverPath: "covers/9.jpg",
    },
    {
        songName: "No Copyright Song",
        filePath: "songs/10.mp3",
        coverPath: "covers/10.jpg",
    },
];

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handling play/pause
masterPlay.addEventListener("click", (e) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// listening to events
// updating seekbar/progress bar (updated by self)
audioElement.addEventListener("timeupdate", () => {
    // console.log("timeupdate");
    // converting play duration to percentage
    let progress = parseInt(
        (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
});

// progress bar drag change with cursor changes current time (updated by user)
myProgressBar.addEventListener("change", () => {
    // converting play duration percent to current duration
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
});

// making all play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
        (element) => {
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
        }
    );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
        element.addEventListener("click", (e) => {
            const songIndex = parseInt(e.target.id);
            makeAllPlays();
            // after making all plays one gets playing
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        });
    }
);

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
