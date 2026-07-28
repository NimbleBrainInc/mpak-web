#!/usr/bin/env python3
"""Compare visible text of a live mpak.dev page against a locally built page.

Usage: textdiff.py <live-url> <local-html-file>

Strips script/style/head, normalizes whitespace, and reports a word-level diff.
Used to verify the Astro port reproduces the React site's copy exactly.
"""

import difflib
import re
import sys
import urllib.request
from html.parser import HTMLParser

# Container tags whose text is not user-visible page copy. Void tags (meta, link)
# are excluded: they never emit an end tag, so tracking them would unbalance depth.
SKIP = {"script", "style", "noscript", "svg", "head"}


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.depth += 1

    def handle_endtag(self, tag):
        if tag in SKIP and self.depth:
            self.depth -= 1

    def handle_data(self, data):
        if not self.depth:
            self.parts.append(data)


def words(html):
    p = TextExtractor()
    p.feed(html)
    text = " ".join(p.parts)
    text = re.sub(r"\s+", " ", text)
    return [w for w in text.split(" ") if w]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r:
        return r.read().decode("utf-8", "replace")


live_url, local_path = sys.argv[1], sys.argv[2]
live = words(fetch(live_url))
new = words(open(local_path, encoding="utf-8").read())

sm = difflib.SequenceMatcher(None, live, new, autojunk=False)
ratio = sm.ratio()
print(f"live={len(live)}w  new={len(new)}w  similarity={ratio:.1%}")

for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == "equal":
        continue
    a = " ".join(live[i1:i2])[:160]
    b = " ".join(new[j1:j2])[:160]
    if tag == "delete":
        print(f"  ONLY-LIVE: {a}")
    elif tag == "insert":
        print(f"  ONLY-NEW:  {b}")
    else:
        print(f"  CHANGED:   {a}\n          -> {b}")
