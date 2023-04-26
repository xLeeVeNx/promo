import aiohttp_cors
import asyncio
import base64
import os
from aiohttp import web
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization.pkcs12 import load_key_and_certificates
from cryptography.hazmat.backends import default_backend
from requests_pkcs12 import post
from config import API_USERNAME, API_PASSWORD, API_URL, P12_PASSWORD, P12_CERT_NAME

P12_CERT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), P12_CERT_NAME)

def convert_p12_to_pem(p12_cert_path, password):
    with open(p12_cert_path, "rb") as f:
        p12_data = f.read()

    key, cert, _ = load_key_and_certificates(p12_data, password, backend=default_backend())

    pem_data = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ) + cert.public_bytes(serialization.Encoding.PEM)

    return pem_data


PEM_DATA = convert_p12_to_pem(P12_CERT_PATH, P12_PASSWORD.encode())

async def handle_request(request):
    token = base64.b64encode(f"{API_USERNAME}:{API_PASSWORD}".encode("utf-8")).decode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {token}"
    }

    client_data = await request.read()

    try:
        response = post(API_URL, headers=headers, data=client_data, pkcs12_filename=P12_CERT_PATH, pkcs12_password=P12_PASSWORD)
        content = response.content
        return web.Response(
            status=response.status_code,
            headers=response.headers,
            body=content
        )

    except Exception as e:
        return web.Response(status=500, text=str(e))

async def main():
    app = web.Application()

    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*"
        )
    })

    route = app.router.add_route('POST', '/', handle_request)

    cors.add(route)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.run_forever()