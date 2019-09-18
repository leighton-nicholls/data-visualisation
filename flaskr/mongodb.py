from mongoengine import *
connect('web3')


class Execution(Document):
    execution_number = IntField(required=True)
    execution_date = DateField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    middle_name = StringField(required=True)
    race = StringField(required=True)
    state = StringField(required=True)
    gender = StringField(required=True)
    region = StringField(required=True)
    execution_method = StringField(required=True) # would prefer for this to be an enum; Firing Squad, Lethal Injection, Gas, Electric Chair, Hanging

class Crime(Document):
    year = DateField(required=True)
    state = StringField(required=True)
    homicide_rate = IntField()

class Opinion(Document):
    year = DateField(required=True)
    favour = IntField(required=True)
    disfavour = IntField(required=True)
    neutral = IntField(required=True)

class Legal(Document):
    year = DateField()
    state = StringField()
    permitted_execution_methods = StringField()


'''test = User(first_name='test', last_name='moskal')

test.save()

for u in User.objects:
    u['first_name'] = 'test'
    u.save()'''