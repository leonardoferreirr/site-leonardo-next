import re
import os
import json

base_dir = '/Volumes/PortableSSD/Azimov/Site Leonardo'
projects_ts_path = os.path.join(base_dir, 'site-leonardo-next/src/data/projects.ts')

with open(projects_ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

array_match = re.search(r'export const projectsData = (\[.*\]);', content, re.DOTALL)
if array_match:
    array_str = array_match.group(1)
    projects = json.loads(array_str)
    
    for p in projects:
        slug = p['slug']
        html_file = os.path.join(base_dir, slug + '.html')
        if os.path.exists(html_file):
            with open(html_file, 'r', encoding='utf-8') as hf:
                html_content = hf.read()
                
            client_match = re.search(r'<span class="ds-body-sm">Cliente</span>.*?<p[^>]*>(.*?)</p>', html_content, re.DOTALL)
            services_match = re.search(r'<span class="ds-body-sm">Serviços Executados</span>.*?<p[^>]*>(.*?)</p>', html_content, re.DOTALL)
            year_match = re.search(r'<span class="ds-body-sm">Ano</span>.*?<p[^>]*>(.*?)</p>', html_content, re.DOTALL)
            
            p['client'] = client_match.group(1).strip().replace('\n', ' ').replace('                        ', ' ') if client_match else p['title']
            p['services'] = services_match.group(1).strip().replace('\n', ' ').replace('                        ', ' ') if services_match else 'Identidade Visual e Branding'
            p['year'] = year_match.group(1).strip() if year_match else '2025'
            
    new_array_str = json.dumps(projects, indent=2, ensure_ascii=False)
    new_content = content[:array_match.start(1)] + new_array_str + content[array_match.end(1):]
    
    with open(projects_ts_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("projects.ts updated")
else:
    print("Could not parse projectsData")
