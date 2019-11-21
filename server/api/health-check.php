<?php

if ($request['method'] === 'GET') {
  $link = get_db_link();
  $message = check_connection($link);
  $response['body'] = [
    'message' => $message
  ];
  send($response);
}

function check_connection($link) {
  $sql = 'select *';
  $link->query($sql);
  return 'Successfully connected to MySQL!';
}
