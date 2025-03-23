from decouple import config
from time import sleep
from celery import Celery
from main.utils.generalUtil import GeneralUtil
from main.services.zapService import ZapService

url = config("REDIS_URL")
port = config("REDIS_PORT")

zapService = ZapService()
generalUtil = GeneralUtil() 

app = Celery(
    'task', 
    broker=f'redis://{url}:{port}/0', 
    backend=f'redis://{url}:{port}/0'
)

#Message, Phone Number, Running in Production (bool)
@app.task
def sendNotification(message, number, option):
    status = zapService.check_instance(option)
    if status == "open":
        sleep(2)
        number = generalUtil.improvingPhoneNumber(number)
        print("User is connected!")
        result = zapService.sendMessage(message, number, option)
        print(" ")
        return result
    else:
        print("Error: User is not connected!")
        print(" ")
    return False


def check_celery_running():
    try:
        inspector = app.control.inspect()
        if inspector.ping():
            print("Celery workers are active and running.")
            return True
        else:
            print("No active Celery workers found.")
            return False
    except Exception as e:
        print(f"Error checking Celery status: {e}")
        return False
