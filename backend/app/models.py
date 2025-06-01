from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
import json
import os
from pathlib import Path


class SaleCreate(BaseModel):
    product_name: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)
    customer: str = Field(..., min_length=1, max_length=100)
    date: str


class Sale(BaseModel):
    id: int
    product_name: str
    amount: float
    customer: str
    date: str


class ForecastData(BaseModel):
    date: str
    predicted_amount: float



