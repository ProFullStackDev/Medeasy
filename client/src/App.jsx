import React from 'react'
import MainApp from './MainApp'
import AdminApp from './AdminApp'

const App = () => {
  return (
    <div className="App">
      { window.location.pathname.match(/\/admin/g) ? <AdminApp/> : <MainApp /> }
    </div>
  )
}

export default App;
