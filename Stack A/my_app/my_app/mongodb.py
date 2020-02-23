import mongoengine as me
import marshmallow_mongoengine as ma
me.connect('web3')


class Execution(me.Document):
    execution_number = me.IntField(required=True)
    execution_date = me.DateField(required=True)
    first_name = me.StringField(required=True)
    last_name = me.StringField(required=True)
    middle_name = me.StringField(required=True)
    age_at_execution = me.IntField(required=True)
    race = me.StringField(required=True)
    state = me.StringField(required=True)
    county = me.StringField(required=True)
    foreign_national = me.StringField(required=True)
    gender = me.StringField(required=True)
    region = me.StringField(required=True)
    execution_method = me.StringField(required=True) # would prefer for this to be an enum; Firing Squad, Lethal Injection, Gas, Electric Chair, Hanging
    execution_volunteer = me.StringField(required=True)
    number_of_victims = me.IntField(required=True)
    number_of_white_male_victims =me.IntField(required=True)
    number_of_black_male_victims = me.IntField(required=True)
    number_of_latino_male_victims = me.IntField(required=True)
    number_of_asian_male_victims = me.IntField(required=True)
    number_of_native_american_male_victims =me.IntField(required=True)
    number_of_other_race_male_victims =me.IntField(required=True)
    number_of_white_female_victims = me.IntField(required=True)
    number_of_black_female_victims = me.IntField(required=True)
    number_of_latino_female_victims = me.IntField(required=True)
    number_of_asian_female_victims = me.IntField(required=True)
    number_of_native_american_female_victims =me.IntField(required=True)
    number_of_other_race_female_victims = me.IntField(required=True)

class Crime(me.Document):
    year = me.IntField(required=True)
    state = me.StringField(required=True)
    population = me.IntField(required=True)


    # Totals
    violent_crime_total = me.IntField(required=True)
    murder_and_nonnegligent_manslaughter_total = me.IntField(required=True)
    legacy_rape_total = me.IntField(required=True) 
    revised_rape_total = me.IntField(required=True)
    robbery_total = me.IntField(required=True)
    aggravated_assault_total = me.IntField(required=True)

    ## Rates
    violent_crime_rate = me.DecimalField(required=True, precision=2)
    murder_and_nonnegligent_manslaughter_rate = me.DecimalField(required=True, precision=2)
    legacy_rape_rate = me.DecimalField(required=True, precision=2)
    revised_rape_rate = me.DecimalField(required=True, precision=2)
    robbery_rate = me.DecimalField(required=True, precision=2)
    aggravated_assault_rate = me.DecimalField(required=True, precision=2)

class Murder(me.EmbeddedDocument):
    from_date = me.DateField(required=True)
    to_date = me.DateField(required=True)
    favour = me.IntField(required=True)
    disfavour = me.IntField(required=True)
    neutral = me.IntField(required=True)

class Moral(me.EmbeddedDocument):
    from_date = me.DateField(required=False)
    to_date = me.DateField(required=False)
    acceptable = me.IntField(required=False)
    wrong = me.IntField(required=False)
    depends = me.IntField(required=False)
    no_opinion = me.IntField(required=False)

class Frequency(me.EmbeddedDocument):
    from_date = me.DateField(required=False)
    to_date = me.DateField(required=False)
    too_often = me.IntField(required=False)
    right_amount = me.IntField(required=False)
    not_enough = me.IntField(required=False)
    no_opinion = me.IntField(required=False)

class Equitable(me.EmbeddedDocument):
    from_date = me.DateField(required=False)
    to_date = me.DateField(required=False)
    fairly = me.IntField(required=False)
    unfairly = me.IntField(required=False)
    no_opinion = me.IntField(required=False)

class Approach(me.EmbeddedDocument):
    from_date = me.DateField(required=False)
    to_date = me.DateField(required=False)
    death_penalty = me.IntField(required=False)
    life_imprisonment = me.IntField(required=False)
    no_opinion = me.IntField(required=False)

class DeathRow(me.Document):
    state = me.StringField(required=True)
    date = me.DateField(required=True)
    total = me.IntField(required=True)
    races = me.DictField(required=False)

class Innocence(me.Document):
    innocence_number = me.IntField(required=True)
    name = me.StringField(required=True)
    state = me.StringField(required=True)
    race = me.StringField(required=True)
    convicted = me.IntField(required=True)
    exonerated = me.IntField(required=True)
    years_between = me.IntField(required=True)
    exoneration_procedure = me.StringField(required=True)
    reasons = me.ListField(me.StringField(required=True))
    dna = me.BooleanField(required=True)

class Opinion(me.Document):
    year = me.IntField(required=True)
    murder = me.ListField(me.EmbeddedDocumentField(Murder), required=False)
    moral = me.ListField(me.EmbeddedDocumentField(Moral), required=False)
    frequency = me.ListField(me.EmbeddedDocumentField(Frequency), required=False)
    equitable = me.ListField(me.EmbeddedDocumentField(Equitable), required=False)
    approach = me.ListField(me.EmbeddedDocumentField(Approach), required=False)

class Legal(me.Document):
    state = me.StringField(required=True)
    date = me.DateField(required=True)
    status = me.StringField(required=True)


class Sentencing(me.Document):
    state = me.StringField(required=True)
    years = me.ListField(me.DictField(), required=True)




class ExecutionSchema(ma.ModelSchema):
    class Meta:
        model = Execution

class CrimeSchema(ma.ModelSchema):
    class Meta:
        model = Crime

class OpinionSchema(ma.ModelSchema):
    class Meta:
        model = Opinion

class LegalSchema(ma.ModelSchema):
    class Meta:
        model = Legal

class SentencingSchema(ma.ModelSchema):
    class Meta:
        model = Sentencing

class DeathRowSchema(ma.ModelSchema):
    class Meta:
        model = DeathRow

class InnocenceSchema(ma.ModelSchema):
    class Meta:
        model = Innocence