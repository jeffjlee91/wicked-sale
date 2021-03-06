<?php
if ($request['method'] === 'GET') {
    if ($_SESSION['cart_id']) {
        $currentCart = $_SESSION['cart_id'];
        $getAllCartItems = "select cartItems.cartItemId, 
        products.productId,
        products.name,
        products.price,
        products.image,
        products.shortDescription
        from products
        join cartItems
        on products.productId = cartItems.productId
        where cartItems.cartId = $currentCart";;
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
    if ($_SESSION['cart_id']) {
    } else {
        $createNewCart = "insert into carts (createdAt) 
                    values (CURRENT_TIMESTAMP)";
        $link = get_db_link();
        $result2 = $link->query($createNewCart);
        $cartId = $link->insert_id;
        $_SESSION['cart_id'] = $cartId;
    }
    $productId = $request['body']['productId'];
    if ($productId === null) {
        throw new ApiError('Valid productId required.', 400);
    }

    $link = get_db_link();        
    $getPrice = "select `price`
            from `products`
            where `productId`=$productId";
    
    $result = $link->query($getPrice);
    $productprice = ($result->fetch_assoc())['price'];
        
    $cartId = $_SESSION['cart_id'];
    $addItemToCart = "insert into `cartItems` (cartId, productId, price)
    values ($cartId, $productId, $productprice)";
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
             where cartItems.productId = $productId";
    $result4 = $link->query($getCurrentItemInfo);
    $currentItemInfo = $result4->fetch_assoc();

    $response['body'] = $currentItemInfo;
    send($response);
    
}