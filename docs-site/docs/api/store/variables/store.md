# Variable: store

> `const` **store**: `EnhancedStore`\<`object` & `PersistPartial`, `UnknownAction`, `Tuple`\<\[`StoreEnhancer`\<\{ `dispatch`: `ThunkDispatch`\<`object` & `PersistPartial`\>; \}\>, `StoreEnhancer`\]\>\>

Defined in: [src/store.ts:24](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/store.ts#lines-24)

Configuración central de Redux Store con persistencia.
- Usa Redux Toolkit (`configureStore`) para simplificar setup.
- Aplica persistencia con `redux-persist` para mantener el estado de `auth` entre sesiones.
- Combina los reducers principales: `auth`, `sidebar`, etc.
