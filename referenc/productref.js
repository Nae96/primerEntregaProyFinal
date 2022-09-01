const Contenedor = require("../contenedor");
	
	let productsContainer = new Contenedor("products.json");
	
	let arrayCompleto;
	let obtenerProductos = async () => {
	  
	  arrayCompleto = await productsContainer.getAll();
	};
	let ingresarNuevoObj = async (newObj) => {
	  await productsContainer.save(newObj);
	};
	
	obtenerProductos();
	
	exports.findProducts = function (req, res) {
	  const { id } = req.params;
	
	  
	  if (id == null) {
	    obtenerProductos();
	    return arrayCompleto;
	  } else {
	    const found = arrayCompleto.find((el) => el.id == id);
	   
	    if (found != null) {
	      return found;
	    } else {
	      return "Producto no encontrado";
	    }
	  }
	};
	
	exports.createProduct = async function (req, res) {
	  const { body } = req;
	  console.log(req);
	  await obtenerProductos();
	
	  body.price = Number(body.price);
	  body.code = Number(body.code);
	  body.stock = Number(body.stock);
	
	  body.id = arrayCompleto.length + 1;
	  body.timestamp = Date.now();
	  console.log(body);
	
	  ingresarNuevoObj(body);
	  return body;
	  
	};
	
	exports.editProduct = function (req, res) {
	  const { id } = req.params;
	  const { body } = req;
	 
	
	  const productoToChange = arrayCompleto.find((el) => el.id == id);
	  
	  productoToChange.title = body.title;
	  productoToChange.description = body.description;
	  productoToChange.price = body.price;
	  productoToChange.code = body.code;
	
	  let lugarDelObjt = arrayCompleto.findIndex((el) => el.id == id);
	
	  arrayCompleto[lugarDelObjt] = productoToChange;
	
	  productsContainer.modificarObjeto(arrayCompleto);
	
	  return productoToChange;
	};
	
	exports.deleteProduct = function (req, res) {
	  const { id } = req.params;
	
	  const productsFilteredById = arrayCompleto.filter((item) => item.id != id);
	  productsContainer.modificarObjeto(productsFilteredById);
	  return productsFilteredById;
	};
	
	exports.findProductForCart = function (req, res) {
	  const { id_prod } = req.params;
	
	  const found = arrayCompleto.find((el) => el.id == id_prod);
	  
	  if (found != null) {
	    return found;
	  } else {
	    return "Producto no encontrado";
	  }
    };