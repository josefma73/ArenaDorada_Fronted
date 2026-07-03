// src/App.jsx
import AppRoutes from './core/routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* No agregamos Header ni Footer aquí para que no salgan en el Login */}
      <AppRoutes />
    </div>
  );
}

export default App;