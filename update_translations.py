import json

with open("pt_projects.json", "r") as f:
    pt_projects = json.load(f)

en_projects = {
  "projeto-mademax": {
    "description": "MADEMAX is a manufacturer of steel sheet tiles and thermoacoustic tiles.",
    "challenge": "The MADEMAX club sets a new standard for sport shooting in Brazil, combining respect for the sport's traditions with high-performance infrastructure and tactical sophistication.",
    "solution": "The visual identity was designed to project absolute precision and exclusivity, using a central symbol that resembles a crosshair and the convergence of traditional values. Through a palette combining deep authority blue with tactical precision orange, the brand communicates security, technical rigor, and prestige. The design positions MADEMAX not just as a shooting club, but as a seal of excellence for those seeking technical mastery in an environment of absolute trust and sporting heritage.",
    "services": "Visual Identity and Branding"
  },
  "projeto-biothera": {
    "description": "Biothera operates in the natural health and aesthetics segment.",
    "challenge": "Specializing in biological solutions for agribusiness, Biothera combines the power of nature with the efficiency of sustainable management.",
    "solution": "The logo merges the symbol of 'energy/power' with botanical elements, symbolizing the activation of life and productivity in the field. The visual identity communicates balance and biological innovation, establishing Biothera as a benchmark in sustainability and agricultural technology.",
    "services": "Visual Identity and Branding"
  },
  "projeto-divinocar": {
    "description": "Divino Car operates in the automotive sector.",
    "challenge": "Divino Car redefines the concept of an automotive workshop, elevating trust and personalized care to the status of a brand differentiator.",
    "solution": "The visual identity uses a sporty aesthetic and dynamic typography to convey speed and technical excellence, while the color palette brings a modern and welcoming energy. The result is a strong brand that breaks away from industry clichés, focusing on the customer's experience and safety.",
    "services": "Visual Identity and Branding"
  },
  "projeto-proconsult": {
    "description": "ProConsult operates in construction management and consulting.",
    "challenge": "ProConsult was born to transform the operational reality of SMEs, structuring processes that reduce direct dependence on the founder and restore clarity to the business.",
    "solution": "The visual identity was designed to convey solidity and fluidity, using a palette of sober tones and a symbol that refers to connection and continuity. The result is a brand that projects authority and predictability, essential for a consultancy that promises organization and strategic freedom to its clients.",
    "services": "Visual Identity and Branding"
  },
  "projeto-hellobim": {
    "description": "Hello BIM operates in the architecture and compatibilization area.",
    "challenge": "Hello BIM emerged to democratize the teaching of the BIM methodology, transforming a complex technical process into something practical and accessible.",
    "solution": "The brand's design is modular and architectural, reflecting the very essence of digital construction. Through vibrant visual communication and block typography, the brand positions itself as the gateway for professionals seeking technological mastery in modern architecture.",
    "services": "Visual Identity and Branding"
  },
  "projeto-raxseguros": {
    "description": "RAX operates with insurance and heritage protection.",
    "challenge": "As a brokerage focused on the corporate sector and large-scale fleets, RAX Seguros requires an image of absolute protection and scale.",
    "solution": "The visual identity uses a geometric shield icon and high-contrast colors to convey vigilance and precision. The rebranding reinforces RAX's capacity to offer tailored solutions for large corporations, transforming risk management into a strategic and secure process.",
    "services": "Visual Identity and Branding"
  },
  "projeto-polysantos": {
    "description": "Personal photographic and creative brand.",
    "challenge": "The Poly Santos office specializes in modular architecture, where timeless aesthetics meet constructive efficiency.",
    "solution": "The visual identity was built on minimalist lines that form a solid structure, symbolizing the union between luxury design and functionality. The brand communicates sophistication and precision, reflecting the office's mission to realize dreams through intelligent and innovative projects.",
    "services": "Visual Identity and Branding"
  },
  "projeto-ecomove": {
    "description": "Ecomove is a startup focused on electric mobility and sustainability.",
    "challenge": "ecomove emerges to lead the revolution of sustainable urban mobility, offering electric scooters and bicycles that redefine movement in cities, making it clean, efficient, and inclusive.",
    "solution": "The visual identity was designed to convey tactile energy and conscious fluidity, using a unique color palette combining sustainability green with innovative purple and sky blue. The central symbol is an 'eM' emblem organically fusing the shape of a heart with the stroke of an electric arc, symbolizing care for the planet and the activation of urban life.",
    "services": "Visual Identity and Branding"
  },
  "projeto-remachcapital": {
    "description": "Remach Capital operates in financial advisory and M&A.",
    "challenge": "Remach Capital operates in the financial protection and insurance sector, where trust and ethics are fundamental pillars.",
    "solution": "The identity was developed to translate clarity and security, using robust geometric shapes and a technological blue palette that communicates seriousness and real tracking. The design positions Remach as a consultative and approachable brand, capable of simplifying complex decisions for its clients.",
    "services": "Visual Identity and Branding"
  }
}

