"use client";
import React, { useEffect, useState } from "react";
import type { Producto } from "../schemas/producto";
import { useOrder } from "../context/ordenContext";

const Menu: React.FC = () => {
  const { addToOrder } = useOrder();
  const [productos, setProductos] = useState<Producto[]>([]); // lista de productos
  const [cargando, setCargando] = useState<boolean>(true); // estado de carga
  const [error, setError] = useState<string | null>(null); // mensaje de error

  const cargarMenu = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch("http://localhost/api/menu");
      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }
      const datos: Producto[] = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      // mantener mensaje amigable al usuario y log en consola para debug
      console.error("Error cargando el menú:", err);
      setError("Error al cargar menú");
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarMenu();
  }, []);

  if (cargando) {
    return (
      <div>
        <h2>Menú</h2>
        <p>Cargando menú...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Menú</h2>
        <p>{error}</p>
        <button onClick={() => void cargarMenu()}>Reintentar</button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div>
        <h2>Menú</h2>
        <p>No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Menú</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id} onClick={() => addToOrder(producto)} style={{ cursor: 'pointer' }}>
            {producto.nombre} — ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;