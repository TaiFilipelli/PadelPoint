'use client';
import { UserProvider } from './UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
