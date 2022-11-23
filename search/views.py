from django.shortcuts import render
from search.searcher import search
from search.bg_pics import load_background_imgs

def index(request):
    keyword = request.POST.get('search_input', None)

    imgs = load_background_imgs()

    context = {}

    if keyword:
        search_results = search(keyword)
        context['search_results'] = search_results
        context['keyword'] = keyword

    if imgs:
        context['imgs'] = imgs

    return render(request, 'index.html', context)
