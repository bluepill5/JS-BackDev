import '../config/db.js';
import { ProductModel } from '../modules/products_modules.js';

const products = [
    {
        title: "Laptop",
        description: "Descripción del producto",
        price: 111,
        stock: 100,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/job-seeker/256/laptop_job_seeker_employee_unemployee_work-256.png"
    },
    {
        title: "Mochila Compacta",
        description: "Descripción del producto",
        price: 222.21,
        stock: 100,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/backpack-and-bag/512/bagpack-10-256.png"
    },
    {
        title: "Chamarra",
        description: "Descripción del producto",
        price: 4343,
        stock: 100,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/clothes-and-outfit-vol-2-2/128/down_jacket_winter_clothes_outfit-256.png"
    },
    {
        title: "Saco",
        description: "Descripción del producto",
        price: 3456,
        stock: 100,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/men-s-clothing-color/57/jacket_color-256.png"
    },
    {
        title: "Camara",
        description: "Descripción del producto",
        price: 222.21,
        stock: 100,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-256.png"
    },
    {
        title: "Zapatos",
        description: "Descripción del producto",
        price: 21.21,
        stock: 100,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/camping-123/64/hiking-shoes-camping-trekking-backpacking-256.png"
    },
    {
        title: "Tenis",
        description: "Descripción del producto",
        price: 55.55,
        stock: 100,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/sport-fitness-vol-01/512/40-basketball-shoes-sneakers-256.png"
    },
    {
        title: "Anillo",
        description: "Descripción del producto",
        price: 555,
        stock: 100,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/accessories-5/94/09-256.png"
    },
    {
        title: "Anillo3",
        description: "Descripción del producto",
        price: 756,
        stock: 100,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/love-wedding-vol-2/512/diamond_ring_wedding_proposal-256.png"
    },
    {
        title: "Anillo 5",
        description: "Descripción del producto",
        price: 576,
        stock: 100,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/equipment_accessory_ring_wedding_gold_jewelry_gift_love-256.png"
    },
    {
        title: "Anillo 55",
        description: "Descripción del producto",
        price: 55,
        stock: 100,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/wedding-hand-drawn-icons/64/wedding_2-256.png"
    },
    {
        title: "Anillo 42",
        description: "Descripción del producto",
        price: 77,
        stock: 100,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/wedding-hand-drawn-icons/64/wedding_3-256.png"
    },
    {
        title: "Pulsera 42",
        description: "Descripción del producto",
        price: 555,
        stock: 100,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/bracelets-1/496/magnetic-medical-therapy-bracelets-titanium-256.png"
    }
];

// Cargamos los productos
async function createProducts() {
    try {
        const response = await ProductModel.create(products);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
createProducts();

