from django.shortcuts import render
import re

from search.searcher import search

def index(request):
    keyword = request.POST.get('search_input', None)

    if keyword:
        search_results = search(keyword)
        context = { 'search_results':search_results, 'keyword':keyword, }
    else:
        context = None

    return render(request, 'index.html', context)
