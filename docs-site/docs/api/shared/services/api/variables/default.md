# Variable: default

> `const` **default**: `AxiosInstance`

Defined in: [src/shared/services/api.ts:14](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/services/api.ts#lines-14)

Configuración global de Axios para peticiones HTTP.

Esta instancia centralizada:
- Agrega automáticamente el token JWT a cada solicitud.
- Maneja errores como expiración de sesión.
- Puede ser reutilizada por todos los servicios (login, transacciones, usuarios, etc.)
