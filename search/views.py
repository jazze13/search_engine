from django.shortcuts import render
from search.searcher import search
from search.bg_pics import get_imgs

def index(request):
    keyword = request.POST.get('search_input', None)

    imgs = []
    if get_imgs():
        imgs = get_imgs()

    if keyword:
        search_results = search(keyword)
        context = { 
            'search_results':search_results,
            'keyword':keyword,
            'imgs':imgs,
        }
    else:
        context = {
            'imgs':imgs,
        }

    return render(request, 'index.html', context)
