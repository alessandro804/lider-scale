// ═══════════════════════════════════════════════════════════════════════════
// SESSAO · o token, e o fetch que o carrega sozinho
// ═══════════════════════════════════════════════════════════════════════════
// ★★★★★ O `fetch` GLOBAL E INTERCEPTADO, mesmo padrao do painel do Lider 10.
//   A alternativa seria um wrapper com nome, lembrado em cada uma das
//   centenas de chamadas que este sistema vai ter. A primeira que alguem
//   esquecer sai sem token e volta 401, e o erro aparece longe da causa.
//   Interceptando, nao ha o que esquecer.
//
// ★★★★ SO INJETA NO NOSSO DOMINIO. Um interceptador que carimba o token em
//   toda chamada manda a credencial para qualquer endereco que a pagina
//   chamar, inclusive um de terceiro.
'use strict';

const API = 'https://api.scale.lidercommerce.com.br';

// ★★★ O client_id do Google NAO e segredo: ele aparece no proprio HTML de
//   qualquer site que use entrada pelo Google. O que e segredo e o client
//   secret, e esse nunca sai do servidor.
const GOOGLE_CLIENT_ID = '698085493925-3m2mjl8j0c4pk2vqlhh753l65movkhl1.apps.googleusercontent.com';
const CHAVE_TOKEN = 'scale_token';
const CHAVE_USUARIO = 'scale_usuario';

(function interceptarFetch(){
  const original = window.fetch;
  window.fetch = function (entrada, opcoes) {
    opcoes = opcoes || {};
    const url = typeof entrada === 'string' ? entrada : (entrada && entrada.url) || '';
    if (url.indexOf(API) === 0) {
      const t = localStorage.getItem(CHAVE_TOKEN);
      if (t) {
        const h = new Headers(opcoes.headers || (entrada && entrada.headers) || {});
        if (!h.has('Authorization')) h.set('Authorization', 'Bearer ' + t);
        opcoes = Object.assign({}, opcoes, { headers: h });
      }
    }
    return original.call(this, entrada, opcoes);
  };
})();

const Sessao = {
  guardar(token, usuario) {
    localStorage.setItem(CHAVE_TOKEN, token);
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario || {}));
  },
  token() { return localStorage.getItem(CHAVE_TOKEN); },
  usuario() {
    try { return JSON.parse(localStorage.getItem(CHAVE_USUARIO) || '{}'); }
    catch (e) { return {}; }
  },
  limpar() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
  },
  // ★★★ Manda para o login quem nao tem token. Usado no topo de toda tela
  //   que exige sessao, antes de desenhar qualquer coisa.
  exigir() {
    if (!this.token()) { window.location.href = '/app/login/'; return false; }
    return true;
  },
};

// ── chamada a API, com o erro ja tratado ───────────────────────────────────
// ★★★ 401 em qualquer lugar significa sessao vencida: limpa e volta ao login
//   sem perguntar, porque nao ha o que a pessoa possa fazer na tela atual.
async function chamar(caminho, opcoes) {
  const r = await fetch(API + caminho, Object.assign({
    headers: { 'Content-Type': 'application/json' },
  }, opcoes || {}));

  if (r.status === 401 && !String(caminho).startsWith('/auth/entrar')) {
    Sessao.limpar();
    window.location.href = '/app/login/';
    throw new Error('sessao');
  }

  let dados = null;
  try { dados = await r.json(); } catch (e) { dados = null; }

  if (!r.ok || (dados && dados.ok === false)) {
    const e = new Error((dados && dados.erro) || 'Nao foi possivel concluir agora. Tente de novo em instantes.');
    e.status = r.status;
    throw e;
  }
  return dados;
}

// ── formatacao de dinheiro, em centavos ────────────────────────────────────
function emReais(centavos) {
  return 'R$ ' + (Number(centavos || 0) / 100)
    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.API = API;
window.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
window.Sessao = Sessao;
window.chamar = chamar;
window.emReais = emReais;
