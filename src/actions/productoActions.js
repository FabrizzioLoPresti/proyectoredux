import { 
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import axios from 'axios'

// Crear Nuevos Productos
export const crearNuevoProductoAction = producto => {
  return async (dispatch) => {
    dispatch( agregarProducto() )

    try {
      await clienteAxios.post('/productos', producto)
      dispatch( agregarProductoExito(producto) )
      Swal.fire(
        'Correcto',
        'El producto se agrego correctamente',
        'success'
      )
    } catch (error) {
      console.log( error )
      dispatch( agregarProductoError(true) )
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo'
      })
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
})

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
})


export const obtenerProductosAction = () => {
  return async (dispatch) => {
    dispatch( descargarProductos() )

    try {
      const respuesta = await clienteAxios.get('/productos')
      const { data } = respuesta
      dispatch( descargaProductosExitosa(data) )
    } catch (error) {
      console.log( error )
      dispatch( descargaProductosError() )
    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
})


export const eliminarProductoAction = (id) => {
  return async (dispatch) => {
    dispatch( obtenerProductoEliminar(id) )

    try {
      await clienteAxios.delete(`/productos/${id}`)
      dispatch( eliminarProductoExito() )
      Swal.fire(
        'Eliminado!',
        'Tu producto fue eliminado correctamente.',
        'success'
      )
    } catch (error) {
      console.log( error )
      Swal.fire(
        'Error!',
        'Ocurrio un error inesperado.',
        'warning'
      )
      dispatch( eliminarProductoError() )
    }
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
})


export const obtenerProductoEditar = producto => {
  return (dispatch) => {
    dispatch( obtenerProductoAction(producto) )
  }
}

const obtenerProductoAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})


export const editarProductoAction = producto => {
  return async (dispatch) => {
    dispatch( editarProducto() )

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto)
      dispatch( editarProductoExito(producto) )
    } catch (error) {
      console.log( error )
      dispatch( editarProductoError() )
    }

  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
})