import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
    isPublished: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddArticle = (event) => {
    event.preventDefault();

    const newArticle = {
      id: Date.now(),
      ...formData,
    };

    setArticles([...articles, newArticle]);
    setFormData({
      title: "",
      image: "",
      content: "",
      category: "",
      isPublished: false,
    });
  };

  const removeArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Gestione Articoli del Blog</h1>
      <form onSubmit={handleAddArticle} className="mb-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo dell'articolo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Inserisci il titolo dell'articolo"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            URL Immagine
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control"
            placeholder="Inserisci l'URL dell'immagine"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Contenuto
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            placeholder="Scrivi il contenuto dell'articolo"
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Seleziona una categoria</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Viaggi">Viaggi</option>
            <option value="Altro">Altro</option>
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            className="form-check-input"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
          <label htmlFor="isPublished" className="form-check-label">
            Pubblica l'articolo
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Aggiungi Articolo</button>
      </form>

      <section>
        <h2>Lista degli Articoli</h2>
        {articles.length > 0 ? (
          <ul className="list-group">
            {articles.map((article) => (
              <li
                key={article.id}
                className="list-group-item d-flex justify-content-between align-items-start flex-column"
              >
                <div>
                  <h5>{article.title}</h5>
                  {article.image && <img src={article.image} alt={article.title} className="img-fluid mb-2" style={{ maxWidth: "150px" }} />}
                  <p>{article.content}</p>
                  <p><strong>Categoria:</strong> {article.category}</p>
                  <p><strong>Stato:</strong> {article.isPublished ? "Pubblicato" : "Bozza"}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeArticle(article.id)}
                >
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nessun articolo presente. Aggiungine uno!</p>
        )}
      </section>
    </div>
  );
}

export default App;