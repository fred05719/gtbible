<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


$data = json_decode(file_get_contents('php://input'), true);

function updateXMLData($data)
{
    $xml = simplexml_load_file('xml/bible.xml');

    // There is only one item, so we can directly access it
    $bible = $xml->Bible[0];

    // echo json_encode([
    //     'status' => 'ERROR',
    //     'message' => $xml->BibleVerse,
    // ]);

    // $sample = $data['bible_verse'].'|'.$data['bible_version'].'|'.$data['bible_content'];


    // // // Update the item's name and/or price based on the data passed
    if (isset($data['bible_verse'])) {
        $xml->BibleVerse = $data['bible_verse'];
    }
    if (isset($data['bible_version'])) {
        $xml->BibleVersion = $data['bible_version'];
    }

    if (isset($data['bible_content'])) {
        $xml->Content = $data['bible_content'];

    }


    $xml->asXML('xml/bible.xml');
    $verse_id = $data['id'];

    echo json_encode([
        'status' => 'SUCCESS',
        'message' => $xml->asXML(),
        'data' => [
            'verse_id' => $verse_id
        ]
    ]);

}

// Check if the POST request contains data
if (isset($data['bible'])) {
    // Decode the JSON data sent from JavaScript

    $bible = $data['bible'];

    updateXMLData($bible);
} else {
    echo json_encode([
        'status' => 'ERROR',
        'message' => 'No data',
    ]);
}

?>