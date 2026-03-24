# Variable: default

> `const` **default**: `object`

Defined in: [src/features/auth/services/authService.ts:11](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/services/authService.ts#lines-11)

authService
- Servicio de autenticación para login.
- Usa Axios para enviar credenciales al backend.
- Valida el código de respuesta y retorna el usuario autenticado.

## Type declaration

### login()

> **login**: (`username`, `password`) => `Promise`\<[`LoginResponse`](../../../types/userTypes/interfaces/LoginResponse.md)\>

Envia una solicitud POST para autenticación del usuario.

#### Parameters

##### username

`string`

Nombre de usuario

##### password

`string`

Contraseña del usuario

#### Returns

`Promise`\<[`LoginResponse`](../../../types/userTypes/interfaces/LoginResponse.md)\>

LoginResponse con token y datos del usuario
