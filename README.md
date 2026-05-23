# NTEC Landing Page

Landing page institucional da Nord Tecnologia (NTEC), focada em assistência técnica, manutenção de computadores, infraestrutura e suporte de TI na região do Cariri.

## Tecnologias usadas

- HTML5 semântico
- CSS3 puro
- JavaScript puro
- Google Fonts

O projeto não usa build, dependências npm, frameworks ou bibliotecas externas além das fontes.

## Estrutura de pastas

```text
/
├── index.html
├── README.md
├── assets/
│   ├── logo-ntec.svg
│   ├── favicon.svg
│   └── og-image.png
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Como rodar localmente

Abra o arquivo `index.html` diretamente no navegador.

Opcionalmente, use um servidor local simples:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como publicar no GitHub Pages

1. Envie os arquivos para o repositório no GitHub.
2. Acesse `Settings` > `Pages`.
3. Em `Build and deployment`, selecione `Deploy from a branch`.
4. Escolha a branch principal e a pasta `/root`.
5. Salve e aguarde a publicação.

## Onde alterar informações

- Telefone e links de WhatsApp: `index.html`
- Instagram: `index.html`
- Textos das seções: `index.html`
- Cores e identidade visual: `css/styles.css`, no bloco `:root`
- Logo e favicon: `assets/logo-ntec.svg` e `assets/favicon.svg`
- Imagem de compartilhamento: `assets/og-image.png`

## Observação

`assets/og-image.png` é um placeholder funcional e pode ser substituído por uma arte final de Open Graph quando necessário.
