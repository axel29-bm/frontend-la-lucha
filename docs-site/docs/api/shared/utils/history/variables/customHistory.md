# Variable: customHistory

> `const` **customHistory**: `BrowserHistory`

Defined in: [src/shared/utils/history.ts:10](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/utils/history.ts#lines-10)

History personalizado basado en `createBrowserHistory`.

✅  Permite utilizar `customHistory.push()` si en el futuro decides
    cambiar de HashRouter a HistoryRouter (browser) sin tocar el resto
    de la aplicación.
