<?php

// database connection variables
$dsn = 'sqlite:bibles/ANG_DATING_BIBLIA.db';
$user = null;
$password = null;

$verse_id = $_POST['verseID'];

// create PDO connection
try {
  $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
  // handle connection errors
  echo 'Connection failed: ' . $e->getMessage();
}

// prepare SQL statement
$stmt = $pdo->prepare("SELECT * FROM bible WHERE id = $verse_id");

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


?>