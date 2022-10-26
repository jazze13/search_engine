# -*- coding: utf8 -*-

import re

def search(keyword):
    text_file = open('search/static/text.txt')
    text = ''
    results = []

    for line in text_file:
        text += line

    for sentence in re.sub('[!|?|...]', '.', text).split('.'):
        for word in re.sub('[,|;|:|"|\'|.]', ' ', sentence).split():
            if keyword.lower() == word.lower():
                results.append(sentence)
                break

    return results

