<?php

// database connection variables
$dsn = 'sqlite:bibles/ANG_DATING_BIBLIA.db';
$user = null;
$password = null;

$data = json_decode(file_get_contents('php://input'), true);

// Check if 'users' key exists in the received data
if (isset($data['bible'])) {

$bible = $data['bible'];
$book_name = strtoupper($bible['bible_book']);
$book_chapter = $bible['bible_chapter'];
$book_verse = $bible['bible_verse'];

  // create PDO connection
  try {
    $pdo = new PDO($dsn, $user, $password);
  } catch (PDOException $e) {
    // handle connection errors
    echo 'Connection failed: ' . $e->getMessage();
  }

  // prepare SQL statement
  $stmt = $pdo->prepare("SELECT * FROM bible WHERE (UPPER(book_name) = '$book_name' OR UPPER(book_abbr) = '$book_name') AND chapter = $book_chapter AND verse = $book_verse");

  // bind parameters
  // $value = $_GET['value'];
  // $stmt->bindParam(':value', $value);

  // execute SQL statement
  $stmt->execute();

  // retrieve data
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


  echo json_encode([
    'status' => 'SUCCESS',
    'message' => 'Verse found!',
    'data' => $result
  ]);
  // // return data in JSON format
  // echo json_encode(value: $result);

}

// $book_name = strtoupper('roma');
// $book_chapter = 1;
// $book_verse = 1;




?>