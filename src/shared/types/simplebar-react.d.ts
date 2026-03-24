declare module 'simplebar-react' {
  import * as React from 'react';

  /** 
   * Declaración de tipos para importar el paquete `simplebar-react` en un proyecto TypeScript.
   * Esto es útil cuando la librería no provee su propio archivo de tipos (`.d.ts`).
   * 
   * Componente wrapper de SimpleBar para scroll personalizado. */
  export default class SimpleBar extends React.Component<React.HTMLAttributes<HTMLDivElement>, object> {}
}