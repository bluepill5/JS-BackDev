const fs = require('fs');

class Contenedor {
    constructor (path) {
        this.path = path;
    }
    // Methods 
    save = async (newProduct) => {
        // Recibe un objeto, lo guarda en el archivo, 
        // devuelve el id asignado
        const products = await this.getAll();

        let max_id = products.reduce(
          (acc, product) => (acc = acc > product.id ? acc : product.id),
          0
        );
        newProduct.id = max_id + 1;
        products.push(newProduct);

        // Guardamos el archivo
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newProduct.id;
        } catch (error) {
            console.log(`Error al guardar el archivo: {error}`);

        }
    }

    updateById = async (id, prodUpdate) => {
        // Recibe un id y actualiza sus datos
        try {
            let products = await this.getAll();
            const product = products.find(x => x.id == id) || 'Product not found.';
            if (product == 'Product not found.') {
                return product;
            } else {
                const properties = ['title', 'price', 'thumbnail'];
                Object.entries(prodUpdate).map(item => {
                    if(properties.includes(item[0])) {
                        product[item[0]] = item[1];
                    }
                });
                products = products.filter(product => product.id != id);
                products.push(product);
                fs.promises.writeFile(this.path, JSON.stringify(products));
                return product;
            }
        } catch(error) {
            console.log('Error');
        }
    }

    getById = async (id) => {
        // Recibe un id y devuelve el objeto con ese id,
        // o null si no está  
        try {
            const products = await this.getAll();
            const product = products.find(x => x.id == id) || 'Product not found.';
            return product;
            
        } catch(error) {
            console.log('Error de lectura', error);
        }
    }

    getAll = async () => {
        // Devuelve un array con lo objetos presentes en 
        // el archivo
        try {
            let res = [];
            await fs.promises.readFile(this.path, 'utf-8')
                .then(content => JSON.parse(content)
                .map(product => res.push(product)));

            return res;

        } catch(error) {
            return [];
        }

    }

    deleteById = async (id) => {
        // Elimina del archivo el objeto con el id buscado
        try {
            let products = await fs.promises.readFile(this.path, 'utf-8')
                .then(content => JSON.parse(content));
            let product = products.find(product => product.id == id);
            
            if (product) {
                products = products.filter(product => product.id != id);
                fs.promises.writeFile(this.path, JSON.stringify(products));
                return product;
            } else {
                return 'Product not found.';
            }
        } catch(error) {
            console.log('Error de lectura', error);
        }

    }

    deleteAll = async () => {
        // Elimina todos los objetos presentes en el archivo
        try {
            await fs.promises.writeFile(this.path, "[]");
            return [];
        } catch {
            console.log(`Error al escribir archivo.`)
        }
        
    }
}

module.exports = Contenedor;


