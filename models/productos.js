const { DataTypes } = require('sequelize');
const sequelize = require('./configSequelize');
const Categorias = require('./roles');

const Productos = sequelize.define('Productos', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen:{
        type: DataTypes.BLOB,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categorias',
            key: 'idCategoria',
        },
    },
}, {
    tableName: 'productos',
});

// Definir la relación
Productos.belongsTo(Categorias, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = Productos;
