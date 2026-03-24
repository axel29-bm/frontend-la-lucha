# Variable: default

> `const` **default**: `React.FC`\<\{ `children`: `React.ReactNode`; \}\>

Defined in: [src/shared/providers/NavigationProvider.tsx:18](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/providers/NavigationProvider.tsx#lines-18)

NavigationProvider
------------------
Se monta dentro del `<HashRouter>` y, apenas se renderiza,
registra la función `navigate()` global llamando a `setNavigator`.

Así, cualquier parte del código puede llamar:
```ts
import { navigate } from '@/shared/utils/navigationService'
navigate('/login')
```
sin depender de hooks de React.
