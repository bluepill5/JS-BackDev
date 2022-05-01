import { faker } from '@faker-js/faker';
faker.locale = 'es';

export default function generateProduct() {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({max: 100}),
        thumbnail: faker.image.imageUrl(300, 300, 'cat', true),
        timestamp: faker.date.recent(10)
    }
}

