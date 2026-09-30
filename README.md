# Running Pace & Split Calculator — Documentación Técnica

## 1. Descripción General del Proyecto (Overview)
Aplicación web de alto rendimiento orientada al cálculo de métricas de rendimiento en running (ritmo por kilómetro). Diseñada bajo un enfoque minimalista y tipográfico de alto contraste (estilo editorial), priorizando la accesibilidad visual, la velocidad de carga y la robustez lógica frente a dependencias innecesarias.

* **Stack Tecnológico**: React 18, TypeScript, Vite, Tailwind CSS v4.
* **Filosofía de Arquitectura**: *Zero-bloat architecture* (código limpio sin librerías externas de terceros para la lógica de negocio).

---

## 2. Decisiones Arquitectónicas y Estructura del Repositorio
El proyecto sigue una estructura modular y escalable pensada para facilitar el mantenimiento y la lectura del código por otros desarrolladores:

```text
running-calculator/
│
├── public/                 # Recursos estáticos y assets globales
├── src/
│   ├── components/         # Componentes UI reutilizables (futura modularización)
│   ├── App.tsx             # Componente raíz: gestión de estado y lógica principal
│   ├── index.css           # Capa de estilos globales y directiva de Tailwind v4[cite: 1]
│   └── main.tsx            # Punto de montaje del DOM virtual con StrictMode
│
├── package.json            # Dependencias y control de scripts de Vite
├── vite.config.ts          # Configuración del empaquetador con el plugin de Tailwind[cite: 1, 2]
└── postcss.config.js       # Configuración de procesamiento de CSS

3. Teorías y Conceptos de Ingeniería Aplicados
Desde el punto de vista de la ingeniería de software y la lógica algorítmica, la aplicación implementa los siguientes fundamentos técnicos:

Tipado Estático y Seguridad de Datos (TypeScript): Uso de interfaces y tipado explícito (<string>, tipado de eventos de formularios) para prevenir errores en tiempo de compilación y garantizar la integridad de los inputs del usuario[cite: 1].

Algoritmos de Conversión de Sistemas Numéricos (Base 10 vs. Base 60):

El reto: El tiempo se mide en formato sexagesimal (MM:SS), mientras que las operaciones matemáticas estándar operan en base decimal.

La solución: Implementación de un algoritmo de parsing que desestructura cadenas de texto mediante String.prototype.split(), transforma los segundos a una fracción decimal de minutos (segundos / 60), ejecuta la división entre la distancia y reconvierte el residuo utilizando métodos de redondeo matemático preciso (Math.floor() para minutos enteros y Math.round() para los segundos resultantes).

Gestión de Estado Reactiva (React useState): Manejo de flujos de datos unidireccionales eficientes para actualizar la interfaz en tiempo real de manera limpia y predecible ante cada interacción del usuario.

4. Decisiones de Diseño y Experiencia de Usuario (UX/UI Writing)
Diseño Editorial Minimalista: Uso intencional de una paleta de alto contraste (blanco, negro puro y grises neutros) para reducir la fatiga cognitiva del usuario.

Tipografía de Alto Impacto: Jerarquía visual basada en pesos tipográficos pesados (font-black, tracking-tighter) para guiar la lectura del dato clave (el ritmo por kilómetro) de un solo vistazo.