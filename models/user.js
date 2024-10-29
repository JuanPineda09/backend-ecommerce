const { DataTypes } = require('sequelize');
const sequelize = require('./configSequelize');
const Roles = require('./roles');

const User = sequelize.define('User', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'idRole',
        },
    },
}, {
    tableName: 'users',
    timestamps: true,
});

// Definir la relación
User.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });

module.exports = User;
