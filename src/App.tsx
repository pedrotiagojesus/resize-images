import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [images, setImages] = useState<FileList | null>(null);
    const [width, setWidth] = useState("300");
    const [height, setHeight] = useState("300");
    const [messageStatus, setMessageStatus] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResize = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!images || images.length === 0 || (!width && !height)) {
            setMessageStatus("Seleciona imagens e define largura e/ou altura.");
            setStatus("info");
            return;
        }

        const formData = new FormData();
        Array.from(images).forEach((image) => {
            formData.append("images", image);
        });

        if (width) formData.append("width", width);
        if (height) formData.append("height", height);

        try {
            setLoading(true);
            setMessageStatus("A processar...");
            setStatus("info");

            const endpoint = process.env.REACT_APP_ENDPOINT || "";
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao redimensionar imagens");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "imagens-redimensionadas.zip";
            link.click();

            setMessageStatus("Download concluído!");
            setStatus("success");
        } catch (error) {
            console.error(error);
            setMessageStatus("Erro ao redimensionar as imagens.");
            setStatus("danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Redimensionar Imagem</h1>

            <form onSubmit={handleResize}>
                <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                        Escolhe várias imagens
                    </label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        className="form-control"
                        onChange={(e) => setImages(e.target.files)}
                        required
                    />
                </div>

                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-label">Largura (px)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <label className="form-label">Altura (px)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "A redimensionar..." : "Redimensionar"}
                </button>
            </form>

            {messageStatus && (
                <div className={`alert alert-${status} mt-4`} role="alert">
                    {messageStatus}
                </div>
            )}
        </div>
    );
}

export default App;
