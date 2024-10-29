const { DataTypes } = require('sequelize');
const sequelize = require('./configSequelize');

const Roles = sequelize.define('Roles', {
    idRole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Roles;
