// app/layout.js
import Navbar from '../components/Navbar';
import '../styles/globals.css';

export const metadata = {
  title: 'Gestión de Tareas - SEMPERTEX',
  description: 'Aplicación para la gestión de tareas del equipo de desarrollo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
