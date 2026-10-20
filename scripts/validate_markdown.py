#!/usr/bin/env python3
"""Validate Markdown links, heading anchors, and non-portable local file links."""
from pathlib import Path
import argparse, re, sys, urllib.parse
LINK = re.compile(r'(?<!!)\[([^\]]*)\]\(([^)]+)\)|!\[([^\]]*)\]\(([^)]+)\)')
ATX = re.compile(r'^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$')
HTML = re.compile(r'<a\s+[^>]*id=["\']([^"\']+)["\'][^>]*>', re.I)
def slug(s):
    s=re.sub(r'<[^>]+>', '', s).strip().lower()
    s=re.sub(r'[`*_~]', '', s)
    s=re.sub(r'[^\w\- ]', '', s)
    return re.sub(r'\s', '-', s.strip())
def anchors(path):
    out=set(); counts={}
    for line in path.read_text(encoding='utf-8',errors='replace').splitlines():
        m=ATX.match(line)
        if m:
            base=slug(m.group(1)); n=counts.get(base,0); counts[base]=n+1
            out.add(base if n==0 else f'{base}-{n}')
        out.update(HTML.findall(line))
    return out
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('root',nargs='?',default='.',help='Root directory to validate'); args=ap.parse_args(); root=Path(args.root).resolve()
    files=list(root.rglob('*.md')); problems=[]; missing=[]; anchors_bad=[]; external=0; machine_local=[]
    cache={p.resolve():anchors(p) for p in files}
    for f in files:
        txt=f.read_text(encoding='utf-8',errors='replace')
        for m in LINK.finditer(txt):
            target=(m.group(2) or m.group(4) or '').strip().strip('<>'); target=target.split()[0] if target else target
            parsed=urllib.parse.urlsplit(target)
            if parsed.scheme in ('http','https','mailto','tel','data') or target.startswith('//'):
                external+=1; continue
            if parsed.scheme=='file' or re.match(r'^[A-Za-z]:[\\/]',target):
                machine_local.append((f,target)); continue
            if not target: continue
            if not parsed.path:
                path=f.resolve()
            else: path=(f.parent/urllib.parse.unquote(parsed.path)).resolve()
            if not path.exists(): missing.append((f,target)); continue
            frag=urllib.parse.unquote(parsed.fragment)
            if frag and path.suffix.lower()=='.md' and path.resolve() in cache and frag not in cache[path.resolve()]:
                anchors_bad.append((f,target))
    print(f'Root: {root}\nMarkdown files: {len(files)}\nExternal links: {external}\nMissing local targets: {len(missing)}\nInvalid local anchors: {len(anchors_bad)}\nMachine-local link targets: {len(machine_local)}')
    for f,t in missing: print(f'MISSING TARGET: {f.relative_to(root)} -> {t}')
    for f,t in anchors_bad: print(f'BAD ANCHOR: {f.relative_to(root)} -> {t}')
    for f,t in machine_local: print(f'NON-PORTABLE TARGET: {f.relative_to(root)} -> {t}')
    return 1 if missing or anchors_bad or machine_local else 0
if __name__=='__main__': sys.exit(main())
