let playlist = [];
let currentSongIndex = 0;

async function fetchPlaylist() {
    try {
        const response = await fetch('/music');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        playlist = await response.json();
        if (playlist.length > 0) {
            loadSong(currentSongIndex);
        } else {
            console.error('No songs found in the playlist');
        }
    } catch (error) {
        console.error('Failed to fetch playlist:', error);
    }
}

function loadSong(index) {
    const audioPlayer = document.getElementById('audio-player');
    const song = playlist[index];
    if (song) {
        audioPlayer.src = `/music/${song}`;
        document.getElementById('song-title').textContent = song;
        document.getElementById('artist-name').textContent = 'Unknown Artist';
    } else {
        console.error('Song not found:', song);
    }
}

document.getElementById('prev').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    document.getElementById('audio-player').play();
});

document.getElementById('next').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    document.getElementById('audio-player').play();
});

document.getElementById('play-pause').addEventListener('click', () => {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play-pause').textContent = 'Pause';
    } else {
        audioPlayer.pause();
        document.getElementById('play-pause').textContent = 'Play';
    }
});

window.onload = fetchPlaylist;
