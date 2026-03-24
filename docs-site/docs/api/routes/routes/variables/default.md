# Variable: default

> `const` **default**: [`AppRoute`](../interfaces/AppRoute.md)[]

Defined in: [src/routes/routes.tsx:20](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/routes/routes.tsx#lines-20)

Definición central de rutas cargadas dinámicamente.
- Cada ruta contiene: `path`, `name` (visible en el breadcrumb) y el componente asociado.
- Usa `React.lazy` para carga diferida (code splitting).
