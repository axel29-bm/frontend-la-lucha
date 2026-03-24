# Variable: default

> `const` **default**: `React.FC`\<`PrivateRouteProps`\>

Defined in: [src/shared/components/organisms/PrivateRoute.tsx:16](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/components/organisms/PrivateRoute.tsx#lines-16)

Componente de ruta protegida.
- Evalúa si el usuario está autenticado (mediante Redux).
- Si no lo está, lo redirige al login.
- Si lo está, muestra el contenido hijo de forma segura.
