const express = require("express");
	const { Router } = express;
	const app = express();
	const admin = true;
	const router = Router();
	const PORT = 8080;
	
	const productver = require("./verifica/productver");
	const carritover = require("./verifica/carritover");
	
	app.use(express.json());
	app.use("/public", express.static(__dirname + "/public"));
	app.use(express.urlencoded({ extended: true }));
	//app.use(express.static(__dirname + "/public"));
	
	app.use("/api/", router);
	

	// router de productos
	router.get("/products/:id?", (req, res) => {
	  productver.product_list(req, res);
	});
	
	router.post(
	  "/products",
	  (req, res, next) => {
	    if (admin == false) {
	      res.send({
	        error: -1,
	        desc: `route /api/products POST no autorizado`,
	      });
	    } else {
	      next();
	    }
	  },
	  (req, res) => {
	    productver.create_product(req, res);
	  }
	);
	
	router.put(
	  "/products/:id",
	  (req, res, next) => {
	    if (admin == false) {
	      res.send({
	        error: -1,
	        desc: `route /api/products PUT no autorizado`,
	      });
	    } else {
	      next();
	    }
	  },
	  (req, res) => {
	    productver.edit_product(req, res);
	  }
	);
	
	router.delete(
	  "/products/:id",
	  (req, res, next) => {
	    if (admin == false) {
	      res.send({
	        error: -1,
	        desc: `route /api/products  DELETE no autorizado`,
	      });
	    } else {
	      next();
	    }
	  },
	  (req, res) => {
	    productver.delete_product(req, res);
	  }
	);
	
	
	// router de carrito
	router.post("/carrito", (req, res) => {
	  carritover.create_cart(req, res);
	});
	
	router.delete("/carrito/:id", (req, res) => {
	  carritover.delete_cart(req, res);
	});
	
	router.get("/carrito/:id/products", (req, res) => {
	  carritover.cart_list(req, res);
	});
	
	router.post("/carrito/:id/products/:id_prod", async (req, res) => {

	  let productToAdd = await productver.find_product_for_cart(req, res);
	  carritover.add_product_to_cart(req, res, productToAdd);
	});
	
	router.delete("/carrito/:id/products/:id_prod", async (req, res) => {
	  carritover.delete_product_from_cart(req, res);
	});
	
	// server
	const server = app.listen(PORT, () => {
	  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
	});
	
	server.on("error", (error) => console.log(`El error es ${error}`));

