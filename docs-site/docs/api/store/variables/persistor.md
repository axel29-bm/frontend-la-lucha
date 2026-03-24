# Variable: persistor

> `const` **persistor**: `Persistor`

Defined in: [src/store.ts:31](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/store.ts#lines-31)

Configuración central de Redux Store con persistencia.
- Usa Redux Toolkit (`configureStore`) para simplificar setup.
- Aplica persistencia con `redux-persist` para mantener el estado de `auth` entre sesiones.
- Combina los reducers principales: `auth`, `sidebar`, etc.
