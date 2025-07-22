'use client';

import Image from 'next/image';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    console.log('Intentando login con:', email);
    
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ Login exitoso');
        
        // Redirigir según rol
        if (data.user.rol === 'administrador') {
          window.location.href = '/admin';
        } else if (data.user.rol === 'tecnico') {
          window.location.href = '/tecnico';
        } else {
          window.location.href = '/general';
        }
      } else {
        alert('Error: ' + (data.error || 'Login fallido'));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error de conexión');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Logo - SECCIÓN MODIFICADA */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Image
              src="/onservis-logo.jpg"
              alt="OneServis Logo"
              width={280}
              height={180}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <p className="text-gray-600 uppercase tracking-widest text-md">SISTEMA DE GESTIÓN</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="admin@oneservis.cl"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white placeholder-gray-400"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue="password123"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white placeholder-gray-400"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            admin@oneservis.cl / password123
          </p>
        </div>
      </div>
    </div>
  );
}