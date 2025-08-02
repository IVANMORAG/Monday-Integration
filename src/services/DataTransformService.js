const config = require('../config');
const UserData = require('../models/UserData');

class DataTransformService {
  static transform(webhookData) {
    const transformedData = {
      API: webhookData.API,
      Edad: config.user.age,
      Fecha: new Date().toISOString(),
      Nombre: config.user.name,
      Teléfono: config.user.phone,
      'Correo Electrónico': config.user.email,
      GitHub: config.github.repoUrl
    };

    return new UserData(transformedData);
  }

  static mapToColumns(userData, columns) {
    const columnValues = {};
    const userObj = userData.toObject();

    columns.forEach(column => {
      const value = this.getColumnValue(column, userObj);
      if (value !== null) {
        columnValues[column.id] = value;
      }
    });

    return columnValues;
  }

  static getColumnValue(column, userData) {
    const title = column.title.toLowerCase();
    const type = column.type;

    // Nombre
    if (title.includes('name') || title.includes('nombre')) {
      return type === 'text' ? userData.Nombre : null;
    }

    // Edad
    if (title.includes('age') || title.includes('edad')) {
      return type === 'numbers' ? userData.Edad : null;
    }

    // Teléfono
    if (title.includes('phone') || title.includes('teléfono')) {
      if (type === 'phone') {
        return { phone: userData.Teléfono, countryShortName: "MX" };
      }
      return type === 'text' ? userData.Teléfono : null;
    }

    // Email
    if (title.includes('email') || title.includes('correo')) {
      if (type === 'email') {
        return { email: userData['Correo Electrónico'], text: userData['Correo Electrónico'] };
      }
      return type === 'text' ? userData['Correo Electrónico'] : null;
    }

    // GitHub
    if (title.includes('github') || title.includes('repo')) {
      if (type === 'link') {
        return { url: userData.GitHub, text: "GitHub Repository" };
      }
      return type === 'text' ? userData.GitHub : null;
    }

    // Fecha
    if (title.includes('date') || title.includes('fecha')) {
      if (type === 'date') {
        return { date: userData.Fecha.split('T')[0] };
      }
    }

    return null;
  }
}

module.exports = DataTransformService;