import schedule
import threading
import time
from django.db.backends.signals import connection_created
from django.dispatch import receiver

#scheduler was started in urls.py

#update gameData postgreSQL
def job():
    print("------------------ OK")

def schedules():
    schedule.every(1).minutes.do(job)
    # schedule.every(4).weeks.do(job)

    while True:
        schedule.run_pending()
        time.sleep(1)

def start_scheduler():
    scheduler_thread = threading.Thread(target=schedules)
    scheduler_thread.daemon = True
    scheduler_thread.start()
    print("Starting scheduler...")

