import json
import os
from typing import List

from backend.app.models import Sale


class FileStorage:
    def __init__(self, file_path: str = "sales_data.txt"):
        self.file_path = file_path
        self.ensure_file_exists()

    def ensure_file_exists(self):
        # """Create file with initial data if it doesn't exist"""
        if not os.path.exists(self.file_path):
            initial_data = [
                {"id": 6, "product_name": "Printer", "amount": 150.00, "customer": "Diana Prince",
                 "date": "2024-01-20"},
                {"id": 7, "product_name": "Desk Lamp", "amount": 45.00, "customer": "Bruce Wayne",
                 "date": "2024-01-21"},
                {"id": 8, "product_name": "External Hard Drive", "amount": 110.50, "customer": "Clark Kent",
                 "date": "2024-01-22"},
                {"id": 9, "product_name": "Graphics Card", "amount": 499.99, "customer": "Peter Parker",
                 "date": "2024-01-23"},
                {"id": 10, "product_name": "Gaming Chair", "amount": 250.00, "customer": "Natasha Romanoff",
                 "date": "2024-01-24"},
                {"id": 11, "product_name": "Tablet", "amount": 320.00, "customer": "Steve Rogers",
                 "date": "2024-01-25"},
                {"id": 12, "product_name": "Smartphone", "amount": 699.00, "customer": "Tony Stark",
                 "date": "2024-01-26"},
                {"id": 13, "product_name": "Router", "amount": 89.00, "customer": "Wanda Maximoff",
                 "date": "2024-01-27"},
                {"id": 14, "product_name": "Speaker", "amount": 130.00, "customer": "Barry Allen",
                 "date": "2024-01-28"},
                {"id": 15, "product_name": "Smartwatch", "amount": 199.99, "customer": "Scott Lang",
                 "date": "2024-01-29"},
                {"id": 16, "product_name": "VR Headset", "amount": 349.00, "customer": "Stephen Strange",
                 "date": "2024-01-30"},
                {"id": 17, "product_name": "Projector", "amount": 600.00, "customer": "Selina Kyle",
                 "date": "2024-01-31"},
            ]
            self.save_data(initial_data)

    def load_data(self) -> List[dict]:

        try:
            with open(self.file_path, 'r', encoding='utf-8') as file:
                content = file.read().strip()
                if not content:
                    return []
                return json.loads(content)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def save_data(self, data: List[dict]):
        with open(self.file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)

    def get_sales(self) -> List[Sale]:

        data = self.load_data()
        return [Sale(**item) for item in data]

    def add_sale(self, sale_data: dict) -> Sale:
        data = self.load_data()

        # Generate new ID
        max_id = max([item.get('id', 0) for item in data], default=0)
        sale_data['id'] = max_id + 1

        # Add to data and save
        data.append(sale_data)
        self.save_data(data)

        return Sale(**sale_data)

    def get_next_id(self) -> int:
        data = self.load_data()
        return max([item.get('id', 0) for item in data], default=0) + 1