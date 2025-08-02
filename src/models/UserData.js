class UserData {
  constructor(data) {
    this.API = data.API;
    this.Edad = data.Edad;
    this.Fecha = data.Fecha;
    this.Nombre = data.Nombre;
    this.Teléfono = data.Teléfono;
    this['Correo Electrónico'] = data['Correo Electrónico'];
    this.GitHub = data.GitHub;
  }

  getDisplayName() {
    return `Technical Test - ${this.Nombre}`;
  }

  toObject() {
    return {
      API: this.API,
      Edad: this.Edad,
      Fecha: this.Fecha,
      Nombre: this.Nombre,
      Teléfono: this.Teléfono,
      'Correo Electrónico': this['Correo Electrónico'],
      GitHub: this.GitHub
    };
  }
}

module.exports = UserData;