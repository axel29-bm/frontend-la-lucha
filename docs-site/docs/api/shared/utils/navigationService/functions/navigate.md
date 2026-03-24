# Function: navigate()

> **navigate**(`to`, `options?`): `void`

Defined in: [src/shared/utils/navigationService.ts:24](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/utils/navigationService.ts#lines-24)

Servicio global de navegación.

- `setNavigator(navFn)`: Guarda la función `navigate` obtenida de
  `useNavigate()` al montar la app (ver NavigationProvider).
- `navigate(to, options)`: Permite redirigir desde cualquier archivo,
  incluso fuera de componentes React (interceptores, utilidades, etc.).
  *Si la función todavía no está disponible* se hace un *fallback*
  modificando directamente el hash de la URL para que HashRouter pueda
  procesarla sin recargar la página.

Navegación programática universal

## Parameters

### to

`string`

### options?

`NavigateOptions`

## Returns

`void`
