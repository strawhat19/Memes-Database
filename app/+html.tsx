import type { PropsWithChildren } from 'react';

const RootHtml = ({ children }: PropsWithChildren) => (
  <html lang='en' data-theme='dark'>
    <head>
      <meta charSet='utf-8' />
      <title>Memes Database · Your Next Favorite Meme</title>
      <meta name='theme-color' content='#201C39' />
      <meta name='application-name' content='Memes Database' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='Find your next favorite meme. Browse a playful collection, save favorites, and keep your own memes close.' />
      <link rel='icon' href='/favicon.svg?v=2' type='image/svg+xml' />
      <link rel='manifest' href='/manifest.webmanifest' />
      <link rel='apple-touch-icon' href='/icons/icon-192.png?v=2' />
    </head>
    <body>{children}</body>
  </html>
);

export default RootHtml;
