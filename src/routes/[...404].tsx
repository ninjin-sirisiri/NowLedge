import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Title>Not Found - NowLedge</Title>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Not Found</h1>
      <p class="mt-8">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
      </p>
    </main>
  );
}
