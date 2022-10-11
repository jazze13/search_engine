# -*- coding: utf8 -*-

def search(word, text):
    results = []
    for i in text.replace('!', '.').replace('?', '.').split('.'):
        if word.lower() in i.lower():
            results.append(i)
    if not results:
        return ['0 результатов поиска']
    return results