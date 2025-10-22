<?php
$mysqli = new mysqli("localhost", "helloly79175522_admin", "admin@moxxl.eu", "helloly79175522_tickets");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB-Verbindung fehlgeschlagen"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $mysqli->prepare("INSERT INTO Tickets (Typ, Titel, Beschreibung, AbsenderID) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $data["typ"], $data["titel"], $data["beschreibung"], $data["absenderId"]);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "id" => $mysqli->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
