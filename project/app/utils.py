# payments/utils.py
import requests
from django.conf import settings

def get_paypal_access_token():
    auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_SECRET)
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"grant_type": "client_credentials"}

    r = requests.post(f"{settings.PAYPAL_BASE_URL}/v1/oauth2/token", auth=auth, data=data, headers=headers)
    r.raise_for_status()
    return r.json()["access_token"]
