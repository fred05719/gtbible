
let verse_id_holder = document.getElementById('verse_id');
let full_verse_holder = document.getElementById('full_verse');
let bible_version_holder = document.getElementById('bible_version');
let verse_content_holder = document.getElementById('verse_content');
let query_verse = document.getElementById('verse_search');
let auto_update_switch = document.getElementById('auto_update_verse');
let update_verse_btn = document.getElementById('update_verse_btn');
let isLive = document.getElementById('isLive');

let autoUpdateVerse = false;
let isVerseLive = false;
let liveID;

document.getElementById('bible_form').addEventListener('submit', function (event) {
    event.preventDefault();

    let first_split = (query_verse.value).split(" ");
    if (first_split.length > 1) {
        let bible_book;
        let chapVerse;
        if (first_split.length > 2) {
            bible_book = first_split[0]+''+first_split[1];
            chapVerse = first_split[2]
        } else {
            bible_book = first_split[0];
            chapVerse = first_split[1];

        }
        let second_split = chapVerse.split((/[:.]/));
        if (second_split.length > 1) {
            let bible_chapter = second_split[0];
            let bible_verse = second_split[1];
            queryVerse(bible_book, bible_chapter, bible_verse);
        } else {
            alert('No verse found!');
        }

    } else {
        alert('No verse found!');
    }

});

function queryVerse(book_name, book_chapter, book_verse) {


    const bible_data = { bible_book: book_name, bible_chapter: book_chapter, bible_verse: book_verse };

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open the POST request
    xhr.open('POST', 'php/search_verse.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Sending JSON data

    // Define what to do on successful response
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.status === 'SUCCESS') {

                verseFound(response.data[0]);


            } else {
                alert('No verse found!');
            }

        }
    };

    // Send the array as JSON
    xhr.send(JSON.stringify({ bible: bible_data }));

}

function verseFound(bible_data) {
    let bible_version = 'ANG DATING BIBLIA';
    console.log(bible_data);

    let full_verse = bible_data.book_name + ' ' + bible_data.chapter + ':' + bible_data.verse;

    verse_id_holder.innerHTML = bible_data.id;
    full_verse_holder.innerHTML = full_verse;
    bible_version_holder.innerHTML = bible_version;
    verse_content_holder.innerHTML = bible_data.text;

    sessionStorage.setItem('verse_id',bible_data.id);
    sessionStorage.setItem('bible_verse',full_verse);
    sessionStorage.setItem('bible_version',bible_version);
    sessionStorage.setItem('verse_content',bible_data.text);

    checkIfLive(bible_data.id);

    if (autoUpdateVerse) {
        sendDataToPHP(verse_id, full_verse, bible_version, bible_data.text);
    }
}

function updateVerseOnGT() {
    let final_verse_id = sessionStorage.getItem('verse_id');
    let final_fullverse = sessionStorage.getItem('bible_verse');
    let final_bible_version = sessionStorage.getItem('bible_version');
    let final_verse_content = sessionStorage.getItem('verse_content');

    if (final_fullverse != '' || final_bible_version != '' || final_verse_content != '') {
        sendDataToPHP(final_verse_id, final_fullverse, final_bible_version, final_verse_content);
    }
}


// Function to send data from JavaScript to PHP
function sendDataToPHP(verse_id, full_verse, version, content) {
    // Prepare data to send to PHP (in this case, an array of items)
    const bible_final_data = { id: verse_id, bible_verse: full_verse, bible_version: version, bible_content: content };

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open the POST request
    xhr.open('POST', 'php/data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Sending JSON data

    // Define what to do on successful response
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.status === 'SUCCESS') {
                // alert('success');
                console.log(response.data);
                isVerseLive = true;
                liveID = response.data.id;
                isLive.style.backgroundColor = 'red';

            } else {
                // alert('No verse found!');
                console.log(response.message);
            }

        }
    };

    // Send the array as JSON
    xhr.send(JSON.stringify({ bible: bible_final_data }));
}


function nextVerse() {
    let currentId = verse_id_holder.innerHTML;
    let nextId = parseInt(currentId) + 1;
    console.log(nextId);
    
    getBibleFromID(nextId);
}

function prevVerse() {
    let currentId = verse_id_holder.innerHTML;
    prevId = parseInt(currentId) - 1;
    if (prevId < 1) {
        alert('NO PREVIOUS VERSE!');
    } else {
        getBibleFromID(prevId);
    }
}

function getBibleFromID(id) {
    // Create a new AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/query.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send the row ID to the PHP script via POST
    xhr.send("verseID=" + id);

    // Handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.status === 'SUCCESS') {

                verseFound(response.data[0]);


            } else {
                alert('No verse found!');
            }

        }
    };
}


function switchChanged() {
    if (auto_update_switch.checked) {
        update_verse_btn.disabled = true;
        autoUpdateVerse = true;
    } else {
        update_verse_btn.disabled = false;
        autoUpdateVerse = false;
    }
}

function checkIfLive(id) {
    if (id != liveID) {
        isLive.style.backgroundColor = 'gray';
    } 

}