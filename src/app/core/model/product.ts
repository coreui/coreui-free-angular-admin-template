export class Product {
    public constructor(
     readonly code: string, 
     readonly name: string,
     readonly type: string,
     readonly producerName: string,
     readonly description: string,
     readonly unitPrice: number,
     readonly stock: number,
     readonly stockLastIncrement: number,
     readonly stockLastUpdateDate: Date,
     readonly currency: Currency = Currency.euro,
     public imagesUrl?: any[]){}
}

export enum Currency {
    dollar = 'dollar',
    euro = 'euro',
    pound = 'pound',
    yen = 'yen'
}

export class ProductConfiguration {
    constructor(
        public readonly minStockIncrement: number = 5,
        public readonly maxStockIncrement: number = 1000,
        public readonly defaultStockIncrement: number = 20,
        public readonly stockStepIncrement: number = 5,
        public readonly minUnitPrice: number = 1.0,
        public readonly maxUnitPrice: number = 1000.0,
        public readonly priceStepIncrement: number = 0.50,
        public readonly defaultPrice: number = 5.00,
        public readonly currency: Currency = Currency.euro
    ){}
}
