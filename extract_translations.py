import json
import re
import os

projects_path = '/Volumes/PortableSSD/Azimov/Site Leonardo/site-leonardo-next/src/data/projects.ts'

with open(projects_path, 'r', encoding='utf-8') as f:
    content = f.read()

array_match = re.search(r'export const projectsData = (\[.*\]);', content, re.DOTALL)
if array_match:
    array_str = array_match.group(1)
    projects = json.loads(array_str)
    
    pt_data = {}
    for p in projects:
        pt_data[p['slug']] = {
            "description": p['description'],
            "challenge": p.get('challenge', ''),
            "solution": p.get('solution', ''),
            "services": p.get('services', '')
        }
        
    with open('pt_projects.json', 'w', encoding='utf-8') as f:
        json.dump(pt_data, f, indent=2, ensure_ascii=False)
    print("Extracted to pt_projects.json")
