import json
from database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Consoles, Games, Purchases
from sqlmodel import Session, SQLModel, select
from typing import List


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()
origins = [
    "http://localhost:4000",
    "http://192.168.86.241:4000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SQLModel.metadata.create_all(engine)


@app.post("/consoles")
async def add_new_console(data: Consoles):
    with Session(engine) as session:
        new_console = Consoles(
            name=data.name,
            manufacturer=data.manufacturer,
            release_date=data.release_date,
            description=data.description,
            image_id=data.image_id,
        )
        session.add(new_console)
        session.commit()
        return json.dumps(dict(new_console))


@app.get("/consoles")
async def get_console(console_id: str):
    with Session(engine) as session:
        statement = select(Consoles).where(Consoles.id == console_id)
        results = session.exec(statement=statement).all()
        return results


@app.put("/consoles")
async def update_console(data: Consoles, console_id: str):
    with Session(engine) as session:
        statement = select(Consoles).where(Consoles.id == console_id)
        results = session.exec(statement=statement)
        console = results.one()

        if data.name is not None:
            console.name = data.name
        if data.manufacturer is not None:
            console.manufacturer = data.manufacturer
        if data.release_date is not None:
            console.release_date = data.release_date
        if data.description is not None:
            console.description = data.description
        if data.image_id is not None:
            console.image_id = data.image_id
        session.add(console)
        session.commit()
        session.refresh(console)
        return console



@app.get("/")
async def read_root():
    return {"status": "get root success"}


@app.get("/consoles/all")
async def get_all_consoles():
    with Session(engine) as session:
        statement = select(Consoles)
        results = session.exec(statement=statement)
        return results.all()


@app.get("/games")
async def get_all_games():
    with Session(engine) as session:
        statement = select(Games)
        results = session.exec(statement=statement)
        return results.all()


@app.get("/purchases")
async def get_all_purchases():
    with Session(engine) as session:
        statement = select(Purchases)
        results = session.exec(statement=statement)
        return results.all()


@app.post("/games")
async def add_new_consoles(data: List[Games]):
    with Session(engine) as session:
        for game in data:
            new_game = Games(
                name=game.name,
                developer=game.developer,
                publisher=game.publisher,
                release_date=game.release_date,
                description=game.description,
                image_path=game.image_path,
                fk_games_consoles=game.fk_games_consoles,
            )
            session.add(new_game)
            session.commit()
            return {"status": "post games success"}


if __name__ == "__main__":
    create_db_and_tables()
