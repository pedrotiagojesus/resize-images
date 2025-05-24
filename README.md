# 🖼️ Image Resizer - Frontend

Interface web em React para fazer upload de várias imagens e redimensioná-las via API. O backend processa as imagens e retorna um ficheiro `.zip` com as imagens redimensionadas.

---

## 📷 Funcionalidades

- Upload de múltiplas imagens
- Definir largura e/ou altura para redimensionamento
- Download automático das imagens processadas num ficheiro `.zip`
- Interface simples e responsiva com Bootstrap

---

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o endpoint da API

Cria um ficheiro `.env` na raiz do projeto com o seguinte conteúdo:

```bash
REACT_APP_ENDPOINT=XXX
```

### 3. Iniciar a aplicação

```bash
npm start
```
A aplicação será lançada automaticamente em `http://localhost:3000`.

## 🧪 Dependências principais

* React
* Bootstrap
* TypeScript

## 🔧 Funcionalidade esperada

1. O utilizador seleciona várias imagens.
2. Define a largura e/ou altura desejada.
3. Ao submeter, as imagens são enviadas para a API.
4. Recebe-se um .zip com as imagens redimensionadas.

## 📄 Licença
Projeto de uso pessoal/educacional. Podes modificar ou adaptar livremente.