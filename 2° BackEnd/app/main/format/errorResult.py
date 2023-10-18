
class ErrorResult:
    def __init__(self, message=None, type=None, status=None):
        self.message = message
        self.status = status
        self.type = type

    def get_message(self):
        return self.message

    def set_message(self, message):
        self.message = message

    def get_status(self):
        return self.status

    def set_status(self, status):
        self.status = status
    
    def get_type(self):
        return self.type

    def set_type(self, type):
        self.type = type

    def as_dict(self):
        return {
            "message": self.message,
            "status": self.status,
            "type": self.type
        }