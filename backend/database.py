from sqlmodel import create_engine
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv()
db_user = os.getenv("POSTGRES_USER")
db_password = os.getenv("POSTGRES_PASSWORD")
db_ip_port = os.getenv("POSTGRES_IP_PORT")
db_name = os.getenv("POSTGRES_DB")
postgres_url = f"postgresql://{db_user}:{db_password}@{db_ip_port}/{db_name}"
engine = create_engine(postgres_url, echo=True)
