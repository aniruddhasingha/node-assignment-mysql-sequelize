Server Running On
*    Port: 8080

MySQL Server Running On
* host: "localhost",

Under Config Folder in config.json
configure username, password, database under development
{
	"development": {
		"username": "Your username",
		"password": "Your Passowrd",
		"database": "the db you will use",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}

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
# http://localhost:8080/product/showLatestCreated2ndAnd3rdProduct


