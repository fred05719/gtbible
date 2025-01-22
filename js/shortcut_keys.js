document.addEventListener('keydown', function (event) {

    if (event.altKey && event.code === 'KeyB') {
        event.preventDefault();  // Prevent the default browser save action

        query_verse.focus();
        query_verse.setSelectionRange(0, query_verse.value.length);
    }

    if (event.altKey && event.code === 'KeyN') {
        event.preventDefault();  // Prevent the default browser save action

        nextVerse();
    }

    if (event.altKey && event.code === 'KeyP') {
        event.preventDefault();  // Prevent the default browser save action

        prevVerse();
    }

    if (event.altKey && event.key === "Enter") {
        event.preventDefault();
        
        update_verse_btn.click();
    }

});

function copyAPI() {  

    let XMLUrl = 'http://gtbible.rf.gd/php/xml/bible.xml';
    navigator.clipboard.writeText(XMLUrl).then(() => {
        // Notify user that the text was copied
        alert('API Key URL has been copy to clipboard! You can paste it in VMix data source URL.');
    }).catch(err => {
        // Handle errors (if any)
        console.error('Error copying text: ', err);
    });
}