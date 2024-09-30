// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido a la Gestión de Tareas de SEMPERTEX</h1>
      <p>Esta aplicación te ayudará a organizar y priorizar las tareas del equipo de desarrollo.</p>
      <Link href="/tasks">
        <button style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </Link>
    </main>
  );
}
