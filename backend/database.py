from sqlmodel import create_engine
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_ip_port = os.getenv("DB_IP_PORT")
db_name = os.getenv("DB_NAME")
postgres_url = f"postgresql://{db_user}:{db_password}@{db_ip_port}/{db_name}"
engine = create_engine(postgres_url, echo=True)
