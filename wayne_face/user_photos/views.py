# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.http import HttpResponse
from user_photos.models import *
from wayne_api import image_lookup, image_report

def index(request):
    return render(request, 'index.html', {})

def signup(request):
    body = json.loads(request.body.decode('utf-8'))
    return HttpResponse(json.dumps(res))

def login_user(request):
    body = json.loads(request.body.decode('utf-8'))
    username = body['email']
    password = body['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        res = {'status': 'success'}
    else:
        res = {'status': 'invalid login'}
    return HttpResponse(json.dumps(res))

def dashboard(request):
    photos = UserPhoto.objects.filter(user=request.user)
    return render(request, 'dashboard.html', {'photos': photos})

def submit_photo(request):
    body = json.loads(request.body.decode('utf-8'))
    results = image_lookup(body['image'])

    villain, _ = Villain.objects.get_or_create(name=results['closest_match'])

    UserPhoto.objects.create(
        user=request.user,
        photo=results['location'],
        villain = villain,
        match_confidence = results['percent_match'],
    )
    res = {'status': 'success'}
    return HttpResponse(json.dumps(res))

def report_photo(request):
    body = json.loads(request.body.decode('utf-8'))
    image = UserPhoto.objects.get(pk=body['pk'])
    results = image_report(image.photo)

    image.reported = True
    image.save()

    res = {'status': 'success'}
    return HttpResponse(json.dumps(res))
