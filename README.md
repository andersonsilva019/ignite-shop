# E-commerce de camisetas

Este é um projeto de e-commerce simples de camisetas, onde o usuário poderá escolher a camiseta que deseja comprar. Quando o usuários clicar em "comprar agora" será redirecionando para um checkout onde poderá escolher a forma de pagamento.

O projeto tem como finalidade o aprendizado mais profundo do Nextjs. 

### Melhorias futuras

- [ ] Adicionar testes;
- [x] Computar quantas vez um produto foi acessado para poder gerar de forma estática com `getStaticProps` os produtos mais acessados;

> A solução encontrada para realizar essa computação foi utilizando um banco de dados não relacional, o MongoDB. A cada vez que um produto é acessado, é feito uma requisição para o banco de dados para atualizar a quantidade de acessos do produto.

https://user-images.githubusercontent.com/52974388/211214360-6a016eb0-a803-43c5-90a6-38e94b8e9896.mp4

### 📋 Pré-requisitos

- Criar uma conta no [Stripe](https://stripe.com/br) para gerar as chaves de acesso a API.
- Criar uma conta na mongoDB para gerar a string de conexão com o banco de dados.

Com todos esse dados em mãos, crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
# App
NEXT_URL=http://localhost:3000

# Stripe
STRIPE_PUBLIC_KEY=chave_publica_stripe
STRIPE_SECRET_KEY=chave_secreta_stripe

# MongoDB
NEXT_MONGO_URI=uri_de_conexao_mongo
NEXT_MONGO_DATABASE=nome_do_banco_de_dados
```

### 🔧 Instalação

Basta clonar o repositório e instalar as dependências:

```bash
# Via ssh
git clone git@github.com:andersonsilva019/ignite-shop.git

# Instalar as dependências
yarn

# Iniciar o projeto em modo de desenvolvimento
yarn dev
```

## 🛠️ Tecnologias


* [Nextjs](https://nextjs.org/) - O framework React usado
* [Typescript](https://www.typescriptlang.org/) - Linguagem de programação
* [MongoDB](https://www.mongodb.com/) - Banco de dados
* [Stripe](https://stripe.com/br) - API de pagamentos
* [Stitches](https://stitches.dev/) - Biblioteca de estilos
* [Axios](https://axios-http.com/ptbr/docs/intro) - Biblioteca para requisições HTTP

---
⌨️ com ❤️ por [Anderson Silva](https://github.com/andersonsilva019) 😊
