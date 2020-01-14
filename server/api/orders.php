<?php

if($request['method']==='POST') {
    if ($_SESSION['cart_id']=== undefined) {
       throw new ApiError ('An active cart is required!',400); 
    }
    else {
        if ($request['body']['name']===undefined) {
            throw new ApiError ('The client is missing the name', 400);
        } else if ($request['body']['creditCard']===undefined) {
            throw new ApiError ('The client is missing credit card information', 400);
        } else if ($request['body']['shippingAddress']===undefined) {
            throw new ApiError ('The client is missing the shipping address', 400);
        } else {
            $cartId = $_SESSION['cart_id'];
            $name = $request['body']['name'];
            $creditCard = $request['body']['creditCard'];
            $shippingAddress = $request['body']['shippingAddress'];
            
            $sqlInsertInfo = 
                'INSERT INTO orders (cartId, name, creditCard, shippingAddress, createdAt)
                VALUES (?,?,?,?,CURRENT_TIMESTAMP)';
            $stmt = $link->prepare($sqlInsertInfo);
            $stmt->bind_param(
                "dsss",
                $cartId,
                $name,
                $creditCard,
                $shippingAddress
            );
            $stmt->execute();
            
            $userId = $link->insert_id;

            $sqlGetUserInfo =
            "SELECT * FROM orders
            WHERE orders.cartId = $cartId";
            $newUserObj = $link->query($sqlGetUserInfo);
            $newUserInfo = mysqli_fetch_assoc($newUserObj);
            $response['body'] = $newUserInfo;
        }
    }
}