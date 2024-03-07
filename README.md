# Frontend Desafio Técnico Fullstack Lexart - Sistema de gerenciamento de Celulares

## Funcionalidades

- **Login**: Os usuários podem fazer login na aplicação para acessar suas contas.
- **Registrar**: Novos usuários podem se registrar para uma conta.
- **Visualizar Celulares**: Os usuários podem visualizar os produtos de celular disponíveis.
- **Editar Celular**: Os usuários podem editar celulares existentes.
- **Criar Celular**: Os usuários podem criar novos produtos de celular.
- **Filtrar Celulares**: Os usuários podem filtrar com diversos tipos de filtros.

## Rotas

- `/`: Login page.
- `/register`: Registration page.
- `/cellphones`: Page to view all available cellphone products.
- `/cellphones/:id/edit`: Page to edit a specific cellphone product.
- `/cellphones/create`: Page to create a new cellphone product.

## Tecnologias Utilizadas

- **React**: Biblioteca frontend para construir interfaces de usuário.
- **Next.js**: Framework React para renderização do lado do servidor e roteamento.
- **Zustand**: Biblioteca de gerenciamento de estado para React.
- **TypeScript**: Superset tipado do JavaScript para melhorar a experiência do desenvolvedor.

## Implantação

O aplicativo frontend está implantado na Vercel em [https://lexart-cellphone-frontend.vercel.app/](https://lexart-cellphone-frontend.vercel.app/).

### Usuario de ex: 
- Email: 
```
    admin@admin.com
``` 
- Senha: 
```
    admin
```

## Repositórios

- Frontend: [https://github.com/HenrikSantos/lexart-cellphone-frontend](https://github.com/HenrikSantos/lexart-cellphone-frontend)
- Backend: [https://github.com/HenrikSantos/lexart-cellphone-backend](https://github.com/HenrikSantos/lexart-cellphone-backend)

## Como Começar

Para começar com o ambiente de desenvolvimento, siga estes passos:

1. Clone o repositório frontend:

```
git clone https://github.com/HenrikSantos/lexart-cellphone-frontend.git
```

2. Instale as dependências:

```
cd lexart-cellphone-frontend
npm install
```

3. Inicie o servidor de desenvolvimento:

```
npm run dev
```

4. Visite [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar a aplicação.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.