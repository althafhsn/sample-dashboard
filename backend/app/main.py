from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.sales import saleAPI

app = FastAPI(title="Sales Dashboard API", version="1.0.0")

# Enable CORS

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(saleAPI, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Sales Dashboard API is running!"}
