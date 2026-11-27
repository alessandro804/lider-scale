# lider-scale

Front do **Lider Scale**, o sistema comercial da Lider Commerce: proposta
instantanea, CRM, comissoes e inteligencia de vendas.

Servido pelo GitHub Pages em **liderscale.com**, branch `main`, na raiz. DNS no
Cloudflare em Somente DNS, nuvem cinza.

## Como as pastas sao dispostas

**Uma pasta por URL, e os arquivos comuns em `assets/`.** Nunca um arquivo
unico e gigante: o painel do Lider 10 chegou a 4,9 MB num `index.html` so, e a
partir de certo tamanho qualquer conserto passa a ser arriscado, porque um
`SyntaxError` em qualquer ponto nao quebra uma tela, mata o arquivo todo.

```
/                     landing, em portugues
/en/  /es/            a mesma landing, em ingles e espanhol
/privacidade/ /termos/        paginas legais (e /en/privacy/, /es/privacidad/, ...)
/assets/              CSS, JS e imagens da landing
/app/                 o painel
/app/assets/          base.css, painel.css, idioma.js, menu.js, sessao.js
/app/login/           entrada
/app/completar/       completar cadastro
/app/oportunidades/   lista
/app/oportunidades/nova/
/p/                   a proposta que o cliente abre, por link com token
```

## Os tres idiomas

`app/assets/idioma.js` guarda as chaves em portugues, ingles e espanhol. O
`t()` cai no portugues quando a chave falta no idioma escolhido, de proposito:
texto faltando aparece em portugues e se percebe, enquanto chave crua na tela
nao se percebe.

A troca fica no **globo, no canto superior direito**, do mesmo jeito que no
Lider 10. O pe da lateral e a pessoa, e abre o mesmo painel.

A pagina `/p/` e autossuficiente: ela carrega para o cliente final, que nao tem
cadastro, entao nao puxa `idioma.js` nem o resto do painel. As frases dela
moram dentro dela.

## O que o front nunca faz

Nao fala com o banco direto. Toda tela passa pela API em
`api.scale.lidercommerce.com.br`.
