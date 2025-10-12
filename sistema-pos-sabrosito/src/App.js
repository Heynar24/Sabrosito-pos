import { useState } from "react";

function App() {
  const categorias = [
    {
      nombre: "Pollo a la leña",
      productos: [
        { id: 1, nombre: "Económico con fideo", precio: 18 },
        { id: 2, nombre: "Económico sin fideo", precio: 16 },
        { id: 3, nombre: "Cuarto pierna", precio: 28 },
        { id: 4, nombre: "Cuarto pecho", precio: 30 },
        { id: 5, nombre: "Medio pollo", precio: 50 },
        { id: 6, nombre: "Pollo entero", precio: 100 },
      ],
    },
    {
      nombre: "Pollo a la broaster",
      productos: [
        { id: 7, nombre: "Super económico", precio: 10 },
        { id: 8, nombre: "Económico", precio: 16 },
        { id: 9, nombre: "Cuarto", precio: 28 },
      ],
    },
    {
      nombre: "Salchipapas",
      productos: [{ id: 10, nombre: "Salchipapa clásica", precio: 15 }],
    },
    {
      nombre: "Porciones",
      productos: [
        { id: 11, nombre: "Porción de fideo", precio: 8 },
        { id: 12, nombre: "Porción de papa", precio: 8 },
        { id: 13, nombre: "Porción de arroz", precio: 8 },
      ],
    },
    {
      nombre: "Sodas",
      productos: [
        { id: 14, nombre: "Mini", precio: 3 },
        { id: 15, nombre: "Pop popular", precio: 4 },
        { id: 16, nombre: "Soda peque", precio: 5 },
        { id: 17, nombre: "Jugo Tropi", precio: 7 },
        { id: 18, nombre: "Popular Fanta", precio: 8 },
        { id: 19, nombre: "Popular CocaCola", precio: 8 },
        { id: 20, nombre: "Mendocina", precio: 9 },
        { id: 21, nombre: "Pepsi", precio: 10 },
        { id: 22, nombre: "Jugo del Valle", precio: 12 },
        { id: 23, nombre: "Aqua-rius 2L", precio: 16 },
        { id: 24, nombre: "Cabaña", precio: 16 },
        { id: 25, nombre: "Jugo Pura Vida", precio: 16 },
        { id: 26, nombre: "Simba", precio: 16 },
        { id: 27, nombre: "Coca Cola 2L", precio: 19 },
        { id: 28, nombre: "Fanta 2L", precio: 19 },
        { id: 29, nombre: "Coca Cola 3L", precio: 23 },
      ],
    },
  ];

  const [pedido, setPedido] = useState([]);
  const [tipoPedido, setTipoPedido] = useState("mesa");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [mostrarTicket, setMostrarTicket] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0].nombre
  );

  const agregarProducto = (producto) => {
    const existe = pedido.find((item) => item.id === producto.id);
    if (existe) {
      setPedido(
        pedido.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setPedido([...pedido, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id) => {
    setPedido(pedido.filter((item) => item.id !== id));
  };

  const total = pedido.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const confirmarPedido = () => {
    setMostrarTicket(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };
  const generarTextoTicket = () => {
  let texto = "SABROSITO POS\n";
  texto += "----------------------\n";
  texto += `Fecha: ${new Date().toLocaleString()}\n`;
  texto += `Tipo: ${tipoPedido === "mesa" ? `Mesa ${numeroMesa}` : "Para llevar"}\n`;
  texto += "----------------------\n";
  pedido.forEach((item) => {
    texto += `${item.nombre} x ${item.cantidad} = Bs ${item.precio * item.cantidad}\n`;
  });
  texto += "----------------------\n";
  texto += `TOTAL: Bs ${total}\n`;
  texto += "¡Gracias por su compra!\n";
  return texto;
};

const codificarParaRawBT = (texto) => {
  return encodeURIComponent(texto);
};

  // === ESTILOS RESPONSIVOS PARA MÓVIL ===
  const contenedor = {
    padding: "10px",
    maxWidth: "480px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  };

  const botonCategoria = (activa) => ({
    flex: "1 1 45%",
    padding: "10px",
    backgroundColor: activa ? "#462510ff" : "#eee",
    color: activa ? "white" : "black",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  });

  const botonProducto = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "14px",
    marginBottom: "8px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const botonConfirmar = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#582821ff",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    marginTop: "20px",
  };

  return (
    <div style={contenedor}>
      {!mostrarTicket ? (
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "22px",
              marginBottom: "20px",
            }}
          >
            🍗🍟 Sistema Sabrosito 
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            {categorias.map((cat) => (
              <button
                key={cat.nombre}
                onClick={() => setCategoriaSeleccionada(cat.nombre)}
                style={botonCategoria(cat.nombre === categoriaSeleccionada)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <label>Tipo de pedido: </label>
            <select
              value={tipoPedido}
              onChange={(e) => setTipoPedido(e.target.value)}
              style={{
                padding: "8px",
                marginLeft: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="mesa">En mesa</option>
              <option value="llevar">Para llevar</option>
            </select>

            {tipoPedido === "mesa" && (
              <div style={{ marginTop: "10px" }}>
                <label>N° Mesa: </label>
                <input
                  type="text"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  style={{
                    marginLeft: "8px",
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    width: "80px",
                    textAlign: "center",
                  }}
                />
              </div>
            )}
          </div>

          {/* PRODUCTOS */}
          {categorias
            .filter((cat) => cat.nombre === categoriaSeleccionada)
            .map((categoria) => (
              <div key={categoria.nombre}>
                <h2
                  style={{
                    textAlign: "center",
                    backgroundColor: "#672626e8",
                    color: "white",
                    borderRadius: "6px",
                    padding: "5px",
                    fontSize: "18px",
                  }}
                >
                  {categoria.nombre}
                </h2>
                {categoria.productos.map((producto) => (
                  <button
                    key={producto.id}
                    onClick={() => agregarProducto(producto)}
                    style={botonProducto}
                  >
                    <span>{producto.nombre}</span>
                    <strong>Bs {producto.precio}</strong>
                  </button>
                ))}
              </div>
            ))}

          {/* PEDIDO */}
          <h2 style={{ marginTop: "25px", textAlign: "center" }}>
            🧾 Pedido actual
          </h2>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {pedido.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>
                  {item.nombre} x {item.cantidad}
                </span>
                <span>
                  Bs {item.precio * item.cantidad}{" "}
                  <button
                    onClick={() => eliminarProducto(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <h3 style={{ textAlign: "center" }}>Total: Bs {total}</h3>

          <button onClick={confirmarPedido} style={botonConfirmar}>
            Confirmar e imprimir ticket
          </button>
        </div>
      ) : (
        <div style={{ fontFamily: "monospace", textAlign: "center" }}>
          <h2>🧾 Ticket de pedido</h2>
          <p>Fecha: {new Date().toLocaleString()}</p>
          <p>
            Tipo: {tipoPedido === "mesa" ? `Mesa ${numeroMesa}` : "Para llevar"}
          </p>
          <hr />
          <ul style={{ listStyle: "none", padding: 0 }}>
            {pedido.map((item) => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} = Bs{" "}
                {item.precio * item.cantidad}
              </li>
            ))}
          </ul>
          <hr />
          <h3>Total: Bs {total}</h3>
          <p>¡Gracias por su compra!</p>
          <a
  href={`rawbt:print?text=${codificarParaRawBT(generarTextoTicket())}`}
  style={{
    display: "inline-block",
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#6c2927ff",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "18px",
  }}
>
  Imprimir ticket con RawBT
</a>
        </div>
      )}
    </div>
  );
}

export default App;
