import uuid

from sqlmodel import Field, SQLModel


class Consoles(SQLModel, table=True):
    __tablename__ = "consoles"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    manufacturer: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_id: uuid.UUID | None = None


class Games(SQLModel, table=True):
    __tablename__ = "games"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    developer: str | None = None
    publisher: str | None = None
    release_date: str | None = None
    description: str | None = None
    image_id: uuid.UUID | None = None
    console_id: uuid.UUID | None = None

class Images(SQLModel, table=True):
    __tablename__ = "images"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    description: str | None = None
    path: str | None = None


class Purchases(SQLModel, table=True):
    __tablename__ = "purchases"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    purchase_date: str | None = None
    cost_base: float
    cost_tax: float
    cost_shipping: float
    cost_other: float
    cost_total: float | None
    notes: str | None
    image_id: uuid.UUID | None = None
    console_id: uuid.UUID | None = None
    game_id: uuid.UUID | None = None
