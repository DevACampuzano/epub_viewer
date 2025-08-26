# 📚 Litio

Una aplicación móvil multiplataforma desarrollada en React Native para leer libros en formato EPUB con una interfaz moderna y funcionalidades avanzadas.

## 🚀 Características Principales

- ✅ **Lectura de archivos EPUB**: Soporte completo para el formato EPUB
- ✅ **Interfaz personalizable**: Múltiples temas y configuraciones de lectura
- ✅ **Gestión de biblioteca**: Organiza tus libros con diferentes vistas (grid/lista)
- ✅ **Control de brillo**: Ajuste automático del brillo de pantalla
- ✅ **Navegación avanzada**: Marcadores, progreso de lectura y navegación por capítulos
- ✅ **Búsqueda**: Funcionalidad de búsqueda dentro de los libros
- ✅ **Persistencia**: Guarda el progreso de lectura y configuraciones
- ✅ **Multiplataforma**: Compatible con iOS y Android

## 🏗️ Arquitectura del Proyecto

```
epub_viewer/
├── android/                    # Configuración Android
├── ios/                       # Configuración iOS
├── src/                       # Código fuente principal
│   ├── App.tsx               # Componente raíz
│   ├── common/               # Recursos compartidos
│   │   ├── assets/           # Imágenes y recursos estáticos
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── Button/       # Componente de botón
│   │   │   ├── Text/         # Componente de texto
│   │   │   ├── Toast/        # Notificaciones
│   │   │   └── ...          # Otros componentes UI
│   │   ├── helpers/          # Funciones auxiliares
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── stores/           # Estado global (Zustand)
│   │   │   ├── books/        # Store de libros
│   │   │   └── settings/     # Store de configuraciones
│   │   ├── theme.ts          # Configuración de temas
│   │   └── types/            # Definiciones TypeScript
│   ├── router/               # Navegación de la app
│   └── screen/               # Pantallas principales
│       ├── home/             # Pantallas del home
│       │   ├── book/         # Detalles del libro
│       │   ├── list/         # Lista de libros
│       │   ├── newBook/      # Agregar nuevo libro
│       │   └── read/         # Pantalla de lectura
│       │   └── searchBook/   # Busqueda de libros
│       └── setting/          # Pantalla de configuraciones
├── package.json              # Dependencias y scripts
├── metro.config.js           # Configuración Metro bundler
├── biome.json               # Configuración del linter
└── tsconfig.json            # Configuración TypeScript
```

## 🛠️ Tecnologías Utilizadas

### Core
- **React Native 0.81.0**: Framework principal
- **TypeScript**: Tipado estático
- **React 19.1.0**: Biblioteca UI

### Navegación
- **@react-navigation/native**: Navegación principal
- **@react-navigation/native-stack**: Stack navigation
- **@react-navigation/bottom-tabs**: Tabs navigation

### Estado
- **Zustand**: Gestión de estado global
- **Immer**: Inmutabilidad
- **AsyncStorage**: Persistencia local

### EPUB
- **@epubjs-react-native/core**: Motor de lectura EPUB
- **@epubjs-react-native/file-system**: Sistema de archivos

### UI/UX
- **react-native-reanimated**: Animaciones avanzadas
- **react-native-gesture-handler**: Gestos táctiles
- **reanimated-color-picker**: Selector de colores
- **@react-native-vector-icons/lucide**: Iconografía

### Utilidades
- **@react-native-documents/picker**: Selector de archivos
- **react-native-keep-awake**: Mantener pantalla activa
- **@adrianso/react-native-device-brightness**: Control de brillo
- **react-native-webview**: Vista web integrada

### Desarrollo
- **@biomejs/biome**: Linter y formateador
- **Metro**: Bundler
- **Babel**: Transpilador

## 🚀 Instalación y Configuración

### Prerrequisitos

1. **Node.js** >= 18
2. **Bun** (recomendado) o npm/yarn
3. **React Native CLI**
4. **Android Studio** (para desarrollo Android)
5. **Xcode** (para desarrollo iOS - solo macOS)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/DevACampuzano/epub_viewer.git
cd epub_viewer
```

2. **Instalar dependencias**
```bash
bun install
```

3. **Configurar iOS** (solo macOS)
```bash
cd ios
pod install
cd ..
```

4. **Configurar Android**
   - Abrir Android Studio
   - Configurar SDK y emulador
   - Crear `android/local.properties` con la ruta del SDK

### 🏃‍♂️ Cómo Ejecutar

#### Desarrollo

```bash
# Iniciar Metro bundler
bun start

