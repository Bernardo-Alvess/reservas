export const UserAddedToRestaurantEmailTemplate = ({
  userName,
  userEmail,
  restaurantName,
  restaurantType,
  restaurantAddress,
  userRole,
  temporaryPassword,
}: {
  userName: string;
  userEmail: string;
  restaurantName: string;
  restaurantType: string;
  restaurantAddress: string;
  userRole: 'admin' | 'funcionario';
  temporaryPassword: string;
}) => {
  const roleLabel = userRole === 'admin' ? 'Administrador' : 'Funcionário';

  return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao ReservaFácil</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 30px;
          }
          .welcome-message {
            background: #f8f9ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          .restaurant-info {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #e2e8f0;
          }
          .restaurant-info h3 {
            color: #1e293b;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #64748b;
          }
          .info-value {
            color: #1e293b;
          }
          .credentials-box {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .credentials-box h4 {
            color: #92400e;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .credential-item {
            margin: 12px 0;
          }
          .credential-label {
            font-weight: 600;
            color: #92400e;
          }
          .credential-value {
            background: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            border: 1px solid #d97706;
            margin-top: 4px;
            word-break: break-all;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .btn {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
          }
          .btn:hover {
            transform: translateY(-2px);
          }
          .security-note {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
          .security-note p {
            margin: 0;
            color: #dc2626;
            font-size: 14px;
          }
          .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
          }
          .role-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            ${
              userRole === 'admin'
                ? 'background: #dbeafe; color: #1e40af;'
                : 'background: #f3f4f6; color: #374151;'
            }
          }
          @media (max-width: 600px) {
            body { padding: 10px; }
            .content { padding: 20px; }
            .info-row { flex-direction: column; gap: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ ReservaFácil</h1>
            <p style="margin: 0; opacity: 0.9;">Bem-vindo à nossa plataforma!</p>
          </div>
          
          <div class="content">
            <div class="welcome-message">
              <h2 style="margin-top: 0; color: #667eea;">Olá, ${userName}!</h2>
              <p style="margin-bottom: 0;">
                Você foi adicionado como <span class="role-badge">${roleLabel}</span> 
                ao restaurante <strong>${restaurantName}</strong> no sistema ReservaFácil.
              </p>
            </div>
            
            <div class="restaurant-info">
              <h3>
                🏪 Informações do Restaurante
              </h3>
              <div class="info-row">
                <span class="info-label">Nome:</span>
                <span class="info-value">${restaurantName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Tipo de Culinária:</span>
                <span class="info-value">${restaurantType}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Endereço:</span>
                <span class="info-value">${restaurantAddress}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Sua Função:</span>
                <span class="info-value">${roleLabel}</span>
              </div>
            </div>
            
            <div class="credentials-box">
              <h4>
                🔐 Suas Credenciais de Acesso
              </h4>
              <div class="credential-item">
                <div class="credential-label">Email de Login:</div>
                <div class="credential-value">${userEmail}</div>
              </div>
              <div class="credential-item">
                <div class="credential-label">Senha Temporária:</div>
                <div class="credential-value">${temporaryPassword}</div>
              </div>
            </div>
            
            <div class="security-note">
              <p>
                <strong>⚠️ Importante:</strong> Por segurança, altere sua senha no primeiro acesso. 
                Esta senha temporária expira em 24 horas.
              </p>
            </div>
            
            <div class="button-container">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="btn">
                Acessar Sistema
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <h4>📋 Próximos Passos:</h4>
              <ol style="color: #64748b; line-height: 1.8;">
                <li>Acesse o sistema usando suas credenciais</li>
                <li>Altere sua senha temporária</li>
                <li>Complete seu perfil</li>
                <li>Explore as funcionalidades disponíveis</li>
              </ol>
            </div>
            
            <p style="color: #64748b; margin-top: 30px;">
              Se você tiver dúvidas ou precisar de ajuda, entre em contato com o administrador 
              do restaurante ou nossa equipe de suporte.
            </p>
          </div>
          
          <div class="footer">
            <p>
              Este email foi enviado automaticamente pelo sistema ReservaFácil.<br>
              Se você não esperava receber este email, entre em contato conosco.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const ReservationAutoCancelledEmailTemplate = ({
  userName,
  restaurantName,
  reservationDate,
  reservationTime,
  guests,
}: {
  userName: string;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva Cancelada Automaticamente</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
        .title { font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 20px; }
        .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
        .reservation-details { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .detail-label { font-weight: bold; color: #374151; }
        .detail-value { color: #6b7280; }
        .warning-box { background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🍽️ ReservaFácil</div>
            <h1 class="title">⏰ Reserva Cancelada Automaticamente</h1>
        </div>
        
        <p class="description">
            Olá ${userName},
        </p>
        
        <p class="description">
            Infelizmente, sua reserva foi <strong>cancelada automaticamente</strong> porque não foi confirmada até 15 minutos antes do horário marcado.
        </p>
        
        <div class="reservation-details">
            <h3 style="margin-top: 0; color: #dc2626;">Detalhes da Reserva Cancelada</h3>
            <div class="detail-row">
                <span class="detail-label">Restaurante: </span>
                <span class="detail-value">${restaurantName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Data: </span>
                <span class="detail-value">${reservationDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Horário: </span>
                <span class="detail-value">${reservationTime}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Número de Pessoas: </span>
                <span class="detail-value">${guests} ${guests === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
        </div>
        
        <div class="warning-box">
            <h3 style="margin-top: 0; color: #f59e0b;">📋 Por que isso aconteceu?</h3>
            <p style="margin: 10px 0; color: #6b7280;">
                Para garantir que as mesas sejam utilizadas de forma eficiente, todas as reservas devem ser confirmadas até <strong>15 minutos antes</strong> do horário marcado.
            </p>
            <p style="margin: 10px 0; color: #6b7280;">
                Como sua reserva não foi confirmada dentro deste prazo, ela foi automaticamente cancelada para liberar a mesa para outros clientes.
            </p>
        </div>
        
        <p class="description">
            Não se preocupe! Caso ainda deseje utilizar a sua reserva, entre em contato diretamente com o restaurante para reativar sua reserva.
        </p>

        <div class="footer">
            <p>Agradecemos sua compreensão e esperamos vê-lo(a) em breve!</p>
            <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;

export const OTPEmailTemplate = ({
  code,
  userName,
}: {
  code: string;
  userName: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Código de Verificação</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
          .code-container { background-color: #f8fafc; border: 2px dashed #2563eb; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0; }
          .code { font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px; margin: 20px 0; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">Código de Verificação</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Use o código abaixo para fazer login na sua conta:
          </p>
          
          <div class="code-container">
              <div class="code">${code}</div>
          </div>
          
          <div class="warning">
              <strong>⚠️ Importante:</strong> Nunca compartilhe este código com ninguém. Nossa equipe nunca pedirá seu código por telefone ou email.
          </div>
          
          <p class="description">
              Se você não solicitou este código, pode ignorar este email com segurança.
          </p>
          
          <div class="footer">
              <p>Este é um email automático, não responda a esta mensagem.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;

export const ReservationCreatedEmailTemplate = ({
  userName,
  restaurantName,
  reservationDate,
  reservationTime,
  guests,
  confirmLink,
  cancelLink,
}: {
  userName: string;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  confirmLink: string;
  cancelLink: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reserva Efetuada com Sucesso</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #059669; margin-bottom: 20px; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .reservation-details { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .action-section { text-align: center; margin: 30px 0; padding: 20px; background-color: #fef3c7; border-radius: 8px; border: 1px solid #fde68a; }
          .action-buttons { margin: 20px 0; }
          .button-confirm { display: inline-block; background-color: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; }
          .button-cancel { display: inline-block; background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; }
          .button-confirm:hover { background-color: #047857; }
          .button-cancel:hover { background-color: #b91c1c; }
          .warning { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0; color: #991b1b; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">✅ Reserva Efetuada com Sucesso!</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Sua reserva foi efetuada com sucesso! Agora você precisa <strong>confirmar ou cancelar</strong> sua reserva para garantir que tudo esteja correto.
          </p>
          
          <div class="reservation-details">
              <h3 style="margin-top: 0; color: #059669;">Detalhes da Sua Reserva</h3>
              <div class="detail-row">
                  <span class="detail-label">Restaurante:</span>
                  <span class="detail-value">${restaurantName}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Data:</span>
                  <span class="detail-value">${reservationDate}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Horário:</span>
                  <span class="detail-value">${reservationTime}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Número de Pessoas:</span>
                  <span class="detail-value">${guests} ${guests === 1 ? 'pessoa' : 'pessoas'}</span>
              </div>
          </div>
          
          <div class="action-section">
              <h3 style="margin-top: 0; color: #f59e0b;">⚠️ Ação Necessária</h3>
              <p style="margin: 15px 0; color: #374151; font-weight: bold;">
                  Você deve confirmar ou cancelar sua reserva até <strong>15 minutos antes</strong> do horário marcado.
              </p>
              <p style="margin: 15px 0; color: #6b7280;">
                  Caso não tome nenhuma ação, sua reserva será automaticamente cancelada.
              </p>
              
              <div class="action-buttons">
                  <a href="${confirmLink}" class="button-confirm">✅ Confirmar Reserva</a>
                  <a href="${cancelLink}" class="button-cancel">❌ Cancelar Reserva</a>
              </div>
          </div>
          
          <div class="warning">
              <strong>📋 Importante:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Confirme sua presença para garantir sua mesa</li>
                  <li>Em caso de atraso, entre em contato com o restaurante</li>
                  <li>Você pode alterar ou cancelar a reserva a qualquer momento antes do prazo limite</li>
              </ul>
          </div>
          
          <p class="description">
              Agradecemos por escolher o ReservaFácil! Esperamos que tenha uma experiência gastronômica incrível! 🍽️
          </p>
          
          <div class="footer">
              <p>Precisa de ajuda? Entre em contato conosco através do nosso suporte.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;

export const ForgotPasswordEmailTemplate = ({
  resetLink,
  userName,
}: {
  resetLink: string;
  userName: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperação de Senha</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .button:hover { background-color: #1d4ed8; }
          .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">Recuperação de Senha</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha:
          </p>
          
          <div style="text-align: center;">
              <a href="${resetLink}" class="button">Redefinir Senha</a>
          </div>
          
          <p class="description">
              Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
          </p>
          
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 6px; word-break: break-all; color: #2563eb;">
              ${resetLink}
          </p>
          
          <div class="warning">
              <strong>⚠️ Importante:</strong> Este link expira em 1 hora por motivos de segurança.
          </div>
          
          <p class="description">
              Se você não solicitou a redefinição de senha, pode ignorar este email com segurança. Sua senha atual permanecerá inalterada.
          </p>
          
          <div class="footer">
              <p>Este é um email automático, não responda a esta mensagem.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;

export const ReservationCancelledEmailTemplate = ({
  userName,
  restaurantName,
  reservationDate,
  reservationTime,
}: {
  userName: string;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reserva Cancelada</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 20px; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .reservation-details { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">❌ Reserva Cancelada</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Infelizmente, o restaurante <strong>${restaurantName}</strong> precisou cancelar sua reserva. Veja os detalhes abaixo:
          </p>
          
          <div class="reservation-details">
              <h3 style="margin-top: 0; color: #dc2626;">Detalhes da Reserva Cancelada</h3>
              <div class="detail-row">
                  <span class="detail-label">Restaurante:</span>
                  <span class="detail-value">${restaurantName}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Data:</span>
                  <span class="detail-value">${reservationDate}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Horário:</span>
                  <span class="detail-value">${reservationTime}</span>
              </div>
          </div>
          
          <p class="description">
              Pedimos desculpas pelo inconveniente. Que tal fazer uma nova reserva em outro horário ou restaurante?
          </p>
          
          <div style="text-align: center;">
              <a href="#" class="button">Fazer Nova Reserva</a>
          </div>
          
          <p class="description">
              Se tiver alguma dúvida, entre em contato conosco através do nosso suporte.
          </p>
          
          <div class="footer">
              <p>Este é um email automático, não responda a esta mensagem.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;

export const ReservationConfirmedEmailTemplate = ({
  userName,
  restaurantName,
  reservationDate,
  reservationTime,
  guests,
  tableNumber,
}: {
  userName: string;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  tableNumber?: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reserva Confirmada</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #059669; margin-bottom: 20px; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .reservation-details { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .qr-code { text-align: center; margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">✅ Reserva Confirmada!</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Sua reserva foi confirmada com sucesso! Estamos ansiosos para recebê-lo(a).
          </p>
          
          <div class="reservation-details">
              <h3 style="margin-top: 0; color: #059669;">Detalhes da Sua Reserva</h3>
              <div class="detail-row">
                  <span class="detail-label">Restaurante:</span>
                  <span class="detail-value">${restaurantName}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Data:</span>
                  <span class="detail-value">${reservationDate}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Horário:</span>
                  <span class="detail-value">${reservationTime}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Número de Pessoas:</span>
                  <span class="detail-value">${guests} ${guests === 1 ? 'pessoa' : 'pessoas'}</span>
              </div>
              ${
                tableNumber
                  ? `
              <div class="detail-row">
                  <span class="detail-label">Mesa:</span>
                  <span class="detail-value">${tableNumber}</span>
              </div>
              `
                  : ''
              }
          </div>
          
          <div class="qr-code">
              <p style="margin: 0 0 15px 0; font-weight: bold; color: #374151;">Código QR da Reserva</p>
              <div style="width: 150px; height: 150px; background-color: #e5e7eb; margin: 0 auto; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6b7280;">
                  [QR CODE]
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #6b7280;">Apresente este código na chegada</p>
          </div>
          
          <p class="description">
              <strong>Importante:</strong> Por favor, chegue pontualmente. Em caso de atraso superior a 15 minutos, sua reserva poderá ser cancelada.
          </p>
          
          <div style="text-align: center;">
              <a href="#" class="button">Gerenciar Reserva</a>
          </div>
          
          <div class="footer">
              <p>Precisa cancelar ou alterar? Acesse suas reservas no nosso app.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;

export const ReservationReminderEmailTemplate = ({
  userName,
  restaurantName,
  reservationDate,
  reservationTime,
  restaurantAddress,
  restaurantPhone,
  cancelReserveLink,
}: {
  userName: string;
  restaurantName: string;
  reservationDate: string;
  reservationTime: string;
  restaurantAddress: string;
  restaurantPhone: string;
  cancelReserveLink: string;
}) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lembrete de Reserva</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .title { font-size: 24px; font-weight: bold; color: #f59e0b; margin-bottom: 20px; }
          .description { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
          .reservation-details { background-color: #fffbeb; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .restaurant-info { background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .button-secondary { display: inline-block; background-color: #6b7280; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 10px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">🍽️ ReservaFácil</div>
              <h1 class="title">🔔 Lembrete da Sua Reserva</h1>
          </div>
          
          <p class="description">
              Olá ${userName},
          </p>
          
          <p class="description">
              Este é um lembrete amigável de que você tem uma reserva <strong>hoje</strong>!
          </p>
          
          <div class="reservation-details">
              <h3 style="margin-top: 0; color: #f59e0b;">Sua Reserva de Hoje</h3>
              <div class="detail-row">
                  <span class="detail-label">Restaurante:</span>
                  <span class="detail-value">${restaurantName}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Data:</span>
                  <span class="detail-value">${reservationDate}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">Horário:</span>
                  <span class="detail-value">${reservationTime}</span>
              </div>
          </div>
          
          <div class="restaurant-info">
              <h3 style="margin-top: 0; color: #374151;">Informações do Restaurante</h3>
              <div class="detail-row">
                  <span class="detail-label">📍 Endereço:</span>
                  <span class="detail-value">${restaurantAddress}</span>
              </div>
              <div class="detail-row">
                  <span class="detail-label">📞 Telefone:</span>
                  <span class="detail-value">${restaurantPhone}</span>
              </div>
          </div>
          
          <p class="description">
              <strong>Dicas importantes:</strong>
          </p>
          <ul style="color: #6b7280; line-height: 1.6;">
              <li>Chegue com pelo menos 5 minutos de antecedência</li>
              <li>Apresente o código QR da reserva na chegada</li>
              <li>Em caso de atraso, entre em contato com o restaurante</li>
              <li>Confira se há alguma restrição de dress code</li>
          </ul>
          
          <div style="text-align: center;">
              <a href="${cancelReserveLink}" class="button-secondary">Cancelar Reserva</a>
          </div>
          
          <p class="description">
              Esperamos que tenha uma experiência gastronômica incrível! 🍽️
          </p>
          
          <div class="footer">
              <p>Este é um email automático, não responda a esta mensagem.</p>
              <p>&copy; 2024 ReservaFácil. Todos os direitos reservados.</p>
          </div>
      </div>
  </body>
  </html>
  `;
