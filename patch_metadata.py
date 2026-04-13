import json
import os

locales = {
    'pt': {
        "home_title": "Design UI/UX e Desenvolvimento Web",
        "home_description": "Transforme sua marca com Leonardo Ferreira: Especialista em UI/UX Design, websites premium de alta performance e web apps interativos voltados para o futuro do digital.",
        "orcamento_title": "Solicite um Orçamento",
        "orcamento_description": "Pronto para inovar? Entre em contato, conte mais sobre o seu projeto e solicite um orçamento sob medida para alavancar a presença digital da sua marca.",
        "project_title_prefix": "Case de Sucesso",
        "project_description": "Explore os detalhes e o processo criativo deste projeto de UI/UX Design desenvolvido por Leonardo Ferreira, focado em estética apurada e performance excepcional."
    },
    'en': {
        "home_title": "UI/UX Design and Web Development",
        "home_description": "Transform your brand with Leonardo Ferreira: Expert in UI/UX Design, premium high-performance websites, and interactive web apps built for the digital future.",
        "orcamento_title": "Request a Quote",
        "orcamento_description": "Ready to innovate? Get in touch, tell me more about your project, and request a tailored quote to boost your brand's digital presence.",
        "project_title_prefix": "Success Case",
        "project_description": "Explore the details and creative process of this UI/UX Design project developed by Leonardo Ferreira, focused on refined aesthetics and exceptional performance."
    },
    'es': {
        "home_title": "Diseño UI/UX y Desarrollo Web",
        "home_description": "Transforma tu marca con Leonardo Ferreira: Especialista en Diseño UI/UX, sitios web premium de alto rendimiento y web apps interactivas diseñadas para el futuro digital.",
        "orcamento_title": "Solicite un Presupuesto",
        "orcamento_description": "¿Listo para innovar? Contáctame, cuéntame más sobre tu proyecto y solicita un presupuesto a medida para impulsar la presencia digital de tu marca.",
        "project_title_prefix": "Caso de Éxito",
        "project_description": "Explora los detalles y el proceso creativo de este proyecto de Diseño UI/UX desarrollado por Leonardo Ferreira, enfocado en una estética refinada y rendimiento excepcional."
    }
}

messages_dir = 'messages'

for loc, metadata in locales.items():
    file_path = os.path.join(messages_dir, f'{loc}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        data['Metadata'] = metadata
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f'Updated {file_path}')
