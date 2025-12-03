from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Food(BaseModel):
    name: str
    grams: float
    calories: float
    protein_g: float
    carbs_g: float
    fat_g: float
    model_label: str
    confidence: float

class Macros(BaseModel):
    protein_g: float
    carbs_g: float
    fat_g: float

class MealResponse(BaseModel):
    meal_id: str
    timestamp: str
    source: str
    original_input: str
    foods: List[Food]
    total_calories: float
    total_macros: Macros
    confidence_score: float

class AnonymousSessionRequest(BaseModel):
    pass

class AnonymousSessionResponse(BaseModel):
    token: str
    user_id: str

class UserProfileResponse(BaseModel):
    user_id: str
    daily_calorie_target: int
    timezone: str

class ProfileUpdateRequest(BaseModel):
    daily_calorie_target: Optional[int] = None
    timezone: Optional[str] = None

class TextMealRequest(BaseModel):
    description: str

class ImageMealRequest(BaseModel):
    image_url: str

class BarcodeMealRequest(BaseModel):
    barcode: str
    serving_description: Optional[str] = None
    servings: int = 1

class DailySummaryResponse(BaseModel):
    date: str
    total_calories: float
    total_macros: Macros
    remaining_calories: float