from fastapi import APIRouter, HTTPException
from typing import List
import random
from datetime import datetime, timedelta

from backend.app.FileStorage import FileStorage
from backend.app.models import Sale, SaleCreate, ForecastData

router = APIRouter()

# Initialize file storage
file_storage = FileStorage("sales_data.txt")


@router.get("/sales", response_model=List[Sale])
def get_sales():
    try:
        sales = file_storage.get_sales()
        # Sort by date in descending order (latest date first)
        return sorted(sales, key=lambda x: x.date, reverse=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading sales data: {str(e)}")


@router.post("/sales", response_model=Sale)
def create_sale(sale: SaleCreate):
    try:
        sale_data = {
            "product_name": sale.product_name,
            "amount": sale.amount,
            "customer": sale.customer,
            "date": sale.date
        }

        new_sale = file_storage.add_sale(sale_data)
        return new_sale

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating sale: {str(e)}")


@router.get("/sales/forecast", response_model=List[ForecastData])
def get_sales_forecast():
    """Get sales forecast for next 7 days"""
    try:
        forecast_data = []
        base_date = datetime.now()

        # Generate dummy forecast data
        for i in range(7):
            forecast_date = base_date + timedelta(days=i + 1)
            predicted_amount = round(random.uniform(500, 2000), 2)

            forecast_data.append(ForecastData(
                date=forecast_date.strftime("%Y-%m-%d"),
                predicted_amount=predicted_amount
            ))

        return forecast_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {str(e)}")


@router.get("/sales/{sale_id}", response_model=Sale)
def get_sale(sale_id: int):
    """Get a specific sale by ID"""
    try:
        sales = file_storage.get_sales()
        for sale in sales:
            if sale.id == sale_id:
                return sale
        raise HTTPException(status_code=404, detail="Sale not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving sale: {str(e)}")


@router.delete("/sales/{sale_id}")
def delete_sale(sale_id: int):
    """Delete a sale by ID"""
    try:
        data = file_storage.load_data()
        original_length = len(data)

        # Filter out the sale with the given ID
        data = [item for item in data if item.get('id') != sale_id]

        if len(data) == original_length:
            raise HTTPException(status_code=404, detail="Sale not found")

        file_storage.save_data(data)
        return {"message": "Sale deleted successfully"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting sale: {str(e)}")


@router.put("/sales/{sale_id}", response_model=Sale)
def update_sale(sale_id: int, sale: SaleCreate):
    """Update a sale by ID"""
    try:
        data = file_storage.load_data()

        # Find and update the sale
        for i, item in enumerate(data):
            if item.get('id') == sale_id:
                data[i] = {
                    "id": sale_id,
                    "product_name": sale.product_name,
                    "amount": sale.amount,
                    "customer": sale.customer,
                    "date": sale.date
                }
                file_storage.save_data(data)
                return Sale(**data[i])

        raise HTTPException(status_code=404, detail="Sale not found")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating sale: {str(e)}")