from dotenv import load_dotenv
import os

load_dotenv()

API_USERNAME = os.environ.get("API_USERNAME")
API_PASSWORD = os.environ.get("API_PASSWORD")
API_URL = os.environ.get("API_URL")
P12_PASSWORD = os.environ.get("P12_PASSWORD")
P12_CERT_NAME = os.environ.get("P12_CERT_NAME")