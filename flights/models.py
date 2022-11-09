from django.db import models

    # >>> lhr = Airport(code="LHR", city="London")
    # >>> lhr.save()
    # >>> f = Flight(origin=jfk, destination=lhr, duration=415)
# >>> f.save()
# >>> f
# <Flight: 1: New York (JFK) to London (LHR)>
# >>> f.duration
# 415
# >>> f.origin
# <Airport: New York (JFK)>
# >>> f.destinatiopn
# Traceback (most recent call last):
#   File "<console>", line 1, in <module>
# AttributeError: 'Flight' object has no attribute 'destinatiopn'
# >>> f.destination
# <Airport: London (LHR)>
# >>> f.origin.code
# 'JFK'
# >>> lhr.arrivals.all()
# <QuerySet [<Flight: 1: New York (JFK) to London (LHR)>]>

class Airport(models.Model):
    code = models.CharField(max_length = 3)
    city = models.CharField(max_length = 64)

    def __str__(self):
        return f"{self.city} ({self.code})"

class Flight(models.Model):

    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="departures") # related_name for reverse traversal. Givevn an airport, access all flights leaving from airport. #models.CharField(max_length = 64)
    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="arrivals") #models.CharField(max_length = 64)
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.origin} to {self.destination}"


class TestFlight(models.Model):
    origin = models.CharField(max_length = 64)
    destination = models.CharField(max_length = 64)
    duration = models.IntegerField()

    def __str__(self):
        return f"Test Flight: {self.id}: {self.origin} to {self.destination}"

