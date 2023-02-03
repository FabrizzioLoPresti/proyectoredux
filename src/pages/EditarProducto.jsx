import { useState, useEffect} from "react"
import { Form, useActionData, redirect, useNavigate  } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Formulario from "../components/Formulario"
import { editarProductoAction } from "../actions/productoActions"
import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions"

const EditarProducto = () => {

  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0
  })
  const productoEditar =  useSelector(state => state.productos.productoEditar)
  const navigate = useNavigate()
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)
  const dispatch = useDispatch()

  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])
  
  useEffect(() => {
    dispatch( ocultarAlertaAction() )
  }, [])

  const editarProducto = producto => dispatch( editarProductoAction(producto) )
  const submitEditarProducto = (e) => {
    e.preventDefault()

    if(Object.values(producto).includes('') || producto.precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      return dispatch( mostrarAlertaAction(alerta) )
    }

    dispatch( ocultarAlertaAction() )
    editarProducto(producto)
    navigate('/')
  }

  const handleChangeProducto = (e, valor) => {
    setProducto({
      ...producto,
      [e.target.name]: valor
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Editar Producto</h2>
            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}
            <form
              onSubmit={submitEditarProducto}
              // method="POST"
            >
              {/* <Formulario /> Mover toda Logica a Formulario en caso de ser similar */}
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input 
                  type="text" 
                  name="nombre" 
                  id="nombre"
                  placeholder="Ingrese nombre del producto"
                  className="form-control"
                  value={producto.nombre}
                  onChange={e => handleChangeProducto(e, e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input 
                  type="number" 
                  name="precio" 
                  id="precio"
                  placeholder="Ingrese precio del producto"
                  className="form-control"
                  value={producto.precio}
                  onChange={e => handleChangeProducto(e, Number(e.target.value))}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"  
              >
                Agregar
              </button>
            </form>
            {cargando && <p>Cargando...</p>}
            {error && <p className="alert alert-danger text-center mt-4 p2">Hubo un error</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto