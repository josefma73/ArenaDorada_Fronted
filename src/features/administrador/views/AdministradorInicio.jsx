import { useState } from 'react';
import {
  FaBed,
  FaClock,
  FaDollarSign,
  FaWrench,
  FaCheckCircle,
  FaTimes,
  FaChevronRight,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from './../../administrador/components/AdminHeader';
import '../styles/AdministradorInicio.css';

export default function AdministradorInicio() {
  // Mock Data
  const kpiData = {
    ocupacion: { actual: 18, total: 24 },
    reservasHoy: 5,
    cajaSimulada: 1450.00,
    mantenimiento: 2,
  };

  const checkInsData = [
    {
      id: 1,
      habitacion: 101,
      cliente: 'Juan Pérez García',
      modalidad: 'Doble',
      hora: '14:30',
      estado: 'pendiente',
      pago: 'S/. 65.00',
    },
    {
      id: 2,
      habitacion: 205,
      cliente: 'María López Ruiz',
      modalidad: 'Triple',
      hora: '15:00',
      estado: 'confirmado',
      pago: 'S/. 95.00',
    },
    {
      id: 3,
      habitacion: 312,
      cliente: 'Carlos Sánchez Toro',
      modalidad: 'Matrimonial',
      hora: '16:15',
      estado: 'pendiente',
      pago: 'S/. 110.00',
    },
    {
      id: 4,
      habitacion: 418,
      cliente: 'Ana Martínez Cruz',
      modalidad: 'Simple',
      hora: '17:00',
      estado: 'confirmado',
      pago: 'S/. 45.00',
    },
    {
      id: 5,
      habitacion: 510,
      cliente: 'Roberto Díaz Flores',
      modalidad: 'Doble',
      hora: '17:45',
      estado: 'pendiente',
      pago: 'S/. 75.00',
    },
  ];

  const graficoOcupacion = [
    { name: 'Disponibles', value: 6, fill: '#C5A059' },
    { name: 'Ocupadas', value: 18, fill: '#263238' },
  ];

  const graficoIngresos = [
    { dia: 'Lun', ingresos: 1200 },
    { dia: 'Mar', ingresos: 1500 },
    { dia: 'Mié', ingresos: 1100 },
    { dia: 'Jue', ingresos: 1800 },
    { dia: 'Vie', ingresos: 2000 },
    { dia: 'Sáb', ingresos: 2500 },
    { dia: 'Dom', ingresos: 1450 },
  ];

  const alertasInventario = [
    { producto: 'Cerveza Cristal 355ml', stock: 3, categoria: 'Licores' },
    { producto: 'Pan Integral', stock: 2, categoria: 'Panadería' },
    { producto: 'Jugo Natural Naranja', stock: 5, categoria: 'Bebidas' },
  ];

  const habitacionesMantenimiento = [
    { numero: 104, duracion: '4 horas', responsable: 'Carlos López' },
    { numero: 308, duracion: '2.5 horas', responsable: 'Rosa García' },
  ];

  return (
    <div className="admin-inicio-container">
      <AdminSidebar />
      <AdminHeader title="Inicio" />

      <main className="admin-inicio-workspace">
        {/* KPI Cards Row */}
        <section className="admin-kpi-section">
          <div className="admin-kpi-card ocupacion-card">
            <div className="admin-kpi-header">
              <FaBed className="admin-kpi-icon" />
              <h3>Ocupación Actual</h3>
            </div>
            <div className="admin-kpi-content">
              <div className="admin-kpi-value">{kpiData.ocupacion.actual}</div>
              <div className="admin-kpi-total">de {kpiData.ocupacion.total} habitaciones</div>
              <div className="admin-kpi-percentage">
                {Math.round((kpiData.ocupacion.actual / kpiData.ocupacion.total) * 100)}%
              </div>
              <div className="admin-progress-bar">
                <div
                  className="admin-progress-fill"
                  style={{
                    width: `${(kpiData.ocupacion.actual / kpiData.ocupacion.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="admin-kpi-card reservas-card">
            <div className="admin-kpi-header">
              <FaClock className="admin-kpi-icon" />
              <h3>Reservas Hoy</h3>
            </div>
            <div className="admin-kpi-content">
              <div className="admin-kpi-value">{kpiData.reservasHoy}</div>
              <div className="admin-kpi-total">Check-ins pendientes</div>
              <button className="admin-kpi-action">Ver detalles</button>
            </div>
          </div>

          <div className="admin-kpi-card caja-card">
            <div className="admin-kpi-header">
              <FaDollarSign className="admin-kpi-icon" />
              <h3>Caja Diaria</h3>
            </div>
            <div className="admin-kpi-content">
              <div className="admin-kpi-value">S/. {kpiData.cajaSimulada.toFixed(2)}</div>
              <div className="admin-kpi-total">Ingresos registrados</div>
              <span className="admin-kpi-trend">↑ 12.5% vs ayer</span>
            </div>
          </div>

          <div className="admin-kpi-card mantenimiento-card">
            <div className="admin-kpi-header">
              <FaWrench className="admin-kpi-icon" />
              <h3>En Mantenimiento</h3>
            </div>
            <div className="admin-kpi-content">
              <div className="admin-kpi-value">{kpiData.mantenimiento}</div>
              <div className="admin-kpi-total">Habitaciones en limpieza</div>
              <button className="admin-kpi-action">Gestionar</button>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="admin-charts-section">
          <div className="admin-chart-container">
            <h2 className="admin-section-title">Ingresos de la Semana</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graficoIngresos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="dia" stroke="#757575" />
                <YAxis stroke="#757575" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F9F6F0',
                    border: '2px solid #C5A059',
                    borderRadius: '0.6rem',
                  }}
                  formatter={(value) => `S/. ${value}`}
                />
                <Bar dataKey="ingresos" fill="#C5A059" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="admin-chart-container">
            <h2 className="admin-section-title">Tasa de Ocupación</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={graficoOcupacion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {graficoOcupacion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value} habitaciones`}
                  contentStyle={{
                    backgroundColor: '#F9F6F0',
                    border: '2px solid #C5A059',
                    borderRadius: '0.6rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Check-ins Table */}
        <section className="admin-checkins-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">Próximos Check-Ins / Check-Outs</h2>
            <button className="admin-section-action">Ver Calendario</button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-checkins-table">
              <thead>
                <tr>
                  <th>Habitación</th>
                  <th>Cliente</th>
                  <th>Modalidad</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {checkInsData.map((checkin) => (
                  <tr key={checkin.id} className={`estado-${checkin.estado}`}>
                    <td className="admin-table-habitacion">
                      <strong>#{checkin.habitacion}</strong>
                    </td>
                    <td>{checkin.cliente}</td>
                    <td>{checkin.modalidad}</td>
                    <td className="admin-table-hora">
                      <FaClock size={14} /> {checkin.hora}
                    </td>
                    <td>
                      <span className={`admin-badge-estado ${checkin.estado}`}>
                        {checkin.estado === 'confirmado' ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )}
                        {checkin.estado === 'confirmado' ? 'Confirmado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="admin-table-monto">{checkin.pago}</td>
                    <td className="admin-table-acciones">
                      <button className="admin-action-btn">
                        {checkin.estado === 'confirmado' ? 'Check-Out' : 'Check-In'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="admin-alerts-section">
          <div className="admin-alerts-row">
            <div className="admin-alert-container">
              <h3 className="admin-alert-title">Alertas de Inventario</h3>
              <ul className="admin-alert-list">
                {alertasInventario.map((alerta, idx) => (
                  <li key={idx} className="admin-alert-item">
                    <div className="admin-alert-left">
                      <span className="admin-alert-badge">{alerta.stock}</span>
                      <div className="admin-alert-content">
                        <strong>{alerta.producto}</strong>
                        <p>{alerta.categoria}</p>
                      </div>
                    </div>
                    <FaChevronRight className="admin-alert-chevron" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="admin-alert-container">
              <h3 className="admin-alert-title">Control de Mantenimiento</h3>
              <ul className="admin-alert-list">
                {habitacionesMantenimiento.map((hbt, idx) => (
                  <li key={idx} className="admin-alert-item maintenance">
                    <div className="admin-alert-left">
                      <span className="admin-alert-badge maintenance-badge">
                        <FaWrench />
                      </span>
                      <div className="admin-alert-content">
                        <strong>Habitación #{hbt.numero}</strong>
                        <p>{hbt.duracion} - {hbt.responsable}</p>
                      </div>
                    </div>
                    <button className="admin-alert-action">Liberar</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
