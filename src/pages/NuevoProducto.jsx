import { useState, useEffect } from "react"
import { Form, useActionData, redirect, useNavigate  } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Formulario from "../components/Formulario"
import { crearNuevoProductoAction } from "../actions/productoActions"
import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)

  const errores = []
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  if(Object.keys(errores).length) {
    return errores
  }

  // agregarProducto(datos)
  console.log( datos )
  return redirect('/')
}

const NuevoProducto = () => {

  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0
  })
  const navigate = useNavigate()
  const errores = useActionData()
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( ocultarAlertaAction() )
  }, [])
  
  const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )
  const submitNuevoProducto = (e) => {
    e.preventDefault()

    if(Object.values(producto).includes('') || producto.precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      return dispatch( mostrarAlertaAction(alerta) )
    } 

    dispatch( ocultarAlertaAction() )
    agregarProducto(producto)
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
            <h2 className="text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>
            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}
            {errores?.length && errores.map((error, i) => 
              `${error}`
            )}
            <form
              onSubmit={submitNuevoProducto}
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

export default NuevoProducto