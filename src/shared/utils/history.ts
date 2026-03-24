import { createBrowserHistory } from 'history'

/**
 * History personalizado basado en `createBrowserHistory`.
 *
 * ✅  Permite utilizar `customHistory.push()` si en el futuro decides
 *     cambiar de HashRouter a HistoryRouter (browser) sin tocar el resto
 *     de la aplicación.
 */
export const customHistory = createBrowserHistory()
