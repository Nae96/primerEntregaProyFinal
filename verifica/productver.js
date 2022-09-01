const productref = require("../referenc/productref");
	
	exports.product_list = async function (req, res) {
	  let productList = await productref.findProducts(req, res);
	  res.send({ message: "Status OK", productList: productList });
	};
	
	exports.create_product = async function (req, res) {
	  let productAdded = await productref.createProduct(req, res);
	  res.send({ message: "Creation OK", productAdded: productAdded });
	};
	
	exports.edit_product = async function (req, res) {
	  let productEditted = await productref.editProduct(req, res);
	  res.send({ message: "Editation OK", productEditted: productEditted });
	};
	
	exports.delete_product = async function (req, res) {
	  let productList = await productref.deleteProduct(req, res);
	  res.send({ message: "Delete OK", productList: productList });
	};
	
	exports.find_product_for_cart = async function (req, res) {
	  let productFound = await productref.findProductForCart(req, res);
	  return productFound;
	};

