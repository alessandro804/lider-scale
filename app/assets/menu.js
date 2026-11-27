// ═══════════════════════════════════════════════════════════════════════════
// O MENU LATERAL · um lugar so, para todas as telas
// ═══════════════════════════════════════════════════════════════════════════
// ★★★★ SAIU DO index.html quando a segunda tela apareceu. Menu copiado em
//   cada arquivo significa que acrescentar uma tela exige editar todas as
//   outras, e a que ficar para tras mostra um menu diferente das demais.
//
// ★★★ A TELA ESCONDER O ITEM NAO E A PROTECAO: quem decide e o servidor, a
//   cada chamada. Isto aqui e so para a pessoa nao ver porta que nao abre.
'use strict';

const MENU = [
  { grupo: 'comercial' },
  { id:'inicio',        papeis:'*' },
  { id:'oportunidades', papeis:'*' },
  { id:'propostas',     papeis:'*', pronto: false },
  { grupo: 'configuracao' },
  { id:'catalogo',      papeis:['super_adm','dono','gestor'], pronto: false },
  { id:'comissoes',     papeis:['super_adm','dono','gestor'], pronto: false },
  { id:'equipe',        papeis:['super_adm','dono'], pronto: false },
  { grupo: 'plataforma', papeis:['super_adm'] },
  { id:'contas',        papeis:['super_adm'], pronto: false },
  { id:'planos',        papeis:['super_adm'], pronto: false },
  { id:'tickets',       papeis:['super_adm'], pronto: false },
  { id:'disparos',      papeis:['super_adm'], pronto: false },
  { id:'saude',         papeis:['super_adm'], pronto: false },
  // ★★★★ A PRIMEIRA TELA DE PLATAFORMA QUE FICA PRONTA, e e esta por um
  //   motivo pratico: sem o certificado do banco la dentro, o Pix nao
  //   recebe, e ate agora o unico jeito de pôr o certificado no lugar era
  //   abrir terminal no servidor.
  { id:'integracoes',   papeis:['super_adm'] },
];

const ICONES = {
  inicio:'<path d="M3 11l9-8 9 8"></path><path d="M5 10v10h14V10"></path>',
  oportunidades:'<path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>',
  propostas:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path>',
  catalogo:'<path d="M20 7H4"></path><path d="M20 12H4"></path><path d="M20 17H4"></path>',
  comissoes:'<path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
  equipe:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>',
  contas:'<path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 21v-6h6v6"></path>',
  planos:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><path d="M7 7h.01"></path>',
  tickets:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
  disparos:'<path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path>',
  saude:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>',
  integracoes:'<path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8z"></path><path d="M15.5 7.5l3 3L22 7l-3-3"></path>',
};

// ═══════════════════════════════════════════════════════════════════════════
// O PAINEL DA PESSOA · um conteudo so, usado no topo e no pe
// ═══════════════════════════════════════════════════════════════════════════
// ★★★★ ELE ABRE EM DOIS LUGARES e tem de ser identico nos dois. Escrito duas
//   vezes, basta acrescentar um item num deles para os dois passarem a
//   mostrar coisas diferentes conforme onde a pessoa clicou, e ninguem
//   entende por que.
function gotaDaPessoa() {
  const u = Sessao.usuario();
  const nome = u.nome || 'Usuario';
  const papel = t('papel.' + (u.papel || 'closer'));

  // ★★★ os itens que ainda nao existem aparecem apagados, nunca clicaveis.
  //   Item que leva a lugar nenhum ensina a pessoa a desconfiar do menu.
  const emBreve = [
    ['planos', '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>'],
    ['perfil', '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'],
    ['ajuda',  '<circle cx="12" cy="12" r="10"></circle><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>'],
  ].map(function (x) {
    return '<div class="gota-item apagado">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      x[1] + '</svg>' + t('pessoa.' + x[0]) +
      '<svg class="gota-breve" width="13" height="13" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="10"></circle><path d="M12 7v5l3 2"></path></svg></div>';
  }).join('');

  return '<div class="gota-quem">' + nome + '</div>' +
    '<div class="gota-email">' + (u.email || '') + '</div>' +
    '<div class="gota-papel">' + papel + '</div>' +
    '<div class="gota-risca"></div>' +
    emBreve +
    '<div class="gota-risca"></div>' +
    '<button class="gota-item sair" data-sair="1">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>' +
      t('menu.sair') + '</button>';
}

