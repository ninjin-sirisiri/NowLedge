import { Meta, MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

import './app.css';

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>NowLedge</Title>
          <Meta
            name="description"
            content="NowLedgeは、開発者向けの技術知識共有プラットフォームです。"
          />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
