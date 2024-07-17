// Dummy song data (for demonstration)
let songs = [
    { title: "Rolling in the Deep", artist: "Adele", album: "21", genre: "Pop", duration: "3:48" },
    { title: "Yesterday", artist: "The Beatles", album: "Help!", genre: "Rock", duration: "2:04" },
    { title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", duration: "5:55" },
    { title: "Shape of You", artist: "Ed Sheeran", album: "÷", genre: "Pop", duration: "3:53" },
    { title: "Despacito", artist: "Luis Fonsi", album: "Vida", genre: "Reggaeton", duration: "3:48" }
];

// Function to render song list
function renderSongList(songs) {
    const songListDiv = document.getElementById("songList");
    songListDiv.innerHTML = ""; // Clear previous content

    songs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.innerHTML = `
            <p><strong>Title:</strong> ${song.title}</p>
            <p><strong>Artist:</strong> ${song.artist}</p>
            <p><strong>Album:</strong> ${song.album}</p>
            <p><strong>Genre:</strong> ${song.genre}</p>
            <p><strong>Duration:</strong> ${song.duration}</p>
        `;
        songListDiv.appendChild(songItem);
    });
}

// Function to perform binary search on songs by title
function binarySearch(songs, title) {
    let low = 0;
    let high = songs.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let midTitle = songs[mid].title.toLowerCase();

        if (midTitle === title.toLowerCase()) {
            return mid; // Found the song at index mid
        } else if (midTitle < title.toLowerCase()) {
            low = mid + 1; // Search the right half
        } else {
            high = mid - 1; // Search the left half
        }
    }

    return -1; // Song not found
}

// Function to insert a new song into the sorted array by title
function insertSong(song) {
    // Find the position to insert using binary search
    let pos = 0;
    let low = 0;
    let high = songs.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let midTitle = songs[mid].title.toLowerCase();

        if (midTitle < song.title.toLowerCase()) {
            low = mid + 1;
            pos = low;
        } else {
            high = mid - 1;
        }
    }

    // Insert the song at the calculated position
    songs.splice(pos, 0, song);
}

// Function to delete a song by title
function deleteSong(title) {
    let index = binarySearch(songs, title);
    if (index !== -1) {
        songs.splice(index, 1); // Remove the song at index
    }
}

// Function to handle form submission for adding a song
function addSongFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newSong = {
        title: form.title.value.trim(),
        artist: form.artist.value.trim(),
        album: form.album.value.trim(),
        genre: form.genre.value.trim(),
        duration: form.duration.value.trim()
    };

    insertSong(newSong);
    renderSongList(songs);

    // Clear the form fields after submission
    form.reset();
}

// Function to handle search by title
function searchSong() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    if (searchInput === "") {
        renderSongList(songs); // Show all songs if search input is empty
        return;
    }

    const searchResult = songs.filter(song => song.title.toLowerCase().includes(searchInput));
    renderSongList(searchResult);
}

// Event listener for the form submission
const addSongForm = document.getElementById("addSongForm");
addSongForm.addEventListener("submit", addSongFormSubmit);

// Initial rendering of all songs
renderSongList(songs);
