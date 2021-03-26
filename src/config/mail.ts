interface IMalConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'naotenho@naotenhodominio.com.br', // subistituir por domino válido
      name: 'Não tenho do não tenho o Domino', // subistituir nome real volgo Equipe GoBarber
    },
  },
} as IMalConfig;
