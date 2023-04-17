import "./App.css";

import { useState, useEffect } from "react";

import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Preço:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {!loading && <input type="submit" value="Criar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
        </form>
      </div>

      <h1>Lista de Cotações</h1>

      {items.length > 0 && (
        <>
          <p>{loading && "Carregando dados!!!"}</p>
          <p>{error && error}</p>
          <ul>
            {items &&
              items.map((product) => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <span>R$ {product.price}</span>
                  <span>
                    <button onClick={() => handleRemove(product.id)}>X</button>
                  </span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
