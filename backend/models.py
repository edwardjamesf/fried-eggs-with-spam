from sqlmodel import Field, Relationship, SQLModel
from pydantic import BaseModel


class Consoles(SQLModel, table=True):
    __tablename__ = "consoles"
    id: str | None = Field(default=None, primary_key=True)
    name: str
    manufacturer: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_path: str | None = None
    fk_image_id: str | None
    games: list["Games"] = Relationship(back_populates="console")


class Games(SQLModel, table=True):
    __tablename__ = "games"
    id: str | None = Field(default=None, primary_key=True)
    name: str
    developer: str | None = None
    publisher: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_path: str | None = None
    console: Consoles | None = Relationship(back_populates="games")
    fk_games_consoles: str | None = Field(default=None, foreign_key="consoles.id")

class Images(SQLModel, table=True):
    __tablename__ = "images"
    id: str | None = Field(default=None, primary_key=True)
    name: str
    description: str | None

class PlacesOfPurchase(SQLModel, table=True):
    __tablename__ = "places_of_purchase"
    id: str | None = Field(default=None, primary_key=True)
    name: str

class Purchases(SQLModel, table=True):
    __tablename__ = "purchases"
    id: str | None = Field(default=None, primary_key=True)
    fk_console_id: str | None = Field(default=None, foreign_key="consoles.id")
    fk_game_id: str | None = Field(default=None, foreign_key="games.id")
    fk_place_of_purchase: str = Field(default=None, foreign_key="places_of_purchase.id")
    fk_image_id: str | None = Field(default=None, foreign_key="images.id")
    name: str
    cost_base: float
    cost_tax: float
    cost_shipping: float
    cost_other: float
    cost_total: float | None
    date: str | None
    notes: str | None
