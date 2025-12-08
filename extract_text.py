#!/usr/bin/env python3
"""
Script to extract all user-facing text from EJS files
"""

import os
import re
from pathlib import Path

def extract_text_from_ejs(file_path):
    """Extract user-facing text from EJS files"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    texts = []
    
    # Extract text from HTML tags (between >text<)
    html_texts = re.findall(r'>\s*([^<>{}\n]+?)\s*<', content)
    texts.extend([t.strip() for t in html_texts if t.strip() and not t.strip().startswith('%')])
    
    # Extract placeholder attributes
    placeholders = re.findall(r'placeholder="([^"]+)"', content)
    texts.extend(placeholders)
    
    # Extract value attributes
    values = re.findall(r'value="([^"]+)"', content)
    texts.extend([v for v in values if not v.startswith('<%')])
    
    # Extract title attributes
    titles = re.findall(r'title="([^"]+)"', content)
    texts.extend(titles)
    
    # Extract alert/button text
    buttons = re.findall(r'<button[^>]*>([^<]+)</button>', content)
    texts.extend([b.strip() for b in buttons if b.strip()])
    
    return list(set([t for t in texts if len(t) > 1 and not t.isspace()]))

def scan_views_directory(views_dir):
    """Scan all EJS files in views directory"""
    all_texts = {}
    
    for root, dirs, files in os.walk(views_dir):
        for file in files:
            if file.endswith('.ejs'):
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, views_dir)
                texts = extract_text_from_ejs(file_path)
                if texts:
                    all_texts[relative_path] = texts
    
    return all_texts

if __name__ == '__main__':
    views_dir = 'views'
    
    print("Extracting text from EJS files...\n")
    all_texts = scan_views_directory(views_dir)
    
    print("=" * 60)
    print("EXTRACTED TEXT FROM FILES")
    print("=" * 60)
    
    for file_path, texts in sorted(all_texts.items()):
        print(f"\n📄 {file_path}")
        print("-" * 60)
        for i, text in enumerate(sorted(texts), 1):
            print(f"  {i}. {text}")
    
    print("\n" + "=" * 60)
    print(f"Total files: {len(all_texts)}")
    total_texts = sum(len(texts) for texts in all_texts.values())
    print(f"Total unique texts: {total_texts}")
    print("=" * 60)
