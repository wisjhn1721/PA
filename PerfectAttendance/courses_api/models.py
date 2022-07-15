from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# Create your models here.
class Course(models.Model):
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    code = models.CharField(max_length=24)
    building = models.CharField(max_length=100)
    room = models.CharField(max_length=100)
    # enrolled = models.ManyToManyField(Student)
    # meetingDays = models.CharField(max_length=5)
    # startDate = models.DateField(default=timezone.now)
    # endDate = models.DateField(default=timezone.now)
    # times
    # startTime = models.TimeField(default=timezone.now)
    # endTime = models.TimeField(default=timezone.now)
    # beforeStartWindow = models.IntegerField(default=0)
    # afterStartWindow = models.IntegerField(default=0)
    # beforeEndWindow = models.IntegerField(default=0)
    # afterEndWindow = models.IntegerField(default=0)
    #
    # courseFormat = models.CharField(
    #     max_length=9,
    #     choices=[('On-Campus', 'On-Campus'), ('Online', 'Online'), ('Hybrid', 'Hybrid')],
    #     default='On-Campus'
    # )

    def __str__(self):
        return self.code + "-" + self.title
