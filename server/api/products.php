<?php

if ($request['method'] === 'GET') {
    if (isset($_GET['productId']) && is_numeric($_GET['productId'])) {
        $productNum = intval(($_GET['productId']));
        $link = get_db_link();
        $sql = "select `*` 
            from `products`
            where `productId`=$productNum";
        $result = $link->query($sql);
        $product = $result->fetch_assoc();
        if ($product === null) {
            throw new ApiError('Product with that id does not exist!', 404);
        }
        $response['body'] = $product;
        send($response);

    } else if (isset($_GET['productId']) && is_numeric($_GET['productId'])===false) {
        throw new ApiError('ProductId must be a valid number.', 400);
    } 
    else {
    $link = get_db_link();
    $sql = 'select `productId`, 
            `name`, 
            `price`,
            `image`,
            `shortDescription` 
       from `products`';
    $result = $link->query($sql);
    $products = $result->fetch_all(MYSQLI_ASSOC);
    $response['body'] = $products;
    send($response);    
    }
}
