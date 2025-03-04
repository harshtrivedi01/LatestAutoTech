import { Html, Head, Main, NextScript } from 'next/document';
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
