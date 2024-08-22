from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, select
from database import engine
from models import Consoles, Games


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()
origins = ["http://localhost:4000"]
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


@app.post("/consoles")
async def add_new_consoles(data: Consoles):
    with Session(engine) as session:
        for console in data:
            new_console = Consoles(
                name=data.name,
                manufacturer=data.manufacturer,
                release_date=data.release_date,
                description=data.description,
                image_path=data.image_path,
            )
            session.add(new_console)
            session.commit()
            return {"status": "post consoles success"}


@app.post("/games")
async def add_new_consoles(data: Games):
    with Session(engine) as session:
        for game in data:
            new_game = Games(
                name=data.name,
                developer=data.developer,
                publisher=data.publisher,
                release_date=data.release_date,
                description=data.description,
                image_path=data.image_path,
                fk_games_consoles=data.fk_games_consoles,
            )
            session.add(new_game)
            session.commit()
            return {"status": "post games success"}


if __name__ == "__main__":
    create_db_and_tables()