# En otra terminal:
# Para Android
bun android

# Para iOS (solo macOS)
bun ios
```

#### Producción

```bash
# Generar APK Android
bun run android:apk
```

#### Scripts Disponibles

```bash
bun start          # Iniciar Metro bundler
bun android        # Ejecutar en Android
bun ios           # Ejecutar en iOS
bun lint          # Verificar código con Biome
bun format        # Formatear código
bun check         # Verificar y formatear código
```

## 📱 Funcionalidades Detalladas

### Gestión de Libros
- **Importar**: Selecciona archivos EPUB desde el dispositivo
- **Biblioteca**: Visualiza libros en formato grid o lista
- **Ordenamiento**: Por título, autor, progreso, última lectura, etc.
- **Búsqueda**: Filtra libros por título

### Experiencia de Lectura
- **Navegación**: Desliza entre páginas o usa controles
- **Configuración**: Ajusta tamaño de fuente, espaciado, márgenes
- **Temas**: Múltiples temas de color (claro, oscuro, sepia)
- **Brillo**: Control automático del brillo de pantalla
- **Progreso**: Barra de progreso y estadísticas de lectura

### Personalización
- **Temas**: Sistema de temas personalizables
- **Colores**: Selector de colores para fondos y texto
- **Layout**: Configuración de márgenes y espaciado

## 🗺️ Roadmap

### 🎯 Versión 1.0 (Actual)
- [x] Lectura básica de EPUB
- [x] Gestión de biblioteca
- [x] Temas básicos
- [x] Navegación por capítulos
- [x] Persistencia de progreso
- [x] Reseñas y calificaciones
- [x] Agregar marcadores en páginas específicas
- [x] Sistema de notas y resaltados
- [x] Exportar notas
- [x] Navegación por resultados
- [x] Búsqueda de texto dentro del libro

### 🔮 Versión 1.1 (Próxima)

- [ ] **Búsqueda avanzada**
  - Historial de búsquedas
- [ ] **Sincronización**
  - Backup en la nube
  - Sincronización entre dispositivos
  - Import/export de biblioteca

### 🚀 Versión 1.2 (Futuro)
- [ ] **Funciones sociales**
  - Compartir progreso de lectura
  - Recomendaciones
- [ ] **Estadísticas avanzadas**
  - Tiempo de lectura diario/semanal
  - Páginas leídas por sesión
- [ ] **Accesibilidad**
  - Soporte para lectores de pantalla
  - Alto contraste
  - Navegación por voz
  - Múltiples opciones de fuente

### 🌟 Versión 2.0 (Visión)
- [ ] **IA integrada**
  - Resúmenes automáticos
  - Recomendaciones inteligentes
  - Análisis de contenido

### 🔧 Mejoras Técnicas Continuas
- [ ] **Performance**
  - Optimización de renderizado
  - Lazy loading mejorado
  - Reducción del tamaño de la app
- [ ] **Testing**
  - Tests unitarios completos
  - Tests de integración
  - Tests E2E
- [ ] **CI/CD**
  - Automatización de builds
  - Deploy automático
  - Testing automatizado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usa **TypeScript** para todo el código
- Sigue las configuraciones de **Biome** para linting y formatting
- Usa **convenciones de nombres** consistentes
- Documenta funciones complejas
- Escribe tests para nuevas funcionalidades

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**DevACampuzano** - [GitHub](https://github.com/DevACampuzano)

---

## 🐛 Reporte de Bugs

Si encuentras algún bug, por favor:

1. Verifica que no esté ya reportado en [Issues](https://github.com/DevACampuzano/epub_viewer/issues)
2. Crea un nuevo issue con:
   - Descripción detallada del problema
   - Pasos para reproducir
   - Screenshots si es aplicable
   - Información del dispositivo y OS

## 💡 Solicitar Features

Para solicitar nuevas funcionalidades:

1. Verifica el roadmap actual
2. Crea un issue con la etiqueta "enhancement"
3. Describe detalladamente la funcionalidad deseada
4. Explica por qué sería útil para otros usuarios

## 📚 Recursos Adicionales

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [EPUB.js Documentation](https://github.com/futurepress/epub.js)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Navigation](https://reactnavigation.org/)

---

*¡Gracias por usar EPUB Viewer! 📖✨*