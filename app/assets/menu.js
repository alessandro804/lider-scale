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
        '<div class="sb-pessoa"><div class="bolha">' + iniciais + '</div>' +
          '<div><div class="quem">' + nome + '</div>' +
          '<div class="papel">' + papelNaTela + '</div></div></div>' +
        '<div class="sb-item" id="menuSair">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>' + t('menu.sair') + '</div>' +
        '<div class="sb-idiomas">' +
          Idioma.IDIOMAS.map(function (i) {
            return '<button class="sb-lang' + (i.id === Idioma.escolhido() ? ' atual' : '') +
                   '" data-lang="' + i.id + '" title="' + i.nome + '">' + i.bandeira + '</button>';
          }).join('') +
        '</div>' +
      '</div>';

    document.querySelectorAll('.sb-lang').forEach(function (b) {
      b.addEventListener('click', () => Idioma.trocar(b.dataset.lang));
    });

    document.getElementById('menuSair').addEventListener('click', async function () {
      try { await chamar('/auth/sair', { method: 'POST' }); } catch (e) {}
      Sessao.limpar();
      window.location.href = base + 'login/';
    });
  },
};

window.Menu = Menu;
