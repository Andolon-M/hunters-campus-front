/* eslint-disable no-console */

/* eslint-disable no-console */
import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register('/service-worker.js', {  // 🔄 URL directa sin process.env.BASE_URL
    ready() {
      console.log(
        'La aplicación está siendo servida desde la caché por un Service Worker.'
      );
    },
    registered() {
      console.log('El Service Worker ha sido registrado.');
    },
    cached() {
      console.log('El contenido ha sido cacheado para uso offline.');
    },
    updatefound() {
      console.log('Se está descargando nuevo contenido.');
    },
    updated() {
      console.log('Nuevo contenido disponible. Recargando página...');
      window.location.reload();  // 🔄 Fuerza la recarga cuando haya nueva versión
    },
    offline() {
      console.log('Sin conexión a internet. La aplicación se ejecuta en modo offline.');
    },
    error(error) {
      console.error('Error durante el registro del Service Worker:', error);
    }
  });
}
