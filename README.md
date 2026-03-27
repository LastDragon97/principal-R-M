🌌 Rick & Morty - Microfrontends Architecture
Este proyecto implementa una arquitectura de Microfrontends (MFE) utilizando Rsbuild, Rspack y Module Federation. Consume la API de Rick & Morty para visualizar y filtrar personajes.

🏗️ Estructura del Proyecto
Shell(Puerto 3001): Aplicación principal que orquesta y consume los remotos.

Characters Remote (Puerto 3004): Microfrontend encargado de la lógica y galería de personajes.

Shared Logic: Capas separadas (API, Hooks, Types) para máxima mantenibilidad.

🚀 Guía de Inicio Rápido (Local)

1. Requisitos previos
Node.js v20+

JDK 21 (Entorno de desarrollo Java)

Podman / Docker con soporte para Compose.

2. Instalación
Entra en cada carpeta (host y remote-characters) y ejecuta:

Bash
npm install --legacy-peer-deps
3. Ejecución en modo desarrollo
En la carpeta del Remote:

Bash
npm run dev # http://localhost:3004
En la carpeta del Host:

Bash
npm run dev # http://localhost:3000
🧪 Testing
Usamos Vitest y React Testing Library para asegurar que la lógica de los Hooks y la API sea sólida.

Ejecutar pruebas:

Bash
npm run test
🐳 Despliegue con Docker / Podman (Bazzite en micaso :v)
Construcción y Levanto
Desde la raíz del proyecto:

Bash
podman-compose up --build
Detener y Limpiar
Bash
podman-compose down
🛠️ Troubleshooting (Solución de Problemas Comunes)
1. Error: Uncaught SyntaxError: Unexpected token '<'
Causa: El Host intenta cargar el remoteEntry.js pero recibe un HTML (error 404).

Solución: Verifica que el puerto del Remote (3004) sea el correcto y que el contenedor esté corriendo. Revisa que el assetPrefix en rsbuild.config.ts apunte a la URL del microfront.

2. Error: ChunkLoadError: Loading chunk XXX failed
Causa: El navegador busca los archivos internos del Remote en la URL del Host (puerto 3000).

Solución: Configura output.assetPrefix: 'http://localhost:3004/' en el Remote para forzar la ruta correcta.

3. Error: Port 3004 is in use, using 3005
Causa: Un proceso zombie o un contenedor previo no se cerró bien.

Solución: Ejecuta sudo fuser -k 3004/tcp en Linux para liberar el puerto manualmente antes de iniciar.

🛠️ Stack Tecnológico
React 19 / TypeScript

Rsbuild (Rspack) / Module Federation v2

Vitest / JSDOM

Podman / Nginx
