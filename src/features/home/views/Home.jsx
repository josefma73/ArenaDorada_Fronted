import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import '../styles/Home.css';

const Home = ({ onReserva = () => {} }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showOccupancy, setShowOccupancy] = useState(false);
  
  const [rooms, setRooms] = useState([
    { id: 1, adults: 2, children: 0, babies: 0 }
  ]);

  const datePickerRef = useRef(null);
  const occupancyRef = useRef(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (showDatePicker === 'checkin') {
      setCheckIn(selectedDate);
      setShowDatePicker('checkout');
      if (!checkOut || selectedDate > checkOut) {
        setCheckOut(new Date(selectedDate.getTime() + 86400000));
      }
    } else if (showDatePicker === 'checkout') {
      if (selectedDate > checkIn) {
        setCheckOut(selectedDate);
        setShowDatePicker(null);
      }
    }
  };

  const handleAddRoom = () => {
    if (rooms.length < 3) {
      setRooms([...rooms, { id: rooms.length + 1, adults: 2, children: 0, babies: 0 }]);
    }
  };

  const handleRemoveRoom = (id) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const handleRoomUpdate = (id, field, value) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: parseInt(value) } : room
    ));
  };

  const getTotalGuests = () => {
    return rooms.reduce((total, room) => total + room.adults + room.children + room.babies, 0);
  };

  const handleReservation = () => {
    if (!checkIn || !checkOut) {
      alert('Por favor selecciona las fechas');
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      rooms,
      totalGuests: getTotalGuests(),
      totalRooms: rooms.length
    };

    onReserva(bookingData);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const monthName = currentMonth.toLocaleDateString('es-ES', { 
    month: 'long', 
    year: 'numeric' 
  }).toUpperCase();

  const weekDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  return (
    <div className="hm-hero__container">
      <div className="hm-hero__overlay"></div>
      
      <div className="hm-hero__content">
        <div className="hm-hero__text">
          <p className="hm-hero__tagline">LUJO EN EL CORAZÓN DE ICA</p>
          <h1 className="hm-hero__title">
            Tu Refugio de
            <span className="hm-hero__title-accent"> Arena Dorada</span>
          </h1>
          <p className="hm-hero__description">
            Experimenta la serenidad absoluta y el confort curado en nuestro oasis de lujo, diseñado para fundirse con los paisajes eternos del desierto peruano
          </p>
        </div>

        <div className="hm-booking__container">
          <div className="hm-booking__form-group" style={{ position: 'relative' }}>
            <label className="hm-booking__label">Fechas</label>
            <div className="hm-booking__date-inputs">
              <input
                type="text"
                className="hm-booking__date-input"
                value={checkIn ? formatDate(checkIn) : ''}
                onClick={() => setShowDatePicker(showDatePicker === 'checkin' ? null : 'checkin')}
                placeholder="CHECK IN"
                readOnly
              />
              <input
                type="text"
                className="hm-booking__date-input"
                value={checkOut ? formatDate(checkOut) : ''}
                onClick={() => checkIn && setShowDatePicker(showDatePicker === 'checkout' ? null : 'checkout')}
                placeholder="CHECK OUT"
                readOnly
              />
            </div>

            {showDatePicker && (
              <div className="hm-datepicker__popup" ref={datePickerRef}>
                <div className="hm-datepicker__header">
                  <button className="hm-datepicker__nav-btn" onClick={handlePrevMonth}>&lt;</button>
                  <h3 className="hm-datepicker__month">{monthName}</h3>
                  <button className="hm-datepicker__nav-btn" onClick={handleNextMonth}>&gt;</button>
                </div>

                <div className="hm-datepicker__weekdays">
                  {weekDays.map(day => (
                    <div key={day} className="hm-datepicker__weekday">{day}</div>
                  ))}
                </div>

                <div className="hm-datepicker__days">
                  {renderCalendar().map((day, idx) => (
                    <div
                      key={idx}
                      className={`hm-datepicker__day ${
                        !day ? 'hm-datepicker__day--disabled' : ''
                      } ${
                        day && checkIn && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getTime() === checkIn.getTime()
                          ? 'hm-datepicker__day--selected'
                          : ''
                      } ${
                        day && checkOut && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getTime() === checkOut.getTime()
                          ? 'hm-datepicker__day--selected'
                          : ''
                      } ${
                        day && checkIn && checkOut && 
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) > checkIn &&
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < checkOut
                          ? 'hm-datepicker__day--range'
                          : ''
                      }`}
                      onClick={() => day && handleDateSelect(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hm-booking__form-group" style={{ position: 'relative' }}>
            <label className="hm-booking__label">Ocupación</label>
            <button
              className="hm-occupancy__button"
              onClick={() => setShowOccupancy(!showOccupancy)}
            >
              <span>{rooms.length} Habitación{rooms.length > 1 ? 'es' : ''}, {getTotalGuests()} Huéspedes</span>
              <span>▼</span>
            </button>

            {showOccupancy && (
              <div className="hm-occupancy__popup" ref={occupancyRef}>
                <div className="hm-occupancy__header">
                  <span className="hm-occupancy__title">Habitaciones</span>
                  <div className="hm-occupancy__room-controls">
                    <button
                      className="hm-occupancy__btn-small"
                      onClick={handleAddRoom}
                      disabled={rooms.length >= 3}
                    >
                      −
                    </button>
                    <span className="hm-occupancy__room-count">{rooms.length}</span>
                    <button
                      className="hm-occupancy__btn-small"
                      onClick={handleAddRoom}
                      disabled={rooms.length >= 3}
                    >
                      +
                    </button>
                  </div>
                </div>

                {rooms.map((room) => (
                  <div key={room.id} className="hm-occupancy__room-section">
                    <div className="hm-occupancy__room-title">
                      <span>HABITACIÓN {room.id}</span>
                      {rooms.length > 1 && (
                        <button
                          className="hm-occupancy__delete-btn"
                          onClick={() => handleRemoveRoom(room.id)}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="hm-occupancy__guest-row">
                      <div className="hm-occupancy__guest-col">
                        <label className="hm-occupancy__guest-label">Adultos</label>
                        <select
                          className="hm-occupancy__guest-select"
                          value={room.adults}
                          onChange={(e) => handleRoomUpdate(room.id, 'adults', e.target.value)}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hm-occupancy__guest-col">
                        <label className="hm-occupancy__guest-label">Niños</label>
                        <select
                          className="hm-occupancy__guest-select"
                          value={room.children}
                          onChange={(e) => handleRoomUpdate(room.id, 'children', e.target.value)}
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <p className="hm-occupancy__guest-note">&lt; 11 años</p>
                      </div>
                    </div>

                    <div className="hm-occupancy__guest-row">
                      <div className="hm-occupancy__guest-col">
                        <label className="hm-occupancy__guest-label">Bebés</label>
                        <select
                          className="hm-occupancy__guest-select"
                          value={room.babies}
                          onChange={(e) => handleRoomUpdate(room.id, 'babies', e.target.value)}
                        >
                          {[0, 1, 2].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <p className="hm-occupancy__guest-note">&lt; 2 años</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hm-booking__form-group">
            <label className="hm-booking__label">Promocode (Opcional)</label>
            <input
              type="text"
              className="hm-booking__date-input"
              placeholder="Ingresa tu código"
            />
          </div>

          <button
            className="hm-booking__submit-btn"
            onClick={handleReservation}
          >
            RESERVAR AHORA
          </button>
        </div>
      </div>

      <button className="hm-whatsapp__btn" title="Contactar por WhatsApp">
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default Home;
