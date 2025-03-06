# Documentación General del Frontend - Hunters Campus

## Descripción General
El frontend de **Hunters Campus** está desarrollado en **Vue.js** y proporciona la interfaz de usuario para gestionar desafíos, torneos y tribus. Utiliza Vue Router para la navegación, Vuex para el manejo del estado global e i18n para la internacionalización.

---

## Estructura del Proyecto

```
hunters-campus-front/
  |-- .env               # Variables de entorno
  |-- babel.config.js    # Configuración de Babel
  |-- package.json       # Dependencias y scripts
  |-- vue.config.js      # Configuración de Vue CLI
  |-- public/
  |   |-- index.html     # Archivo HTML base
  |-- src/
      |-- main.js        # Archivo principal de Vue
      |-- App.vue        # Componente raíz
      |-- assets/        # Recursos estáticos (imagenes, fuentes, estilos)
      |-- components/    # Componentes reutilizables
      |-- layouts/       # Diseños de páginas
      |-- middleware/    # Middleware para autenticación y localización
      |-- mixins/        # Funcionalidades reutilizables
      |-- pages/         # Páginas principales del sistema
      |-- plugins/       # Configuración de plugins externos
      |-- router/        # Configuración de rutas
      |-- services/      # Comunicación con la API
      |-- store/         # Manejo del estado global con Vuex
```

---

## Configuración y Dependencias
El proyecto usa las siguientes dependencias clave:

- **Vue.js 2.6.11** → Framework principal
- **Vue Router** → Manejo de rutas
- **Vuex** → Gestión de estado global
- **Axios** → Consumo de API REST
- **Vee-validate** → Validación de formularios
- **Vue i18n** → Soporte de idiomas
- **Element UI** → Componentes visuales
- **Moment.js** → Manejo de fechas
- **Lodash** → Utilidades para manipulación de datos

---

## Configuración de Rutas
Las rutas están definidas en `src/router/index.js` y se organizan por módulos:

```javascript
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/Home.vue') },
      { path: '/admin', name: 'admin', component: () => import('@/pages/admin/index.vue') },
      { path: '/tribus', name: 'tribus', component: () => import('@/pages/tribu/index.vue') }
    ]
  },
  { path: '*', component: () => import('@/pages/error.vue') }
]
```

Las rutas están protegidas con middleware para validar la autenticación.

---

## Manejo de Estado con Vuex
El estado global está definido en `src/store/index.js` y se divide en módulos:

- **auth.js** → Manejo de autenticación y sesión de usuario
- **lang.js** → Control de idiomas
- **test.js** → Módulo de prueba

Ejemplo de una mutación en Vuex:

```javascript
mutations: {
  setUser(state, user) {
    state.user = user;
  }
}
```

---

## Consumo de la API
El sistema se comunica con el backend mediante **Axios**. Los servicios están en `src/services/` y están organizados por funcionalidad:

Ejemplo de servicio de autenticación (`src/services/auth/auth.js`):

```javascript
import axios from '@/library/axios';

export function login(data) {
  return axios.post('/api/auth/login', data);
}
```

---

## Estilos y Temas
Los estilos están en `src/assets/sass/` y se dividen en:

- **abstracts/** → Mixins y variables globales
- **base/** → Tipografía y estilos generales
- **components/** → Estilos de componentes reutilizables
- **personalizados/** → Estilos específicos del proyecto
- **theme/** → Configuración de colores

Ejemplo de uso de variables SCSS:

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
```

---

## Internacionalización (i18n)
El soporte de idiomas está en `src/lang/`, con archivos JSON para cada idioma:

Ejemplo (`src/lang/es.json`):

```json
{
  "welcome": "Bienvenido a Hunters Campus",
  "logout": "Cerrar sesión"
}
```

Implementación en un componente:

```vue
<p>{{ $t('welcome') }}</p>
```

---

## Seguridad y Middleware
Se utilizan middlewares en `src/middleware/` para validar autenticación y configuración de idioma.

Ejemplo de middleware de autenticación (`check-auth.js`):

```javascript
export default function(to, from, next) {
  const loggedIn = localStorage.getItem('token');
  if (!loggedIn && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
}
```

---

## Conclusión
El frontend de **Hunters Campus** es modular y escalable, basado en **Vue.js**, con un manejo eficiente de estado mediante **Vuex**, una API bien estructurada con **Axios**, y un diseño flexible gracias a **SCSS** y **Element UI**. Su arquitectura facilita el mantenimiento y la evolución del proyecto. 

