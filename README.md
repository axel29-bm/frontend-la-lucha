# Multipago Reporte 2025 📊
> Front-end empresarial construido con **React 19**, **Vite** y **TypeScript estricto**

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|--------|-----------|
| **React**  | 19.x   | Framework UI |
| **Vite**   | 5.x    | Bundler / Dev Server ultrarrápido |
| **TypeScript** | 5.x | Tipado estricto |
| **Redux Toolkit + RTKQ** | Última | State management |
| **CoreUI** | 5.x | Sistema de componentes |
| **ESLint + Prettier** | Últimas | Linting & format |
| **TypeDoc + Docusaurus** | 0.25 / 3.x | Documentación automática |

---

## 🏗️ Arquitectura

### 1. Feature-based
Cada módulo de negocio vive en `/src/features/<feature>` e incluye **componentes, hooks, slices, servicios y tipos** propios.  
Facilita trabajo en paralelo, escalabilidad y pruebas aisladas.

### 2. Atomic Design
| Nivel | Ejemplos | Ubicación |
|-------|----------|-----------|
| **Átomos** | Button, Input, Icon | `components/atoms/` |
| **Moléculas** | FieldInput, SearchBar | `components/molecules/` |
| **Organismos** | DataTable, LoginCard | `components/organisms/` |

### 3. Patrones y principios
- **Container / Presentational**, **Facade**, **Singleton**
- **SOLID**, **DRY**, **KISS**
- TypeScript estricto (`noUncheckedIndexedAccess`, `strictNullChecks`, etc.)
- ESLint + Prettier integrados en CI

---

## 🌳 Estructura de carpetas

```plaintext
src/
│
├── features/         # Cada módulo/feature es auto-contenido (auth, dashboard, transactions, etc)
│   ├── {feature}/
│   │   ├── components/atoms/        # Átomos: los componentes más pequeños y reutilizables (botón, input, label)
│   │   ├── components/molecules/    # Moléculas: combinaciones de átomos que forman una unidad funcional simple (form-group, search-bar)
│   │   ├── components/organisms/    # Organismos: conjuntos complejos, combinando moléculas y/o átomos (formularios completos, tablas, cards grandes)
│   │   ├── hooks/                   # Custom hooks relacionados únicamente a esta feature
│   │   ├── pages/                   # Páginas de alto nivel de la feature (rutas completas)
│   │   ├── services/                # Servicios/API calls específicos de la feature
│   │   ├── slices/                  # Slices/reducers de Redux o Zustand propios de la feature
│   │   ├── types/                   # Tipos/typescript propios de la feature
│   │   └── ...otros submódulos
│   └── ...otros módulos/features
│
├── shared/
│   ├── components/atoms/            # Átomos reutilizables globales (botones, inputs, tooltips, íconos, spinners)
│   ├── components/molecules/        # Moléculas globales (search bar universal, toolbar de tablas, etc)
│   ├── components/organisms/        # Organismos globales (alertas globales, modal genérico, layouts)
│   ├── constants/                   # Constantes globales (colores, textos, keys, endpoints base)
│   ├── hooks/                       # Hooks reutilizables en varias features (useDebounce, usePrevious, etc)
│   ├── services/                    # Servicios reutilizables globales (ej: auth global, storage util, etc)
│   ├── types/                       # Tipos/typescript globales
│   ├── utils/                       # Funciones utilitarias (formateo de fechas, validadores, helpers generales)
│
├── layouts/                         # Componentes de layout generales (Sidebar, Header, Footer, Wrapper)
├── routes/                          # Definición central de rutas y PrivateRoute logic
├── assets/                          # Imágenes, fuentes, estilos globales
├── App.js (o App.tsx)               # Root Component (puente entre router, store, y layout principal)
└── main.js (o main.tsx)             # Entry Point de React (donde se monta la app en el DOM)

```
---

## 🚀 Inicio rápido

# 1. Instalar dependencias

```plaintext
npm install
```
# 2. Entorno de desarrollo

```plaintext
npm run dev       # http://localhost:5173
```

# 3. Build producción

```plaintext
npm run build
npm run preview   # Servir el build
```

## Documentación automática
El portal de docs se genera con TypeDoc + Docusaurus y vive en docs-site/.

# Entrar a la carpeta de: 

```plaintext
cd docs-site/
```

# Instalar  las dependencias correspondientess

```plaintext
npm install
```

# 1. Generar la API (TypeDoc → Markdown)

```plaintext
npm run docs:api       # dentro de docs-site/
```

# 2. Levantar el sitio (Docusaurus)

```plaintext
npm run docs:dev       # http://localhost:3000
```

Estructura resultante:

```plaintext
docs-site/
├─ docs/           # Guías en MD/MDX
├─ api/            # Markdown generado por TypeDoc
└─ build/          # Sitio estático listo para desplegar
```

## Enlaces oficiales

- [TypeDoc 🔗](https://typedoc.org/)
- [Docusaurus 🔗](https://docusaurus.io/)

## 🔐 Variables de entorno

Uso de archivos .env en Vite (React 19)
Vite carga primero los archivos de entorno específicos según el modo en que corres el proyecto.

Si ejecutas npm run dev o vite, el modo es development y se cargará .env.development si existe.

Si ejecutas npm run build, el modo es production y se cargará .env.production si existe.

Si no existe un archivo específico para el modo, se usará el archivo .env por defecto.

Orden de prioridad para variables de entorno:

```plaintext
.env.[mode].local (más específico)

.env.[mode]

.env.local

.env (más general)
```

Recomendación:

Usa .env.development para variables de desarrollo.

Usa .env.production para producción.

Usa .env para valores comunes a todos los entornos.

Ejemplo:
Si tienes ambos archivos .env y .env.development, al correr npm run dev se usará lo que está en .env.development.

```plaintext
cp .env.development .env
```