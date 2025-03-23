from decouple import config
from rest_framework.exceptions import ParseError
from main.modules.celeryModule import sendNotification

class NotificationService():
    numbers = config('ZAP_NUMBER')

    # Run redis & zapConnect (Estrutura do Projeto => Redis and ZapApi)
    def zapNotification(self, notification):
        try:
            print("Running...")
            celery_status = self.check_celery_running()
            if celery_status:
                print("Sending message...")
                for number in self.numbers:
                    result = sendNotification.delay(notification, number, False)
                    print(f"Mensagem enviada: {result.get()}.")
                return "Notification Success!"
            else:
                print("\n ************************* Initialize Celery Process *****************************")
                print(":/> celery -A celeryModule worker --pool=solo --loglevel=info")
                print("************************************************************************************")
                raise ParseError("The requested Id was not found.")
        except Exception as error:
            raise error
        
    
