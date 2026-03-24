# Interface: User

Defined in: [src/features/auth/types/userTypes.ts:24](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-24)

* Tipos relacionados al módulo de autenticación y usuario.
- Define el modelo de `User`, estructura de `AuthState`, y el `LoginResponse`.

Representa un usuario autenticado del sistema.

## Properties

### agency

> **agency**: `object`

Defined in: [src/features/auth/types/userTypes.ts:36](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-36)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### city

> **city**: `object`

Defined in: [src/features/auth/types/userTypes.ts:38](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-38)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### country

> **country**: `object`

Defined in: [src/features/auth/types/userTypes.ts:37](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-37)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### email

> **email**: `string`

Defined in: [src/features/auth/types/userTypes.ts:30](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-30)

***

### entity

> **entity**: `object`

Defined in: [src/features/auth/types/userTypes.ts:35](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-35)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### first\_name

> **first\_name**: `string`

Defined in: [src/features/auth/types/userTypes.ts:26](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-26)

***

### identification

> **identification**: `string`

Defined in: [src/features/auth/types/userTypes.ts:29](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-29)

***

### last\_name

> **last\_name**: `string`

Defined in: [src/features/auth/types/userTypes.ts:27](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-27)

***

### password\_is\_expired

> **password\_is\_expired**: `boolean`

Defined in: [src/features/auth/types/userTypes.ts:33](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-33)

***

### payment\_methods

> **payment\_methods**: `PaymentMethod`[]

Defined in: [src/features/auth/types/userTypes.ts:48](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-48)

***

### permissions

> **permissions**: `object`[]

Defined in: [src/features/auth/types/userTypes.ts:40](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-40)

#### controller

> **controller**: `string`

#### description

> **description**: `null` \| `string`

#### method

> **method**: `string`

#### module

> **module**: `string`

***

### phone

> **phone**: `string`

Defined in: [src/features/auth/types/userTypes.ts:31](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-31)

***

### picture

> **picture**: `null` \| `string`

Defined in: [src/features/auth/types/userTypes.ts:32](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-32)

***

### role

> **role**: `object`

Defined in: [src/features/auth/types/userTypes.ts:34](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-34)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### service\_events

> **service\_events**: `unknown`[]

Defined in: [src/features/auth/types/userTypes.ts:47](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-47)

***

### services

> **services**: `Service`[]

Defined in: [src/features/auth/types/userTypes.ts:46](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-46)

***

### town

> **town**: `object`

Defined in: [src/features/auth/types/userTypes.ts:39](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-39)

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### type\_identification

> **type\_identification**: `string`

Defined in: [src/features/auth/types/userTypes.ts:28](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-28)

***

### username

> **username**: `string`

Defined in: [src/features/auth/types/userTypes.ts:25](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/features/auth/types/userTypes.ts#lines-25)
