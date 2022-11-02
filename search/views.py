from django.shortcuts import render
import re, os

from search.searcher import search

def index(request):
    keyword = request.POST.get('search_input', None)

    pics = []
    for pic in os.walk('/static/img/bg'):
        pics.append(pic)

    if keyword:
        search_results = search(keyword)
        context = { 
            'search_results':search_results,
            'keyword':keyword, 
            'pics':pics,
        }
    else:
        context = None



    return render(request, 'index.html', context)
