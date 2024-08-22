from sqlmodel import Field, Relationship, SQLModel
from pydantic import BaseModel


class Consoles(SQLModel, table=True):
    __tablename__ = "consoles"
    id: int | None = Field(default=None, primary_key=True)
    name: str
    manufacturer: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_path: str | None = None
    games: list["Games"] = Relationship(back_populates="console")


class Games(SQLModel, table=True):
    __tablename__ = "games"
    id: int | None = Field(default=None, primary_key=True)
    name: str
    developer: str | None = None
    publisher: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_path: str | None = None
    console: Consoles | None = Relationship(back_populates="games")
    fk_games_consoles: int | None = Field(default=None, foreign_key="consoles.id")
