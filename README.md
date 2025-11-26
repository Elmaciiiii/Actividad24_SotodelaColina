# 🔐 Actividad 24 -- Simulador de Conexión de Wallet Web3

Este proyecto desarrolla una **simulación de conexión con MetaMask** integrada en una aplicación web existente. El objetivo fue implementar el flujo completo de conexión Web3 sin realizar transacciones reales en blockchain, permitiendo experimentar la interacción típica de una DApp.

------------------------------------------------------------------------

## 🌐 Integración Web3

El proyecto integra funcionalidad Web3 en un generador de informes PDF ya existente, agregando capacidades de conexión con wallets digitales de forma simulada pero realista.

------------------------------------------------------------------------

## 🔘 Botón de Conexión

Se incorporó un botón **"Conectar Wallet"** en la parte superior de la interfaz que inicia el proceso de conexión. El diseño mantiene coherencia visual con el resto de la aplicación.

------------------------------------------------------------------------

## 💬 Modal de Selección

Al hacer clic en el botón, se despliega una **ventana emergente (modal)** que replica el flujo real de Web3, permitiendo al usuario seleccionar MetaMask como proveedor de billetera digital.

------------------------------------------------------------------------

## 🎲 Generación de Dirección Simulada

El sistema genera automáticamente una **dirección Ethereum ficticia** con el formato correcto:
- Prefijo estándar: `0x`
- 40 caracteres hexadecimales aleatorios
- Ejemplo: `0xA12F3C4D5E6F7890ABCDEF1234567890ABCD34B8`

------------------------------------------------------------------------

## ✅ Confirmación Visual

Después de la selección, el sistema muestra un mensaje de **"Wallet conectada"** junto con la dirección generada en formato abreviado (`0xA12F...34B8`), confirmando que la lógica de conexión se ejecutó correctamente.

------------------------------------------------------------------------

## 🛡️ Características de Seguridad Educativa

El proyecto es **100% simulado**:
- No requiere MetaMask instalado
- No realiza transacciones reales
- No interactúa con ninguna blockchain
- Todas las operaciones son locales

Esto permite aprender el flujo sin riesgos ni costos de gas.

------------------------------------------------------------------------

## 🚀 Cómo Abrir y Probar el Proyecto

1. **Descargar el proyecto desde GitHub:**
   - Ir al repositorio: https://github.com/Elmaciiiii/Actividad24_SotodelaColina.git
   - Guardar el archivo en tu PC

2. **Extraer la carpeta:**
   - Hacer clic derecho en el ZIP
   - Seleccionar **"Extraer aquí"** o **"Extraer en..."**

3. **Abrir el proyecto:**
   - Abrir el archivo `index.html` en cualquier navegador moderno
   - No requiere servidor local ni instalación adicional

4. **Probar la funcionalidad:**
   - Hacer clic en **"Conectar Wallet"**
   - Seleccionar **MetaMask** en el modal
   - Observar la dirección generada
   - Ver el mensaje de confirmación

------------------------------------------------------------------------

Este proyecto demuestra cómo implementar interfaces Web3 y simular la conexión con wallets digitales, conceptos fundamentales para el desarrollo de aplicaciones descentralizadas (DApps).
