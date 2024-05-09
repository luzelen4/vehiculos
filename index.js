const express = require("express");
const app = express();
const port = 5001;
app.use(express.json());

const categorias = [
  { id: 1, nombre: "categoria1" },
  { id: 2, nombre: "categoria2" },
];
const productos = [
  {
    id: 1,
    nombre: "producto 1",
    valor: 5000,
    fechaVencimiento: "2024-06-01",
    categoriaId: "A",
    descripcion: "Descripción del Producto 1",
  },
  {
    id: 2,
    nombre: "Producto 2",
    valor: 12000,
    fechaVencimiento: "2024-07-15",
    categoriaId: "B",
    descripcion: "Descripción del Producto 2",
  },
];

// Array de automóviles
const vehiculos = [
  {
    id: 1,
    marca: "Toyota",
    cilindraje: 2000,
    tipo: "gasolina",
    linea: "Corolla",
    color: "Rojo",
    placa: "ABC123",
    valor: 150000000
  },
  {
    id: 2,
    marca: "Honda",
    cilindraje: 1800,
    tipo: "eléctrico",
    linea: "Civic",
    color: "Azul",
    placa: "XYZ456",
    valor: 100000000
  },
];

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});

app.get("/getProductos", (req, res) => {
  res.json([productos]);
});

app.get("/getProductosPorCategoriaId/:categoria", (req, res) => {
  const categoriaIdCadena = req.params.categoria;
  // const categoriaIdEntero = parseInt(categoriaIdCadena, 10);
  //console.log("categoriaId", categoriaIdEntero);
  const productosCategoria = productos.filter(
    (producto) => producto.categoriaId === categoriaIdCadena
  );
  res.json([productosCategoria]);
});

// listar productos de una categoría específica
app.get("/productos/:categoria", (req, res) => {
  console.log(req);
  const categoria = req.params.categoria;
  console.log(categoria);
  const productosCategoria = productos.filter(
    (producto) => producto.categoriaId === categoria
  );
  console.log(productosCategoria);
  res.json([productosCategoria]);
});

// listar todos los vehículos
app.get("/vehiculos", (req, res) => {
  res.json(vehiculos);
});

// listar productos con valor mayor a 10,000
app.get("/productos/mayor-10000", (req, res) => {
  const productosMayores10000 = productos.filter(
    (producto) => producto.valor > 10000
  );
  res.json([productosMayores10000]);
});

// listar productos y calcular el IVA
app.get("/productosiva", (req, res) => {
  const productosConIVA = productos.map((producto) => {
    const precioConIVA = producto.valor * 0.19;
    return { ...producto, precioConIVA };
  });
  let productoConIva = [];
  productos.forEach((producto) => {
    const valorIva = producto.valor * 0.19;
    const nombre = producto.nombre;
    const valorbase = producto.valor;
    productoConIva.push({ nombre, valorbase, valorIva });
  });
  res.json(productoConIva);
});

// Endpoint para listar vehículos de una marca específica

app.get("/vehiculos/:marca", (req, res) => {
  console.log(req);
  const marca = req.params.marca;
  console.log(marca);
  const vehiculosMarca = vehiculos.filter(
    (vehiculos) => vehiculos.marca === marca
  );
  console.log(vehiculosMarca);
  res.json([vehiculosMarca]);
});

// Endpoint para calcular impuesto vehicular para cada vehículo
app.get("/vehiculos-impuesto", (req, res) => {
  let vehiculosConImpuesto = [];
  vehiculos.forEach((vehiculo) => {
    if (vehiculo.tipo === "eléctrico") {
      const valorImpuestoVehiculoElectrico = vehiculo.valor * 0.01;
      vehiculo.valor = vehiculo.valor + valorImpuestoVehiculoElectrico;
      console.log(valorImpuestoVehiculoElectrico)
      console.log(vehiculo.valor)
      vehiculosConImpuesto.push({
        marca: vehiculo.marca,
        valor: vehiculo.valor,
        valorImpuesto: valorImpuestoVehiculoElectrico,
      });
    }
    if (vehiculo.tipo === "gasolina") {
      if (vehiculo.valor >= 1 && vehiculo.valor <= 50000000) {
        const valorImpuesto = vehiculo.valor * 0.01;
        vehiculo.valor = vehiculo.valor + valorImpuesto;
        vehiculosConImpuesto.push({
          marca: vehiculo.marca,
          valor: vehiculo.valor,
          valorImpuesto: valorImpuesto,
        });
      } else if (vehiculo.valor >= 50000001 && vehiculo.valor <= 100000000) {
        const valorImpuesto = vehiculo.valor * 0.015;
        vehiculo.valor = vehiculo.valor + valorImpuesto;
      } else if (vehiculo.valor >= 100000001 && vehiculo.valor <= 150000000) {
        const valorImpuesto = vehiculo.valor * 0.025;
        vehiculo.valor = vehiculo.valor + valorImpuesto;
        vehiculosConImpuesto.push({
          marca: vehiculo.marca,
          valor: vehiculo.valor,
          valorImpuesto: valorImpuesto,
        });
      } else {
        const valorImpuesto = vehiculo.valor * 0.035;
        vehiculo.valor = vehiculo.valor + valorImpuesto;
        vehiculosConImpuesto.push({
          marca: vehiculo.marca,
          valor: vehiculo.valor,
          valorImpuesto: valorImpuesto,
        });
      }
    }
  });
  res.json(vehiculosConImpuesto);
});

// Ejercicio adicional: Crear endpoints adicionales para productos y vehículos

// obtener un producto por su ID
app.get("/productos/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((producto) => producto.id === id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// obtener productos por su fecha de vencimiento
app.get("/productos/vencimiento/:fecha", (req, res) => {
  const fechaVencimiento = req.params.fecha;
  const productosVencidos = productos.filter(
    (producto) => producto.fechaVencimiento < fechaVencimiento
  );
  res.json(productosVencidos);
});

// obtener un vehículo por su ID
app.get("/vehiculos/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === id);
  if (vehiculo) {
    res.json(vehiculo);
  } else {
    res.status(404).send("Vehículo no encontrado");
  }
});

// obtener vehículos por su color
app.get("/vehiculos/color/:color", (req, res) => {
  const color = req.params.color;
  const vehiculosColor = vehiculos.filter(
    (vehiculo) => vehiculo.color === color
  );
  res.json(vehiculosColor);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
