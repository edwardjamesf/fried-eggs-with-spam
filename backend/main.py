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


@app.get("/")
async def read_root():
    return {"status": "get root success"}


@app.post("/initialize_db_and_tables")
def initialize_db_and_tables():
    SQLModel.metadata.create_all(engine)
    return {"message": "DB and tables initialized."}


@app.get("/consoles")
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


@app.post("/consoles")
async def add_new_consoles(data: List[Consoles]):
    with Session(engine) as session:
        for console in data:
            new_console = Consoles(
                name=console.name,
                manufacturer=console.manufacturer,
                release_date=console.release_date,
                description=console.description,
                image_path=console.image_path,
            )
            session.add(new_console)
            session.commit()
            return {"status": "post consoles success"}


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
