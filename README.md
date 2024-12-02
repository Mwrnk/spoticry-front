# SpotiCry 🎵

Bem-vindo ao **SpotiCry**! Um aplicativo para gerenciamento de playlists e músicas que proporciona uma experiência organizada e personalizada para os usuários.

---

## 📖 Sobre o Projeto

**SpotiCry** é uma plataforma onde os usuários podem:
- **Gerenciar músicas**: criar, editar e excluir músicas.
- **Gerenciar playlists**: criar, editar, excluir playlists e adicionar músicas.
- **Interagir com músicas de outros usuários**: adicionar músicas de terceiros às suas próprias playlists.

O objetivo é fornecer um ambiente intuitivo e eficiente para amantes de música que desejam organizar suas coleções de forma prática e personalizada.

Desenvolvido por **[Mateus Werneck](https://github.com/Mwrnk)**, **[Pedro Marazo](https://github.com/MarazoIED)**, e **[Tiago Malaquias](https://github.com/souzz2)**.

---

## 🌐 Acesse o Projeto

O projeto está disponível online através do seguinte link:  
[SpotiCry - Acesse Aqui](https://spoti-cry.netlify.app/)

---

## 🚀 Funcionalidades

- **CRUD de músicas**: Criação, edição e exclusão de músicas.
- **CRUD de playlists**: Criação, edição e exclusão de playlists.
- **Gerenciamento avançado de playlists**:
  - Adicionar músicas às playlists.
  - Adicionar músicas de outros usuários às suas próprias playlists.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- [React](https://reactjs.org/) - Biblioteca para criação de interfaces.
- [React Router DOM](https://reactrouter.com/) - Gerenciamento de rotas.
- [React Player](https://www.npmjs.com/package/react-player) - Reprodução de músicas/vídeos.
- [React Toastify](https://www.npmjs.com/package/react-toastify) - Exibição de notificações amigáveis.
- [React Slick](https://react-slick.neostack.com/) e [Slick Carousel](https://kenwheeler.github.io/slick/) - Criação de carrosséis responsivos.

### **Estilização**
- [Tailwind CSS](https://tailwindcss.com/) - Framework para estilização rápida e responsiva.

### **Gerenciamento de Estado e Requisições**
- [Axios](https://axios-http.com/) - Requisições HTTP.

### **Ferramentas de Desenvolvimento**
- [Vite](https://vitejs.dev/) - Ferramenta de build ultrarrápida.
- ESLint - Padronização de código.
- PostCSS/Autoprefixer - Otimização de estilos CSS.

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado no seu ambiente de desenvolvimento:

1. **Node.js** (recomendado: versão LTS mais recente)  
   Baixe e instale em: [Node.js](https://nodejs.org/)
   
2. **NPM** (ou Yarn)  
   O NPM já vem com o Node.js.  
   Caso prefira Yarn: [Instalar Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

3. **Git**  
   Baixe e instale em: [Git](https://git-scm.com/)

---

## 📝 Como Usar

### 1️⃣ Clonar o Repositório
Use o comando abaixo no terminal:
```bash
git clone https://github.com/seu-usuario/spoticry-front.git
```
Substitua `seu-usuario` pelo nome de usuário do GitHub.

### 2️⃣ Acessar o Diretório
Navegue até a pasta do projeto:
```bash
cd spoticry-front
```

### 3️⃣ Instalar Dependências
Instale todas as dependências necessárias:
```bash
npm install
```
ou, se estiver utilizando Yarn:
```bash
yarn install
```

### 4️⃣ Rodar o Projeto
Inicie o ambiente de desenvolvimento local:
```bash
npm run dev
```
O servidor será iniciado em [http://localhost:5173](http://localhost:5173).

---

## 🔄 Como Fazer um Fork

1. Acesse o repositório no GitHub: [SpotiCry Frontend](https://github.com/seu-usuario/spoticry-front)  
2. Clique no botão **Fork** no canto superior direito da página.  
3. No seu perfil, clone o repositório do fork:
   ```bash
   git clone https://github.com/seu-usuario/spoticry-front.git
   ```
4. Crie sua branch para modificações:
   ```bash
   git checkout -b minha-branch
   ```
5. Após fazer as alterações, envie o commit:
   ```bash
   git commit -m "Descrição das alterações"
   ```
6. Envie as mudanças para o seu repositório:
   ```bash
   git push origin minha-branch
   ```
7. Abra um Pull Request no repositório original.

---

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o aplicativo em modo de desenvolvimento.

### Build
```bash
npm run build
```
Gera o aplicativo otimizado para produção.

### Visualização
```bash
npm run preview
```
Serve a versão de produção do aplicativo localmente.

### Lint
```bash
npm run lint
```
Verifica o código para identificar problemas e manter a padronização.

---

## 🚀 Deploy

**SpotiCry** foi implantado utilizando [Netlify](https://www.netlify.com/).  
Para mais informações sobre o deploy, veja o [guia de suporte do Netlify](https://docs.netlify.com/).

---
