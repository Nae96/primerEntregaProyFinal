
const fs = require("fs");
	
	class Contenedor {
	  constructor(nombreArchivo) {
	    this.nombreArchivo = nombreArchivo;
	  }
	
	  save = async (objetoAGuardar) => {
	    try {
	     
	
	      let productsParsed = await this.getAll();
	     
	      productsParsed.push(objetoAGuardar);
	      console.log(productsParsed);
	
	      await fs.promises.writeFile(
	        `./${this.nombreArchivo}`,
	        JSON.stringify(productsParsed),
	        (err) => {
	          if (err) {
	            console.log("ERROR");
	          } else {
	            console.log("contenido agregado al final del .json");
	          }
	        }
	      );
	    } catch (error) {
	      console.log("ERROR");
	    }
	  };
	
	  modificarObjeto = async (newArray) => {
	    try {
	      await fs.promises.writeFile(
	        `./${this.nombreArchivo}`,
	        JSON.stringify(newArray)
	      );
	    } catch (error) {
	      console.log("ERROR");
	    }
	  };
	
	  getAll = async () => {
	    try {
	      const products = await fs.promises.readFile(
	        `./${this.nombreArchivo}`,
	        "utf-8"
	      );
	      let productsParsed;
	      return (productsParsed = JSON.parse(products));
	    } catch (error) {
	      await fs.promises.writeFile(
	        `./${this.nombreArchivo}`,
	        JSON.stringify([])
	      );
	    }
	  };
	
	  getById = async (idGet) => {
	    try {
	      let productsParsed = await this.getAll();
	     
	      let productoEncontrado;
	
	      productsParsed.forEach((element) => {
	        if (element.id == idGet) {
	          productoEncontrado = element;
	        }
	      });
	      return productoEncontrado;
	    } catch (error) {
	      console.log("Producto  inexistente");
	      return null;
	    }
	  };
	
	  deleteById = async (id) => {
	    try {
	      let productsParsed = await this.getAll();
	      console.log(productsParsed);
	      let arrayConProductoEliminado = productsParsed.filter(
	        (element) => element.id != id
	      );
	      await fs.promises.writeFile(
	        `./${this.nombreArchivo}`,
	        JSON.stringify(arrayConProductoEliminado, null, 2)
	      );
	      await console.log(`Se ha eliminado el id: ${id}`);
	    } catch (error) {
	      console.log("ERROR");
	    }
	  };
	
	  deleteAll = async () => {
	    try {
	      await fs.promises.writeFile(
	        `./${this.nombreArchivo}`,
	        JSON.stringify([])
	      );
	    } catch (error) {
	      console.log("ERROR");
	    }
	  };
	}
	
	
	
	module.exports = Contenedor;