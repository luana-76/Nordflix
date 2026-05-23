# NordFlix 🎬

Clone da Netflix desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura do projeto

```
Nordflix/
├── index.html              # Redireciona para pages/inicio.html
├── vercel.json             # Configuração do Vercel (rotas, cache)
├── pages/                  # Todas as páginas HTML
│   ├── inicio.html
│   ├── login.html
│   ├── cadastro.html
│   ├── cadastro-steps.html
│   ├── planos.html
│   ├── usuario.html
│   ├── userOne.html
│   ├── userTwo.html
│   ├── editProfile.html
│   ├── addNewUser.html
│   ├── newUser.html
│   ├── childrensPage.html
│   └── form.html
├── css/                    # Estilos
├── js/                     # Scripts
└── assets/
    ├── img/                # Imagens dos filmes/séries
    ├── videos/             # Vídeos de capa (.mp4)
    ├── icons/              # Logos e favicon
    └── cadastroFundo.gif   # GIF de fundo do cadastro
```

## Deploy no Vercel

1. Suba a pasta `Nordflix` como raiz do repositório no GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. O `vercel.json` já configura todas as rotas e cache automaticamente
4. Deploy! ✅

## Rotas limpas (Clean URLs)

O Vercel serve as páginas sem o `.html`:
- `/` → inicio
- `/login` → login
- `/cadastro` → cadastro
- `/usuario` → seleção de perfil
