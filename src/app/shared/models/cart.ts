export class Cart {
    id: string = '';
    cartItems: CartItem[] = [];

}

export type CartItem = {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

