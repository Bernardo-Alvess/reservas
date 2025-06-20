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