es_projects = {
  "projeto-mademax": {
    "description": "MADEMAX es un fabricante de tejas de chapa de acero y tejas termoacústicas.",
    "challenge": "El club MADEMAX establece un nuevo estándar para el tiro deportivo en Brasil, combinando el respeto por las tradiciones del deporte con una infraestructura de alto rendimiento y sofisticación táctica.",
    "solution": "La identidad visual fue concebida para proyectar precisión absoluta y exclusividad, utilizando un símbolo central que recuerda a una mira y la convergencia de valores tradicionales. A través de una paleta que combina el azul profundo de la autoridad con el naranja táctico de la energía y precisión, la marca comunica seguridad, rigor técnico y prestigio. El diseño posiciona a MADEMAX no solo como un club de tiro, sino como un sello de excelencia para quienes buscan el dominio técnico en un entorno de absoluta confianza y herencia deportiva.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-biothera": {
    "description": "Biothera opera en el segmento de salud y estética enfocada en lo natural.",
    "challenge": "Especializada en soluciones biológicas para el agro-negocio, Biothera une la fuerza de la naturaleza con la eficiencia de la gestión sustentable.",
    "solution": "El logotipo fusiona el símbolo de 'energía/poder' con elementos botánicos, simbolizando la activación de la vida y la productividad en el campo. La identidad visual comunica equilibrio e innovación biológica, estableciendo a Biothera como una referencia en sostenibilidad y tecnología agrícola.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-divinocar": {
    "description": "Divino Car opera en el sector automotriz.",
    "challenge": "Divino Car redefine el concepto de taller automotriz, elevando la confianza y la atención personalizada al estatus de diferenciador de marca.",
    "solution": "La identidad visual utiliza una estética deportiva y tipografía dinámica para transmitir velocidad y excelencia técnica, mientras que la paleta de colores aporta una energía moderna y acogedora. El resultado es una marca fuerte que rompe con los clichés de la industria, centrándose en la experiencia y la seguridad del cliente.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-proconsult": {
    "description": "ProConsult opera en la gestión de obras y consultoría.",
    "challenge": "ProConsult nació para transformar la realidad operativa de las PYMEs, estructurando procesos que reducen la dependencia directa del fundador y devuelven claridad al negocio.",
    "solution": "La identidad visual fue diseñada para transmitir solidez y fluidez, utilizando una paleta de tonos sobrios y un símbolo que remite a la conexión y la continuidad. El resultado es una marca que proyecta autoridad y previsibilidad, esencial para una consultoría que promete organización y libertad estratégica a sus clientes.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-hellobim": {
    "description": "Hello BIM opera en el área de arquitectura y compatibilización.",
    "challenge": "Hello BIM surgió para democratizar la enseñanza de la metodología BIM, transformando un proceso técnico complejo en algo práctico y accesible.",
    "solution": "El diseño de la marca es modular y arquitectónico, reflejando la esencia misma de la construcción digital. A través de una comunicación visual vibrante y tipografía en bloques, la marca se posiciona como la puerta de entrada para los profesionales que buscan el dominio tecnológico en la arquitectura moderna.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-raxseguros": {
    "description": "RAX opera con seguros y protección patrimonial.",
    "challenge": "Como corredora enfocada en el sector corporativo y flotas de gran escala, RAX Seguros requiere una imagen de protección absoluta y escala.",
    "solution": "La identidad visual utiliza un ícono de escudo geométrico y colores de alto contraste para transmitir vigilancia y precisión. El rebranding refuerza la capacidad de RAX para ofrecer soluciones a medida para grandes corporaciones, transformando la gestión de riesgos en un proceso estratégico y seguro.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-polysantos": {
    "description": "Marca personal fotográfica y creativa.",
    "challenge": "La oficina de Poly Santos se especializa en arquitectura modular, donde la estética atemporal se encuentra con la eficiencia constructiva.",
    "solution": "La identidad visual se basó en líneas minimalistas que forman una estructura sólida, simbolizando la unión entre el diseño de lujo y la funcionalidad. La marca comunica sofisticación y precisión, reflejando la misión de la oficina de realizar sueños a través de proyectos inteligentes e innovadores.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-ecomove": {
    "description": "Ecomove es una startup enfocada en movilidad eléctrica y sostenibilidad.",
    "challenge": "ecomove surge para liderar la revolución de la movilidad urbana sostenible, ofreciendo monopatines y bicicletas eléctricas que redefinen el movimiento en las ciudades, haciéndolo limpio, eficiente e inclusivo.",
    "solution": "La identidad visual fue diseñada para transmitir energía táctil y fluidez consciente, utilizando una paleta de colores única que combina el verde sostenible con el morado y azul cielo de la innovación. El símbolo central es un emblema 'eM' que fusiona orgánicamente la forma de un corazón con el trazo de un arco eléctrico, simbolizando el cuidado por el planeta y la activación de la vida urbana.",
    "services": "Identidad Visual y Branding"
  },
  "projeto-remachcapital": {
    "description": "Remach Capital opera en asesoramiento financiero y M&A.",
    "challenge": "Remach Capital opera en el sector de protección financiera y seguros, donde la confianza y la ética son pilares fundamentales.",
    "solution": "La identidad se desarrolló para traducir claridad y seguridad, utilizando formas geométricas robustas y una paleta azul tecnológica que comunica seriedad y seguimiento real. El diseño posiciona a Remach como una marca consultiva y accesible, capaz de simplificar decisiones complejas para sus clientes.",
    "services": "Identidad Visual y Branding"
  }
}

for lang_code, data in [("pt", pt_projects), ("en", en_projects), ("es", es_projects)]:
    with open(f"messages/{lang_code}.json", "r+", encoding="utf-8") as f:
        content = json.load(f)
        content["ProjectsData"] = data
        if lang_code == "pt":
            content["CaseStudy"]["back_portfolio"] = "Voltar ao Portfólio"
        elif lang_code == "en":
            content["CaseStudy"]["back_portfolio"] = "Back to Portfolio"
        elif lang_code == "es":
            content["CaseStudy"]["back_portfolio"] = "Volver al Portafolio"
            
        f.seek(0)
        f.truncate()
        json.dump(content, f, indent=2, ensure_ascii=False)

print("Injected translated content into JSON dictionaries.")
