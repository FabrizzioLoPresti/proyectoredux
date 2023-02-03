import { useState } from "react"

const Formulario = () => {

  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0
  })

  const handleChangeProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <>
      <div className="form-group">
        <label htmlFor="nombre">Nombre Producto</label>
        <input 
          type="text" 
          name="nombre" 
          id="nombre"
          placeholder="Ingrese nombre del producto"
          className="form-control"
          value={producto.nombre}
          onChange={handleChangeProducto}
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
          onChange={handleChangeProducto}
        />
      </div>
    </>
  )
}

export default Formulario