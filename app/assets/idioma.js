// ═══════════════════════════════════════════════════════════════════════════
// IDIOMA · portugues, ingles e espanhol
// ═══════════════════════════════════════════════════════════════════════════
// ★★★★★ TODO TEXTO DE TELA PASSA POR AQUI. Texto escrito direto no HTML de
//   uma tela so fica em portugues para sempre, e ninguem descobre ate um
//   cliente estrangeiro abrir aquela tela. A regra: se a pessoa le, esta
//   neste arquivo.
//
// ★★★★ A CHAVE DESCREVE O LUGAR, nao o texto em portugues. Usar a frase
//   portuguesa como chave parece pratico ate o dia em que ela muda: ai ou se
//   troca a chave nas tres linguas, ou a chave passa a mentir.
//
// ★★★ O QUE FALTA CAI NO PORTUGUES, nunca na chave crua. Tela mostrando
//   `op.lista.vazia` e pior que tela em outro idioma: a primeira parece
//   defeito, a segunda parece tela.
'use strict';

const IDIOMAS = [
  { id: 'pt', nome: 'Portugues', bandeira: 'BR' },
  { id: 'en', nome: 'English',   bandeira: 'US' },
  { id: 'es', nome: 'Espanol',   bandeira: 'ES' },
];

const TEXTOS = {
  pt: {
    'menu.comercial': 'Comercial',
    'menu.configuracao': 'Configuracao',
    'menu.plataforma': 'Plataforma',
    'menu.inicio': 'Inicio',
    'menu.oportunidades': 'Oportunidades',
    'menu.propostas': 'Propostas',
    'menu.catalogo': 'Catalogo',
    'menu.comissoes': 'Comissoes',
    'menu.equipe': 'Equipe',
    'menu.contas': 'Contas',
    'menu.planos': 'Planos',
    'menu.tickets': 'Tickets',
    'menu.disparos': 'Mensagens',
    'menu.saude': 'Saude',
    'menu.sair': 'Sair',
    'menu.embreve': 'em breve',
    'menu.idioma': 'Idioma',

    'papel.super_adm': 'Super ADM',
    'papel.dono': 'Dono da conta',
    'papel.gestor': 'Gestor',
    'papel.closer': 'Closer',
    'papel.sdr': 'SDR',

    'inicio.propostas_enviadas': 'Propostas enviadas',
    'inicio.aguardando': 'Aguardando aceite',
    'inicio.contratado': 'Contratado no mes',
    'inicio.recebido': 'Recebido no mes',
    'inicio.nenhuma': 'nenhuma ainda',
    'inicio.nada_parado': 'nada parado',
    'inicio.sem_venda': 'nenhuma venda ainda',
    'inicio.sem_pagamento': 'nenhum pagamento ainda',
    'inicio.comecar': 'Para comecar',
    'inicio.comecar_sub': 'Tres passos ate a primeira proposta no ar.',
    'inicio.passo1': 'Conta criada',
    'inicio.passo1_sub': 'Sua conta esta ativa e voce e o dono dela.',
    'inicio.passo2': 'Monte seu catalogo',
    'inicio.passo2_sub': 'Cadastre o que voce vende, com preco, sinal e as etapas de entrega.',
    'inicio.passo3': 'Crie a equipe',
    'inicio.passo3_sub': 'Convide gestor, closer e SDR. Cada um enxerga so o que lhe diz respeito.',
    'inicio.cortesia_dias': 'dias de cortesia no plano completo.',
    'inicio.cortesia_texto': 'Voce usa o sistema inteiro durante o teste. Para seguir sem parar depois, e so ativar a assinatura.',
    'inicio.vencida_titulo': 'Seus dados continuam todos aqui.',
    'inicio.vencida_texto': 'Ativando a assinatura, voce volta a montar proposta com sinal no mesmo link, recebe o aviso no WhatsApp quando o dinheiro cair e para de controlar comissao em planilha.',

    'op.titulo': 'Oportunidades',
    'op.nova': 'Nova oportunidade',
    'op.vazia': 'Nenhuma oportunidade ainda',
    'op.vazia_sub': 'Cadastre a primeira e monte uma proposta em menos de um minuto.',
    'op.sem_contato': 'sem contato',
    'op.quem': 'Quem e o cliente',
    'op.quem_sub': 'So o nome da empresa e obrigatorio. O resto da para completar depois.',
    'op.empresa': 'Empresa',
    'op.empresa_dica': 'Nome da empresa do cliente',
    'op.contato': 'Pessoa de contato',
    'op.contato_dica': 'Quem decide',
    'op.whatsapp': 'WhatsApp',
    'op.email': 'E-mail',
    'op.documento': 'CPF ou CNPJ',
    'op.origem': 'Como chegou',
    'op.escolher': '— escolher —',
    'op.origem.indicacao': 'Indicacao',
    'op.origem.instagram': 'Instagram',
    'op.origem.google': 'Google',
    'op.origem.prospeccao': 'Prospeccao ativa',
    'op.origem.evento': 'Evento',
    'op.origem.outro': 'Outro',
    'op.voltar': 'Voltar',
    'op.cadastrar': 'Cadastrar',
    'op.cadastrando': 'Cadastrando',
    'op.falta_empresa': 'Informe o nome da empresa do cliente.',

    'prop.montar': 'Montar proposta',
    'prop.montar_para': 'Proposta para',
    'prop.escolha': 'Escolha o que entra. As parcelas saem das etapas de entrega de cada item.',
    'prop.entrada_de': 'entrada de',
    'prop.nada_escolhido': 'Nada escolhido ainda',
    'prop.total': 'Total',
    'prop.validade': 'Vale por quantos dias',
    'prop.observacao': 'Observacoes para o cliente',
    'prop.observacao_dica': 'O que mais ele precisa saber',
    'prop.cancelar': 'Cancelar',
    'prop.montar_enviar': 'Montar e enviar',
    'prop.montando': 'Montando',
    'prop.escolha_item': 'Escolha ao menos um item para a proposta.',
    'prop.enviada': 'Proposta enviada. O link do cliente e:',
    'prop.copiar': 'Copiar o link',
    'prop.copiado': 'Link copiado',
    'prop.selecione': 'Selecione o link acima para copiar',
  },

  en: {
    'menu.comercial': 'Sales',
    'menu.configuracao': 'Settings',
    'menu.plataforma': 'Platform',
    'menu.inicio': 'Home',
    'menu.oportunidades': 'Opportunities',
    'menu.propostas': 'Proposals',
    'menu.catalogo': 'Catalog',
    'menu.comissoes': 'Commissions',
    'menu.equipe': 'Team',
    'menu.contas': 'Accounts',
    'menu.planos': 'Plans',
    'menu.tickets': 'Tickets',
    'menu.disparos': 'Messages',
    'menu.saude': 'Health',
    'menu.sair': 'Sign out',
    'menu.embreve': 'coming soon',
    'menu.idioma': 'Language',

    'papel.super_adm': 'Super admin',
    'papel.dono': 'Account owner',
    'papel.gestor': 'Manager',
    'papel.closer': 'Closer',
    'papel.sdr': 'SDR',

    'inicio.propostas_enviadas': 'Proposals sent',
    'inicio.aguardando': 'Awaiting acceptance',
    'inicio.contratado': 'Contracted this month',
    'inicio.recebido': 'Received this month',
    'inicio.nenhuma': 'none yet',
    'inicio.nada_parado': 'nothing pending',
    'inicio.sem_venda': 'no sales yet',
    'inicio.sem_pagamento': 'no payments yet',
    'inicio.comecar': 'Getting started',
    'inicio.comecar_sub': 'Three steps to your first proposal.',
    'inicio.passo1': 'Account created',
    'inicio.passo1_sub': 'Your account is active and you own it.',
    'inicio.passo2': 'Build your catalog',
    'inicio.passo2_sub': 'Add what you sell, with price, deposit and delivery stages.',
    'inicio.passo3': 'Create your team',
    'inicio.passo3_sub': 'Invite manager, closer and SDR. Each one sees only what concerns them.',
    'inicio.cortesia_dias': 'free days on the full plan.',
    'inicio.cortesia_texto': 'You get the whole system during the trial. To keep going afterwards, just activate your subscription.',
    'inicio.vencida_titulo': 'All your data is still here.',
    'inicio.vencida_texto': 'Activate your subscription to go back to building proposals with deposits on the same link, get a WhatsApp alert when the money lands, and stop tracking commissions in spreadsheets.',

    'op.titulo': 'Opportunities',
    'op.nova': 'New opportunity',
    'op.vazia': 'No opportunities yet',
    'op.vazia_sub': 'Add the first one and build a proposal in under a minute.',
    'op.sem_contato': 'no contact',
    'op.quem': 'Who is the client',
    'op.quem_sub': 'Only the company name is required. The rest can wait.',
    'op.empresa': 'Company',
    'op.empresa_dica': "Client's company name",
    'op.contato': 'Contact person',
    'op.contato_dica': 'Who decides',
    'op.whatsapp': 'WhatsApp',
    'op.email': 'Email',
    'op.documento': 'Tax ID',
    'op.origem': 'How they found you',
    'op.escolher': '— choose —',
    'op.origem.indicacao': 'Referral',
    'op.origem.instagram': 'Instagram',
    'op.origem.google': 'Google',
    'op.origem.prospeccao': 'Outbound',
    'op.origem.evento': 'Event',
    'op.origem.outro': 'Other',
    'op.voltar': 'Back',
    'op.cadastrar': 'Add',
    'op.cadastrando': 'Adding',
    'op.falta_empresa': "Enter the client's company name.",

    'prop.montar': 'Build proposal',
    'prop.montar_para': 'Proposal for',
    'prop.escolha': 'Pick what goes in. Instalments come from each item delivery stages.',
    'prop.entrada_de': 'deposit of',
    'prop.nada_escolhido': 'Nothing selected yet',
    'prop.total': 'Total',
    'prop.validade': 'Valid for how many days',
    'prop.observacao': 'Notes for the client',
    'prop.observacao_dica': 'Anything else they should know',
    'prop.cancelar': 'Cancel',
    'prop.montar_enviar': 'Build and send',
    'prop.montando': 'Building',
    'prop.escolha_item': 'Pick at least one item for the proposal.',
    'prop.enviada': 'Proposal sent. The client link is:',
    'prop.copiar': 'Copy link',
    'prop.copiado': 'Link copied',
    'prop.selecione': 'Select the link above to copy',
  },

  es: {
    'menu.comercial': 'Comercial',
    'menu.configuracao': 'Configuracion',
    'menu.plataforma': 'Plataforma',
    'menu.inicio': 'Inicio',
    'menu.oportunidades': 'Oportunidades',
    'menu.propostas': 'Propuestas',
    'menu.catalogo': 'Catalogo',
    'menu.comissoes': 'Comisiones',
    'menu.equipe': 'Equipo',
    'menu.contas': 'Cuentas',
    'menu.planos': 'Planes',
    'menu.tickets': 'Tickets',
    'menu.disparos': 'Mensajes',
    'menu.saude': 'Estado',
    'menu.sair': 'Salir',
    'menu.embreve': 'proximamente',
    'menu.idioma': 'Idioma',

    'papel.super_adm': 'Super admin',
    'papel.dono': 'Dueno de la cuenta',
    'papel.gestor': 'Gerente',
    'papel.closer': 'Closer',
    'papel.sdr': 'SDR',

    'inicio.propostas_enviadas': 'Propuestas enviadas',
    'inicio.aguardando': 'Esperando aceptacion',
    'inicio.contratado': 'Contratado en el mes',
    'inicio.recebido': 'Recibido en el mes',
    'inicio.nenhuma': 'ninguna todavia',
    'inicio.nada_parado': 'nada pendiente',
    'inicio.sem_venda': 'sin ventas todavia',
    'inicio.sem_pagamento': 'sin pagos todavia',
    'inicio.comecar': 'Para empezar',
    'inicio.comecar_sub': 'Tres pasos hasta la primera propuesta.',
    'inicio.passo1': 'Cuenta creada',
    'inicio.passo1_sub': 'Tu cuenta esta activa y eres el dueno.',
    'inicio.passo2': 'Arma tu catalogo',
    'inicio.passo2_sub': 'Registra lo que vendes, con precio, anticipo y etapas de entrega.',
    'inicio.passo3': 'Crea tu equipo',
    'inicio.passo3_sub': 'Invita gerente, closer y SDR. Cada uno ve solo lo que le corresponde.',
    'inicio.cortesia_dias': 'dias de cortesia en el plan completo.',
    'inicio.cortesia_texto': 'Usas el sistema entero durante la prueba. Para seguir despues, solo activa tu suscripcion.',
    'inicio.vencida_titulo': 'Todos tus datos siguen aqui.',
    'inicio.vencida_texto': 'Activando la suscripcion vuelves a armar propuestas con anticipo en el mismo enlace, recibes el aviso por WhatsApp cuando entre el dinero y dejas de controlar comisiones en planillas.',

    'op.titulo': 'Oportunidades',
    'op.nova': 'Nueva oportunidad',
    'op.vazia': 'Todavia no hay oportunidades',
    'op.vazia_sub': 'Registra la primera y arma una propuesta en menos de un minuto.',
    'op.sem_contato': 'sin contacto',
    'op.quem': 'Quien es el cliente',
    'op.quem_sub': 'Solo el nombre de la empresa es obligatorio. El resto puede esperar.',
    'op.empresa': 'Empresa',
    'op.empresa_dica': 'Nombre de la empresa del cliente',
    'op.contato': 'Persona de contacto',
    'op.contato_dica': 'Quien decide',
    'op.whatsapp': 'WhatsApp',
    'op.email': 'Correo',
    'op.documento': 'Identificacion fiscal',
    'op.origem': 'Como llego',
    'op.escolher': '— elegir —',
    'op.origem.indicacao': 'Recomendacion',
    'op.origem.instagram': 'Instagram',
    'op.origem.google': 'Google',
    'op.origem.prospeccao': 'Prospeccion activa',
    'op.origem.evento': 'Evento',
    'op.origem.outro': 'Otro',
    'op.voltar': 'Volver',
    'op.cadastrar': 'Registrar',
    'op.cadastrando': 'Registrando',
    'op.falta_empresa': 'Indica el nombre de la empresa del cliente.',

    'prop.montar': 'Armar propuesta',
    'prop.montar_para': 'Propuesta para',
    'prop.escolha': 'Elige lo que entra. Las cuotas salen de las etapas de entrega de cada item.',
    'prop.entrada_de': 'anticipo de',
    'prop.nada_escolhido': 'Nada elegido todavia',
    'prop.total': 'Total',
    'prop.validade': 'Vale por cuantos dias',
    'prop.observacao': 'Observaciones para el cliente',
    'prop.observacao_dica': 'Que mas necesita saber',
    'prop.cancelar': 'Cancelar',
    'prop.montar_enviar': 'Armar y enviar',
    'prop.montando': 'Armando',
    'prop.escolha_item': 'Elige al menos un item para la propuesta.',
    'prop.enviada': 'Propuesta enviada. El enlace del cliente es:',
    'prop.copiar': 'Copiar el enlace',
    'prop.copiado': 'Enlace copiado',
    'prop.selecione': 'Selecciona el enlace de arriba para copiar',
  },
};

const CHAVE = 'scale_idioma';

function escolhido() {
  const guardado = localStorage.getItem(CHAVE);
  if (guardado && TEXTOS[guardado]) return guardado;
  // ★★ o navegador da o palpite inicial; a escolha da pessoa manda sempre
  const nav = String(navigator.language || 'pt').slice(0, 2).toLowerCase();
  return TEXTOS[nav] ? nav : 'pt';
}

function t(chave, valores) {
  const lang = escolhido();
  let s = (TEXTOS[lang] && TEXTOS[lang][chave]);
  if (s == null) s = TEXTOS.pt[chave];          // falta traducao: cai no portugues
  if (s == null) s = chave;                      // chave que ninguem escreveu
  if (valores) {
    for (const k of Object.keys(valores)) s = s.split('{' + k + '}').join(String(valores[k]));
  }
  return s;
}

function trocar(id) {
  if (!TEXTOS[id]) return;
  localStorage.setItem(CHAVE, id);
  window.location.reload();
}

window.Idioma = { t, escolhido, trocar, IDIOMAS, TEXTOS };
window.t = t;
