import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Productos from './pages/Productos'
import NuevoProducto, { action as nuevoProductoAction } from './pages/NuevoProducto'
import EditarProducto from './pages/EditarProducto'
import { Provider } from 'react-redux'
import store from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Productos />
      },
      {
        path: '/productos/nuevo',
        element: <NuevoProducto />,
        action: nuevoProductoAction
      },
      {
        path: '/productos/editar/:id',
        element: <EditarProducto />
      },
    ]
  }
])

function App() {

  return (
    <Provider
      store={store}
    >
      <RouterProvider 
        router={router}
      />
    </Provider>
  )
}

export default App
