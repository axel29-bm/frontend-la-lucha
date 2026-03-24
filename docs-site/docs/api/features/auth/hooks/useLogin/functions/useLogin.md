# Function: useLogin()

> **useLogin**(): `object`

Defined in: [src/features/auth/hooks/useLogin.ts:14](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/hooks/useLogin.ts#lines-14)

Custom hook: `useLogin`
- Encapsula la lógica de inicio de sesión.
- Administra estado local `loading` y `error`.
- Dispara acciones de Redux (`loginStart`, `loginSuccess`, `loginFailure`).
- Redirige al usuario al dashboard si el login es exitoso.

## Returns

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### login()

> **login**: (`data`) => `Promise`\<`void`\>

Ejecuta la lógica de login:
- Llama al servicio de autenticación.
- Actualiza el estado global con los datos del usuario.
- Redirige al dashboard.

#### Parameters

##### data

###### password

`string`

###### username

`string`

#### Returns

`Promise`\<`void`\>
