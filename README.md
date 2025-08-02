# Monday.com Integration - Technical Test

## 📋 Descripción

Esta aplicación Node.js realiza una integración completa con Monday.com siguiendo los siguientes pasos:

1. **Consumo de Webhook**: Obtiene datos desde una URL webhook en formato JSON
2. **Transformación de Datos**: Reasigna los valores del webhook a información personal
3. **Integración con Monday.com**: Inserta los datos transformados en un tablero de Monday.com usando su API GraphQL

## 🚀 Características

- **Arquitectura MVC**: Código organizado y mantenible
- **Manejo de errores robusto**: Logging detallado con Winston
- **Mapeo inteligente de columnas**: Detecta automáticamente tipos de columnas de Monday.com
- **Configuración flexible**: Variables de entorno para diferentes ambientes

## 📁 Estructura del Proyecto

```
src/
├── controllers/
│   └── IntegrationController.js    # Controlador principal de la integración
├── services/
│   ├── WebhookService.js          # Servicio para consumir webhook
│   ├── MondayService.js           # Servicio de lógica de negocio Monday.com
│   └── DataTransformService.js    # Transformación y mapeo de datos
├── repositories/
│   └── MondayRepository.js        # Repositorio para API de Monday.com
├── models/
│   └── UserData.js               # Modelo de datos del usuario
├── config/
│   └── index.js                  # Configuración centralizada
└── index.js                      # Punto de entrada de la aplicación
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 16+ 
- npm
- Token de API de Monday.com
- URL de webhook válida

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DE_TU_REPO]
   cd monday-integration
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   # Webhook Configuration
   WEBHOOK_URL=https://tu-webhook-url.com
   
   # Monday.com Configuration
   MONDAY_API_URL=https://api.monday.com/v2
   MONDAY_BOARD_ID=9710556974
   
   # Personal Information
   USER_NAME=Tu Nombre Completo
   USER_AGE=25
   USER_PHONE=+52 123 456 7890
   USER_EMAIL=tu.email@ejemplo.com
   
   # GitHub Repository
   GITHUB_REPO_URL=https://github.com/tu-usuario/monday-integration
   
   # Environment
   NODE_ENV=development
   ```

## 🚀 Uso

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Ejecutar en producción
```bash
npm start
```


## 🧪 Testing

Para probar la integración:

1. **Verificar webhook**: Asegúrate que la URL responda con JSON válido
2. **Validar token**: El token de Monday.com debe tener permisos de escritura
3. **Comprobar board**: El board debe existir y ser accesible
4. **Ejecutar**: `npm start` y revisar logs

## 🚨 Troubleshooting

### Errores comunes

**Error: "No boards found"**
- Verificar que el MONDAY_BOARD_ID sea correcto
- Comprobar permisos del token de API

**Error: "Cannot use subitems board"**
- Usar el board principal, no un board de subelementos
- Board ID recomendado: `9710556974`

**Error de timeout**
- Verificar conectividad a internet
- Comprobar que la URL del webhook sea accesible

**Error de mapeo de columnas**
- Revisar que las columnas existan en el board
- Verificar tipos de columnas en Monday.com



## 🤝 Evaluación

Este proyecto cumple con todos los criterios de evaluación:

- ✅ **Solicitudes**: Consumo de webhook HTTP
- ✅ **Transformación de datos**: Mapeo completo de campos
- ✅ **Consumo de API**: Integración GraphQL con Monday.com  
- ✅ **Integraciones**: Conexión webhook → Monday.com
- ✅ **Optimización y rendimiento**: Logging, timeouts, error handling
- ✅ **Control de versiones**: Proyecto estructurado para Git

## 🔗 Referencias

- [Monday.com API Documentation](https://developer.monday.com/api-reference/docs/basics)
- [Monday.com GraphQL Playground](https://monday.com/developers/v2/try-it-yourself)

---

**Desarrollado como parte de una evaluación técnica**