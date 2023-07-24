/// <reference types="vite/client" />
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.module.scss';
