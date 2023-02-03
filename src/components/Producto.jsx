import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { eliminarProductoAction, obtenerProductoEditar } from '../actions/productoActions'

const Producto = ({producto}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate() // Habilitar history para redireccion
  const { nombre, precio, id } = producto

  const handleEliminar = () => {
    // if(!confirm('Seguro desea eliminar producto?')) return
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminarlo.'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( eliminarProductoAction(id) )
      }
    })
  }

  // Funcion que redirige de Forma Programada
  const redireccionarEdicion = () => {
    dispatch( obtenerProductoEditar(producto) )
    navigate(`/productos/editar/${id}`)
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">${precio}</span></td>
      <td className="acciones">
        <button type='button' className='btn btn-primary mr-2' onClick={redireccionarEdicion}>
          Editar
        </button>
        <button type='button' className='btn btn-danger' onClick={handleEliminar}>
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Producto