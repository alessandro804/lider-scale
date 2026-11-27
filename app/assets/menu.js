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
};

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
        html += '<div class="sb-item sb-em-breve" title="em breve">' + icone +
                t('menu.' + it.id) + '<span class="sb-breve">' + t('menu.embreve') + '</span></div>';
        continue;
      }

      const destino = it.id === 'inicio' ? base : base + it.id + '/';
      html += '<a href="' + destino + '" class="sb-item' + (it.id === atual ? ' ativo' : '') + '">' +
        icone + t('menu.' + it.id) + '</a>';
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
        '<div class="sb-item" id="menuSair">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>' + t('menu.sair') + '</div>' +
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
          '<div class="gota gota-larga" id="gotaPessoa">' +
            '<div class="gota-quem">' + nome + '</div>' +
            '<div class="gota-email">' + (u.email || '') + '</div>' +
            '<div class="gota-papel">' + papelNaTela + '</div>' +
            '<div class="gota-risca"></div>' +
            '<button class="gota-item sair" id="gotaSair">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>' +
              t('menu.sair') + '</button>' +
          '</div>' +
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
      document.addEventListener('click', () => fecharGotas());
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharGotas(); });
      document.querySelectorAll('.gota').forEach(function (g) {
        g.addEventListener('click', (e) => e.stopPropagation());
      });

      document.querySelectorAll('#gotaIdioma .gota-item').forEach(function (b) {
        b.addEventListener('click', () => Idioma.trocar(b.dataset.lang));
      });
      document.getElementById('gotaSair').addEventListener('click', sair);
    }

    async function sair() {
      try { await chamar('/auth/sair', { method: 'POST' }); } catch (e) {}
      Sessao.limpar();
      window.location.href = base + 'login/';
    }
    document.getElementById('menuSair').addEventListener('click', sair);
  },
};

window.Menu = Menu;
