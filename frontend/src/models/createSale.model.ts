export class CreateSaleModel {
    product_name: string;
    amount: number;
    customer: string;
    date: string;

    constructor(
        product_name: string,
        amount: number,
        customer: string,
        date: string
    ) {
        this.product_name = product_name;
        this.amount = amount;
        this.customer = customer;
        this.date = date;
    }
}