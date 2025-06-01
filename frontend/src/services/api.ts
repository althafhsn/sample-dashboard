import { CreateSaleModel } from "../models/createSale.model";

const API_BASE_URL = 'http://localhost:8000/api';

export const salesAPI = {

    getSales: async () => {
        const response = await fetch(`${API_BASE_URL}/sales`);
        if (!response.ok) {
            throw new Error('Failed to fetch sales');
        }
        return response.json();
    },


    createSale: async (saleData: CreateSaleModel) => {
        const response = await fetch(`${API_BASE_URL}/sales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleData),
        });
        if (!response.ok) {
            throw new Error('Failed to create sale');
        }
        return response.json();
    },

    // Get sales forecast
    getForecast: async () => {
        const response = await fetch(`${API_BASE_URL}/sales/forecast`);
        if (!response.ok) {
            throw new Error('Failed to fetch forecast');
        }
        return response.json();
    },
};