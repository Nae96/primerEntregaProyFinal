const Contenedor = require("../contenedor");
	
	let carritoCompCont = new Contenedor("carritoComp.json");
	
	let allcarritoComp;
	let obtenerCarritos = async () => {
	//   contenido 
	  allcarritoComp = await carritoCompCont.getAll();
	};
	
	let ingresarNuevoObj = async (nuevoObj) => {
	  await carritoCompCont.save(nuevoObj);
	};
	
	obtenerCarritos();
	
	exports.findproductCar = function (req, res) {
	  const { id } = req.params;
	
	  
	  if (id != null) {
	    obtenerCarritos();
	
	    const found = allcarritoComp.find((el) => el.id == id);
	
	    console.log(found);
	    return found.products;
	  }
	};
	
	exports.createCart = async function (req, res) {
	  await obtenerCarritos();
	 
	  let newCart = { id: 0, timestamp: 0 };
	
	  newCart.id = allcarritoComp.length + 1;
	  newCart.timestamp = Date.now();
	
	  ingresarNuevoObj(newCart);
	  return newCart;
	  
	};
	
	exports.deleteCart = async function (req, res) {
	  const { id } = req.params;
	  console.log(allcarritoComp);
	  const cartsFilteredById = allcarritoComp.filter((item) => item.id != id);
	  carritoCompCont.modificarObjeto(cartsFilteredById);
	  return cartsFilteredById;
	};
	
	exports.addProductToCart = async function (req, res, productToAdd) {
	  const { id } = req.params;
	
	  await obtenerCarritos();
	
	  const found = allcarritoComp.find((el) => el.id == id)|| [];
	  if (found != undefined) {
	    found.products.push(productToAdd);
	
	    let lugarDelObjt = allcarritoComp.findIndex((el) => el.id == id);
	    allcarritoComp[lugarDelObjt] = found;
	    carritoCompCont.modificarObjeto(allcarritoComp);
	    //  Acaa
	    return found;
	  } else {
	    return "Error, Producto no encontrado";
	  }
	};
	
	exports.deleteProductFromCart = async function (req, res, productToAdd) {
	  const { id, id_prod } = req.params;
	
	  await obtenerCarritos();
	
	 
	  const shoppingCartFound = allcarritoComp.find((el) => el.id == id);
	// aca 
	  if (shoppingCartFound != undefined) {
	    
	    const productsToUpdate = shoppingCartFound.products.filter(
	      (item) => item.id != id_prod
	    );
	    shoppingCartFound.products = productsToUpdate;
	
	    
	    let lugarDelObjt = allcarritoComp.findIndex((el) => el.id == id);
	
	    allcarritoComp[lugarDelObjt] = shoppingCartFound;
	
	    carritoCompCont.modificarObjeto(allcarritoComp);
	
	    return shoppingCartFound;
	  } else {
	    return "Error, Producto no existe";
	  }
	};
