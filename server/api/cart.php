<?php

if ($request['method'] === 'GET') {
    if ($_SESSION['cart_id']) {
        $currentCart = $_SESSION['cart_id'];
        $getAllCartItems = "select *
                            from cartItems
                            where cartId=$currentCart";
        $link = get_db_link();
        $result = $link->query($getAllCartItems);
        $allCartItems = $result->fetch_all(MYSQLI_ASSOC);
        
        $response['body'] = $allCartItems;
        send($response);

    } else {
        $response['body'] = [];
        send($response);
    }
}

function check_connection($link) {
    $sql = 'select 1';
    $link->query($sql);
    return 'Successfully connected!';
}

if ($request['method'] === 'POST') {
    $test = $request['query']['productId'];
    if ($test === null) {
        throw new ApiError('Valid productId required.', 400);
    }

    $link = get_db_link();
    $getPrice = "select `price`
            from `products`
            where `productId`=$test";
    
    $result = $link->query($getPrice);
    $productprice = ($result->fetch_assoc())['price'];

    if($_SESSION['cart_id']) {
        $cartId = $_SESSION['cart_id'];
        $addItemToCart = "insert into `cartItems` (cartId, productId, price)
        values ($cartId, $test, $productprice)";
        $result3 = $link->query($addItemToCart);
        $cartItemsId = $link->insert_id;

        $getCurrentItemInfo = "select cartItems.cartItemId, 
             products.productId,
             products.name,
             products.price,
             products.image,
             products.shortDescription
             from products
             join cartItems
             on products.productId = cartItems.productId
             where cartItems.productId = $test";
        $result4 = $link->query($getCurrentItemInfo);
        $currentItemInfo = $result4->fetch_all(MYSQLI_ASSOC);

        $response['body'] = $currentItemInfo;
        send($response);
    } else {
        $createNewCart = "insert into carts (createdAt) 
                    values (CURRENT_TIMESTAMP)";
        $result2 = $link->query($createNewCart);
        $cartId = $link->insert_id;
        $_SESSION['cart_id'] = $cartId;
    }
}