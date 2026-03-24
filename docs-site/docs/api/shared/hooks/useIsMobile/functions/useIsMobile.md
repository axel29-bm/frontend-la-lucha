# Function: useIsMobile()

> **useIsMobile**(`breakpoint`): `boolean`

Defined in: [src/shared/hooks/useIsMobile.ts:11](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/hooks/useIsMobile.ts#lines-11)

Hook que determina si el viewport es considerado móvil.
- Usa un breakpoint configurable (por defecto: 768px).
- Escucha eventos de resize y actualiza el estado.

## Parameters

### breakpoint

`number` = `768`

Ancho en px a partir del cual se considera "móvil"

## Returns

`boolean`

`true` si el ancho actual de ventana es menor que el breakpoint
