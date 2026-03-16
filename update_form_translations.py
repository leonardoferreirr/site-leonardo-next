import json

form_pt = {
    "back_home": "Voltar ao Início",
    "title": "Formulário para Proposta de Investimento",
    "subtitle": "Este formulário é o primeiro passo para entender melhor sobre os desafios e objetivos do projeto, vamos nessa?",
    "contact_info": "Dados de Contato",
    "full_name": "Qual é o seu nome completo?",
    "type_here": "Digite aqui...",
    "email": "Informe seu melhor email",
    "whatsapp": "Whatsapp com DDD (opcional)",
    "instagram": "Instagram da sua empresa (se houver)",
    "company_data": "Dados da empresa",
    "company_name": "Nome da sua empresa?",
    "employees": "Quantos funcionários sua empresa possui atualmente?",
    "select_option": "Selecione uma das opções",
    "emp_1_5": "1 a 5 funcionários",
    "emp_6_20": "6 a 20 funcionários",
    "emp_21_50": "21 a 50 funcionários",
    "emp_50_plus": "50+ funcionários",
    "products": "Quais produtos ou serviços sua empresa oferece?",
    "final_info": "Informações Finais",
    "how_found": "Como nos encontrou?",
    "ref_instagram": "Instagram",
    "ref_linkedin": "LinkedIn",
    "ref_google": "Google",
    "ref_referral": "Indicação",
    "ref_other": "Outros",
    "revenue": "Qual faturamento mensal da sua empresa?",
    "rev_10k": "Até R$ 10.000",
    "rev_50k": "R$ 10.000 a R$ 50.000",
    "rev_100k": "R$ 50.000 a R$ 100.000",
    "rev_100k_plus": "Acima de R$ 100.000",
    "message": "Fale um pouco sobre a sua empresa e os principais desafios que enfrentam hoje",
    "submit": "Enviar"
}

form_en = {
    "back_home": "Back to Home",
    "title": "Investment Proposal Form",
    "subtitle": "This form is the first step to better understand the project's challenges and goals. Let's go?",
    "contact_info": "Contact Information",
    "full_name": "What is your full name?",
    "type_here": "Type here...",
    "email": "Provide your best email",
    "whatsapp": "WhatsApp (optional)",
    "instagram": "Company Instagram (if applicable)",
    "company_data": "Company Data",
    "company_name": "Company name?",
    "employees": "How many employees does your company currently have?",
    "select_option": "Select an option",
    "emp_1_5": "1 to 5 employees",
    "emp_6_20": "6 to 20 employees",
    "emp_21_50": "21 to 50 employees",
    "emp_50_plus": "50+ employees",
    "products": "What products or services do you offer?",
    "final_info": "Final Information",
    "how_found": "How did you find us?",
    "ref_instagram": "Instagram",
    "ref_linkedin": "LinkedIn",
    "ref_google": "Google",
    "ref_referral": "Referral",
    "ref_other": "Other",
    "revenue": "What is your company's monthly revenue?",
    "rev_10k": "Up to $10,000",
    "rev_50k": "$10,000 to $50,000",
    "rev_100k": "$50,000 to $100,000",
    "rev_100k_plus": "Above $100,000",
    "message": "Tell us about your company and your main challenges today",
    "submit": "Send"
}

form_es = {
    "back_home": "Volver al Inicio",
    "title": "Formulario de Propuesta de Inversión",
    "subtitle": "Este formulario es el primer paso para comprender mejor los desafíos y objetivos del proyecto, ¿vamos?",
    "contact_info": "Datos de Contacto",
    "full_name": "¿Cuál es tu nombre completo?",
    "type_here": "Escribe aquí...",
    "email": "Ingresa tu mejor correo",
    "whatsapp": "WhatsApp (opcional)",
    "instagram": "Instagram de la empresa (si hay)",
    "company_data": "Datos de la empresa",
    "company_name": "¿Nombre de tu empresa?",
    "employees": "¿Cuántos empleados tiene actualmente su empresa?",
    "select_option": "Selecciona una opción",
    "emp_1_5": "1 a 5 empleados",
    "emp_6_20": "6 a 20 empleados",
    "emp_21_50": "21 a 50 empleados",
    "emp_50_plus": "Más de 50 empleados",
    "products": "¿Qué productos o servicios ofreces?",
    "final_info": "Información Final",
    "how_found": "¿Cómo nos encontraste?",
    "ref_instagram": "Instagram",
    "ref_linkedin": "LinkedIn",
    "ref_google": "Google",
    "ref_referral": "Indicación",
    "ref_other": "Otros",
    "revenue": "¿Cuál es la facturación mensual de su empresa?",
    "rev_10k": "Hasta $10.000",
    "rev_50k": "De $10.000 a $50.000",
    "rev_100k": "De $50.000 a $100.000",
    "rev_100k_plus": "Más de $100.000",
    "message": "Cuéntanos sobre tu empresa y tus principales desafíos hoy",
    "submit": "Enviar"
}

for lang_code, data in [("pt", form_pt), ("en", form_en), ("es", form_es)]:
    with open(f"messages/{lang_code}.json", "r+", encoding="utf-8") as f:
        content = json.load(f)
        content["Form"] = data
        f.seek(0)
        f.truncate()
        json.dump(content, f, indent=2, ensure_ascii=False)

print("Injected Form translations.")
