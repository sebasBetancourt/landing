# Arquitectura Waiwa-Modular - Adeptos Landing

Este proyecto utiliza una arquitectura modular basada en la estructura de la plataforma Waiwa, combinando **Atomic Design** para la UI y una separación clara de responsabilidades por módulos.

## Estructura de Directorios (`src/`)

### 1. App (`src/app`)
Utiliza el **App Router** de Next.js. Aquí se definen las rutas, layouts globales y estilos base.
- `auth/`, `dashboard/`, `login/`: Grupos de rutas.
- `globals.css`: Estilos globales.

### 2. Components (`src/components`)
Organizados siguiendo **Atomic Design** y por módulos funcionales.
- **atoms/**: Componentes básicos (botones, inputs, labels).
- **molecules/**: Uniones de átomos (campos de búsqueda, items de lista).
- **organisms/**: Secciones complejas (headers, footers, forms completos).
- **ui/**: Componentes de librería base (ej: shadcn/ui).
- **dashboard/**: Componentes específicos del módulo dashboard.

### 3. Services (`src/services`)
Capa de lógica de negocio y comunicación con el exterior. Contiene las clases o funciones que manejan los datos y la lógica de la aplicación (equivalente a Use Cases).

### 4. Interfaces (`src/interfaces`)
Definición de contratos y modelos de datos (Typescript).
- **Entidades**: Modelos puros del negocio.
- **Repositories**: Definición de interfaces para los servicios.

### 5. Hooks (`src/hooks`)
Lógica de estado reutilizable y conexión entre componentes y servicios.

### 6. Lib (`src/lib`)
Configuraciones de librerías externas (Firebase, Axios, Supabase) y utilidades puras.

### 7. Constants (`src/constants`)
Valores estáticos, configuraciones de entorno y cadenas de texto reutilizables.

### 8. Auth (`src/auth`)
Lógica específica para el manejo de sesiones, tokens y guardias de navegación.

---

## Flujo Sugerido

1. **Definición**: Crear la interfaz en `src/interfaces`.
2. **Lógica**: Implementar el servicio en `src/services`.
3. **UI**: Crear los componentes en `src/components` (atoms -> molecules -> organisms).
4. **Integración**: Usar el componente en una página de `src/app`.

---

## Beneficios
- **Escalabilidad**: Fácil de añadir nuevos módulos funcionales.
- **Reutilización**: Los componentes atómicos se comparten en toda la app.
- **Claridad**: Cada archivo tiene un lugar lógico basado en su función.
