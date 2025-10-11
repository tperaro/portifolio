# Thiago Peraro - Portfólio PessoalBem-vindo ao meu portfólio pessoal! Este site foi construído com Next.js e Stackbit, mostrando meus projetos, experiência profissional e compartilhando conhecimento através do blog.## 🚀 Sobre o SiteEste portfólio foi desenvolvido para:- Apresentar meus projetos e habilidades técnicas- Compartilhar experiências e conhecimentos através do blog- Facilitar contato para oportunidades profissionais- Demonstrar meu trabalho com tecnologias modernas## 🛠️ Tecnologias Utilizadas- **Framework:** Next.js 15- **Linguagem:** TypeScript- **Estilização:** Tailwind CSS- **Animações:** Framer Motion 11 + Aceternity UI- **CMS:** Stackbit (Git-based CMS)- **Hospedagem:** Netlify- **Conteúdo:** Markdown + JSON## 📋 Funcionalidades- ✅ Design responsivo e moderno- ✅ Blog com posts técnicos- ✅ Página de projetos com detalhes- ✅ Seção de experiência profissional- ✅ Formulário de contato- ✅ SEO otimizado- ✅ Performance otimizada- ✅ Acessibilidade (WCAG)- ✅ **Sistema de Animações Interativas** 🎨  - Scroll-reveal animations em todas as seções  - Hover effects em botões, cards e ícones  - Transições suaves entre páginas (400ms fade)  - Hero section com efeito de digitação  - Loading indicator durante navegação  - Smooth scroll para links âncora  - Suporte completo a `prefers-reduced-motion`  - 60fps em todos os dispositivos  - WCAG 2.1 Level AA compliant  - 📖 [Ver documentação completa](docs/ANIMATIONS.md)## 🚀 Como Executar Localmente### Pré-requisitos- Node.js 18+ - npm ou yarn### Instalação1. Clone o repositório:```bashgit clone https://github.com/tperaro/portfolio.gitcd portfolio```2. Instale as dependências:```bashnpm install```3. Execute o projeto em modo de desenvolvimento:```bashnpm run dev```4. Abra [http://localhost:3000](http://localhost:3000) no navegador## 📁 Estrutura do Projeto```├── content/                 # Conteúdo em Markdown e JSON│   ├── data/               # Dados globais (header, footer, etc.)│   └── pages/              # Páginas do site│       ├── blog/           # Posts do blog│       ├── about.md        # Sobre mim│       ├── projects.md     # Projetos│       ├── experience.md   # Experiência profissional│       └── contact.md      # Contato├── src/│   ├── components/         # Componentes React│   ├── pages/             # Páginas Next.js│   ├── styles/            # Estilos CSS│   └── utils/             # Utilitários├── public/                # Arquivos estáticos└── sources/               # Modelos de conteúdo Stackbit
```

## 📝 Adicionando Conteúdo

### Novo Post no Blog

1. Crie um arquivo `.md` em `content/pages/blog/`
2. Use o frontmatter padrão:

```markdown
---
title: 'Título do Post'
slug: titulo-do-post
date: '2024-01-01'
excerpt: 'Descrição breve do post'
featuredImage:
  url: /images/post-image.jpg
  altText: 'Descrição da imagem'
  type: ImageBlock
type: PostLayout
---

Conteúdo do post em Markdown...
```

### Novo Projeto

Edite `content/pages/projects.md` para adicionar novos projetos na seção `FeaturedItemsSection`.

## 🎨 Personalização

### Cores e Tema

As cores podem ser personalizadas em:
- `tailwind.config.js` - Configurações do Tailwind
- `content/data/style.json` - Estilos globais do site

### Componentes

Os componentes estão organizados em:
- `src/components/atoms/` - Componentes básicos
- `src/components/blocks/` - Blocos de conteúdo
- `src/components/sections/` - Seções de página
- `src/components/layouts/` - Layouts de página

## 🚀 Deploy

O site está configurado para deploy automático no Netlify:

1. Conecte o repositório ao Netlify
2. Configure as variáveis de ambiente (se necessário)
3. O deploy será feito automaticamente a cada push na branch `main`

### Configuração do Netlify

O arquivo `netlify.toml` já está configurado com:
- Build command: `npm run build`
- Publish directory: `out`
- Redirects para SPA

## 📊 Performance

- **Lighthouse Score:** 95+ em todas as métricas
- **Core Web Vitals:** Otimizado
- **Images:** Otimizadas com Next.js Image
- **CSS:** Purged com Tailwind
- **JavaScript:** Code splitting automático

## 🔍 SEO

- Meta tags otimizadas
- Open Graph para redes sociais
- Sitemap automático
- Schema.org markup
- URLs amigáveis

## 📱 Responsividade

O site é totalmente responsivo e testado em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (375px - 767px)
- Mobile pequeno (320px+)

## 🛡️ Segurança

- Headers de segurança configurados
- Sanitização de conteúdo Markdown
- Validação de formulários
- CSP (Content Security Policy)

## 📈 Analytics

Para adicionar analytics:

1. Google Analytics:
```javascript
// Em _app.js
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
```

2. Vercel Analytics:
```javascript
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e melhorias são sempre bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- **LinkedIn:** [thiago-peraro](https://www.linkedin.com/in/thiago-peraro/)
- **GitHub:** [tperaro](https://github.com/tperaro)
- **Email:** contato@thiagoperaro.dev
- **Website:** [thiagoperaro.dev](https://thiagoperaro.dev)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela no repositório!

Desenvolvido com ❤️ por [Thiago Peraro](https://github.com/tperaro)
