import requests
import json
from decouple import config

class ZapService():
    instance = config("ZAP_INSTANCE")
    test = config("ZAP_TEST")
    url_api = config("ZAP_URL")
    secure = config("ZAP_SECURE")
    headers = {
        'accept': 'application/json',
        'apikey': config("ZAP_API_KEY"),
        'Content-Type': 'application/json'    
    }

    def check_instance(self, option):
        result = None
        value = self.instance if option else self.test
        url = f"{self.secure}://{self.url_api}/instance/connectionState/{value}"

        try:
            print(" ")
            print(f"Checking instance At URL: {url}")
            print(" ")
            response = requests.get(url, headers=self.headers)
            if response.status_code == 200:
                json_data = json.loads(response.text)
                result = json_data["instance"]["state"]
                print("Instance is connected!")
            else:
                print(f"Instance doesn't exist! (status code): {response.status_code}")
            return result
        except Exception as e:
            print(f"Request Error at check_instance: {e}")
            return result
        
        
    def sendMessage(self, message, cellphone, option):
        result = False
        value = self.instance if option else self.test
        url = f"{self.secure}://{self.url_api}/message/sendText/{value}"
        payload = {
            "number": cellphone,
            "text": message,
            "options": {
                "delay": 1200,
                "presence": "composing",
                "linkPreview": False
            }
        }

        print("************************ Sending message *************************")
        print(f"| url => {url} |")
        print(f"| phone number => {cellphone} |")
        print("******************************************************************")
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        if response.status_code == 201:
            result = True
            print(f"Message was sent!")
            print("__________________________________________________________________")
        else:
            print(f"Error on sendMessage: {response.status_code}")
            print(f"Error on sendMessage: {response.text}")
            if len(cellphone) == 9 or len(cellphone) == 10:
                print(f"DDD is missing!")
            else:
                print(f"Number is not valid! (length: {len(cellphone)})")


        return result