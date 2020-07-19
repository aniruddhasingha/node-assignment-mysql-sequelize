add public folder
add public/upload folder
add public/upload/productImage folder

# Routes-
# POST REQUEST
1. Develop an API, that can add a product with a product image
# http://localhost:8080/product/addProductWithProductImage
add data as multi-part-form-data
{
    Image: File,
    product_name: "anything" (unique field)
    product_desc: "product description" ,
    Status:1 or 0
}

2. Develop an API that can update a product and respective product image
# http://localhost:8080/product/updateProductAndRespectiveProductImage
add data as multi-part-form-data
{
    Image: File (required field),
            product_id: "product id" (required field),
        new_product_name: "product name" (optional and unique field),
        new_product_desc: "product description" (optional field),
        Status: 1 or 0 (optional field)
}

3. Develop an API that can show product with product image
# http://localhost:8080/product/ShowProductWithProductImage
add data as body
{
    product_id: "product id" (required field),
}

# GET REQUEST
4. Develop an API that can show the latest created 2nd and 3rd product
http://localhost:8080/product/showLatestCreated2ndAnd3rdProduct


