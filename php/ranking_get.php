<?php
$encoding = 'UTF-8';
mb_internal_encoding($encoding);
ini_set('mbstring.internal_encoding', $encoding);
ini_set('mbstring.script_encoding', $encoding);
header("Content-Type: application/json; charset={$encoding}");

if(isset($_GET["ranking"]) && !preg_match('/[^0-9]/', $_GET["ranking"])) {
    // numをエスケープ(xss対策)
    $param = htmlspecialchars($_GET["ranking"]);

    $db_name = '../database/ranking.sqlite3';

    try {

      $arr["status"] = "yes";
      $db = new SQLite3($db_name);

    } catch (Exception $e) {

      $arr["status"] = "no";
      $arr["error"] = "DB接続エラー";

      print json_encode($arr, JSON_PRETTY_PRINT);
    }

    $stmt = $db->prepare("SELECT name, score FROM ranking;");

    $results = $stmt->execute();

    $result_array = array();

    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
      // print_r($row);
      $result_array[$row["name"]] = $row["score"];
    }

    // print_r($result_array);
    $arr["result"] = $result_array;

} elseif(count($_GET) > 1) {

  $get_array = array();

  foreach ($_GET as $key => $value) {
    $get_array[$key] = $value;
  }

  if (array_key_exists('token', $get_array)) {

    if ($get_array["token"] === "MerryAmor") {

      try {

        $arr["status"] = "yes";
        $db = new SQLite3($db_name);

      } catch (Exception $e) {

        $arr["status"] = "no";
        $arr["error"] = "DB接続エラー";

        print json_encode($arr, JSON_PRETTY_PRINT);
      }

      $stmt = $db->prepare("INSERT INTO ranking (name, score) VALUES (?,?);");

      $stmt->bindValue(1, $get_array["name"], SQLITE3_TEXT);
      $stmt->bindValue(2, $get_array["score"], SQLITE3_TEXT);
      $results = $stmt->execute();

      $result_array = array();


    } else {

      $arr["status"] = "no";
      $arr["error"] = "認証エラー";

    }

  } else {

    $arr["status"] = "no";
    $arr["error"] = "認証エラー";

  }

} else {
    $arr["status"] = "no";
}

print json_encode($arr, JSON_PRETTY_PRINT);

?>