const Menu = {
  montar(atual) {
    const papel = (Sessao.usuario().papel) || 'closer';
    // ★★★★ A VOLTA ATE /app/ E CONTADA, nao chutada. A versao anterior
    //   assumia um nivel so, e em /app/oportunidades/nova/ a logo e todos os
    //   links do menu apontavam um nivel acima do que deviam: a imagem some
    //   e os itens levam para lugar nenhum. Peguei olhando a tela, porque
    //   imagem quebrada nao da erro no console nem falha em teste de rota.
    const partes = (window.location.pathname.split('/app/')[1] || '').split('/').filter(Boolean);
    // ★★ o ultimo pedaco com ponto e um arquivo, nao uma pasta: /app/index.html
    //   esta na raiz do app, e contar o arquivo mandaria um nivel a mais.
    if (partes.length && partes[partes.length - 1].indexOf('.') >= 0) partes.pop();
    const base = '../'.repeat(partes.length);
    let html = '';
    for (const it of MENU) {
      if (it.grupo) {
        if (it.papeis && it.papeis.indexOf(papel) < 0) continue;
        html += '<div class="sb-grupo">' + t('menu.' + it.grupo) + '</div>';
        continue;
      }
      if (it.papeis !== '*' && it.papeis.indexOf(papel) < 0) continue;

      const icone = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONES[it.id] || '') + '</svg>';

      // ★★★★ TELA QUE AINDA NAO EXISTE NAO VIRA LINK. Link para pagina que
      //   nao foi publicada leva a um 404 do proprio GitHub, em ingles e sem
      //   nada do sistema na tela: a pessoa acha que quebrou tudo. Apagado e
      //   com a palavra "em breve" ela entende que e so o que falta chegar.
      if (it.pronto === false) {
        // ★★★★ ICONE, NAO ETIQUETA DE TEXTO. "em breve" cabia na largura da
        //   lateral; "coming soon" e "proximamente" nao, e o item era
        //   cortado em duas das tres linguas. Largura fixa com texto
        //   traduzivel dentro so funciona ate alguem traduzir. O `title`
        //   conta o que o icone quer dizer, no idioma de quem le.
        html += '<div class="sb-item sb-em-breve" title="' + t('menu.embreve') + '">' +
                '<span class="sb-ico">' + icone + '</span>' +
                '<span class="sb-txt">' + t('menu.' + it.id) + '</span>' +
                '<svg class="sb-breve" width="13" height="13" viewBox="0 0 24 24" fill="none" ' +
                'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="12" cy="12" r="10"></circle><path d="M12 7v5l3 2"></path></svg></div>';
        continue;
      }

      const destino = it.id === 'inicio' ? base : base + it.id + '/';
      html += '<a href="' + destino + '" class="sb-item' + (it.id === atual ? ' ativo' : '') + '">' +
        '<span class="sb-ico">' + icone + '</span>' +
        '<span class="sb-txt">' + t('menu.' + it.id) + '</span></a>';
    }

    const u = Sessao.usuario();
    const nome = u.nome || 'Usuario';
    const iniciais = nome.split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase() || '?';
    const papelNaTela = t('papel.' + (u.papel || 'closer'));

    document.getElementById('sidebar').innerHTML =
      '<div class="sb-marca"><img src="' + base + 'assets/logo-128.png" alt="">' +
        '<span>Lider <i>Scale</i></span></div>' +
      '<nav class="sb-menu">' + html + '</nav>' +
      '<div class="sb-rodape">' +
        '<div class="canto canto-pe">' +
          '<button class="sb-pessoa" id="btnPessoaPe">' +
            '<span class="bolha">' + iniciais + '</span>' +
            '<span class="sb-pessoa-txt"><span class="quem">' + nome + '</span>' +
            '<span class="papel">' + papelNaTela + '</span></span>' +
          '</button>' +
          '<div class="gota gota-larga gota-acima" id="gotaPessoaPe">' + gotaDaPessoa() + '</div>' +
        '</div>' +
      '</div>';

    // ═══════════════════════════════════════════════════════════════════
    // O CANTO SUPERIOR DIREITO · globo e pessoa, como no Lider 10
    // ═══════════════════════════════════════════════════════════════════
    // ★★★★ O MESMO CANTO EM TODA TELA. Controle que muda de lugar conforme
    //   a pagina obriga a pessoa a procurar de novo a cada tela; o canto
    //   superior direito e onde a mao ja vai sozinha.
    const topoDir = document.querySelector('.topo-dir');
    if (topoDir) {
      topoDir.innerHTML =
        '<div class="canto">' +
          '<button class="canto-btn" id="btnGlobo" title="' + t('menu.idioma') + '" aria-label="' + t('menu.idioma') + '">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="12" cy="12" r="10"></circle>' +
              '<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>' +
              '<path d="M2 12h20"></path>' +
            '</svg>' +
          '</button>' +
          '<div class="gota" id="gotaIdioma">' +
            '<div class="gota-titulo">' + t('menu.idioma') + '</div>' +
            Idioma.IDIOMAS.map(function (i) {
              return '<button class="gota-item' + (i.id === Idioma.escolhido() ? ' atual' : '') +
                '" data-lang="' + i.id + '">' +
                '<span class="gota-sigla">' + i.bandeira + '</span>' + i.nome +
                (i.id === Idioma.escolhido()
                  ? '<svg class="gota-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg>'
                  : '') +
                '</button>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="canto">' +
          '<button class="canto-pessoa" id="btnPessoa" aria-label="' + nome + '">' +
            '<span class="bolha">' + iniciais + '</span>' +
          '</button>' +
          '<div class="gota gota-larga" id="gotaPessoa">' + gotaDaPessoa() + '</div>' +
        '</div>';

      // ★★★ so uma gota aberta por vez, e clique fora fecha. Duas abertas ao
      //   mesmo tempo se sobrepoem, e gota que nao fecha vira obstaculo.
      function fecharGotas(menos) {
        document.querySelectorAll('.gota').forEach(function (g) {
          if (g !== menos) g.classList.remove('aberta');
        });
      }
      function ligarGota(botao, gota) {
        document.getElementById(botao).addEventListener('click', function (e) {
          e.stopPropagation();
          const g = document.getElementById(gota);
          const estava = g.classList.contains('aberta');
          fecharGotas();
          if (!estava) g.classList.add('aberta');
        });
      }
      ligarGota('btnGlobo', 'gotaIdioma');
      ligarGota('btnPessoa', 'gotaPessoa');
      ligarGota('btnPessoaPe', 'gotaPessoaPe');
      document.addEventListener('click', () => fecharGotas());
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharGotas(); });
      document.querySelectorAll('.gota').forEach(function (g) {
        g.addEventListener('click', (e) => e.stopPropagation());
      });

      document.querySelectorAll('#gotaIdioma .gota-item').forEach(function (b) {
        b.addEventListener('click', () => Idioma.trocar(b.dataset.lang));
      });
      document.querySelectorAll('[data-sair]').forEach((b) => b.addEventListener('click', sair));
    }

    async function sair() {
      try { await chamar('/auth/sair', { method: 'POST' }); } catch (e) {}
      Sessao.limpar();
      window.location.href = base + 'login/';
    }

  },
};

window.Menu = Menu;
