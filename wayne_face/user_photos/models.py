# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Villain(models.Model):
    name = models.CharField(max_length=128)

class UserPhoto(models.Model):
    user = models.ForeignKey(User)
    photo = models.CharField(max_length=256)
    villain = models.ForeignKey(Villain, blank=True, null=True)
    match_confidence = models.FloatField(default=0, blank=True, null=True)
    reported = models.BooleanField(default=False)
