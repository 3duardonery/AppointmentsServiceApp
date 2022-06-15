export abstract class StaticLabels {
  static readonly labels = [
    {
      page: 'footer_text_value',
      value: 'Agendamento Online 2022',
    },
    {
      page: 'login_toast_message_error',
      value: 'Usuário/Senha inválidos',
    },
  ];

  static readonly FOOTER_TEXT_VALUE: string = 'Agendamento Online 2022';
  static readonly LOGIN_TOAST_MESSAGE_ERROR: string = 'Usuário/Senha inválidos';
  static readonly LOGIN_H1_TITLE_MESSAGE: string =
    'Bem vindo ao Agendamento Online';
  static readonly LOGIN_H4_MESSAGE: string =
    'Sistema de gerenciamento de agendamentos de profisisonal/cliente';
}
