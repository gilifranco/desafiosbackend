const axios = require('axios').default;

const url = 'http://localhost:8080/api'

const getProductos = () => {
    axios.get(`${url}/productos`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 

const getCrearProducto = () => {
    axios.get(`${url}/crearproducto`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 

const postCrearProducto = (nombre, precio) => {
    axios.post(`${url}/crearproducto`, {
        nombre,
        precio
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 

const getActualizarProducto = (id) => {
    axios.get(`${url}/actualizarproducto`, {
        params:{
            id
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 

const postActualizarProducto = (id, nombre, precio) => {
    axios.post(`${url}/actualizarproducto`, {
        params:{
            id
        }
    }, {
        nombre,
        precio
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 

const deleteProducto = (id) => {
    axios.delete(`${url}/eliminarproducto`, {
        params:{
            id
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
} 


module.exports = { getProductos, getCrearProducto, postCrearProducto, getActualizarProducto, postActualizarProducto, deleteProducto }