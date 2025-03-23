import re

class GeneralUtil:

    def improvingPhoneNumber(self, phone):
        print('Number before ajust:', phone)
        n = re.sub(r'\D', '', str(phone))
        print('Number after ajust:', n)
        if len(n) == 10:
            n = n[:2] + '9' + n[2:]
            print('Number after adding 9:', n)
        if len(n) == 11:
            n = '55' + n
            print('Number after adding 55:', n)
        return n