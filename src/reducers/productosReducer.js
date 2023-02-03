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

const initialState = {
  productos: [], // cuando se cargue desde la API el Arreglo de Productos
  error: null, // null porque no existe hasta que lo creemos en caso de que exista un error
  loading: false, // por si la API tarda en descargar los datos, para mostrar Spinner
  productoEliminar: null,
  productoEditar: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload
      }
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: [...state.productos, action.payload]
      }
    case DESCARGA_PRODUCTOS_ERROR:
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload
      }
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload
      }
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
        productoEliminar: null
      }
      case PRODUCTO_ELIMINADO_ERROR:
        return {
          ...state,
          productoEliminar: null,
          error: action.payload
        }
      case OBTENER_PRODUCTO_EDITAR:
        return {
          ...state,
          productoEditar: action.payload
        }
      case COMENZAR_EDICION_PRODUCTO:
        return {
          ...state
        }
      case PRODUCTO_EDITADO_EXITO:
        return {
          ...state,
          productoEditar: null,
          productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto)
        }
      case PRODUCTO_EDITADO_ERROR:
        return {
          ...state,
          productoEditar: null,
          error: action.payload
        }
    default:
      return state
  }
}