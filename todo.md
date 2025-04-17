[] - arrumar o login com status code certo
[] - middleware de erro quando ve
[] - nao deixar criar reservas ao mesmo horario
[] - fazer a atribuiçao de uma mesa a reserva e a confirmaçao dela da parte do restaurante
[] - entender se faz sentido o cliente confirmar duas vezes a reserva
[] - ao criar a mesa ela nao pode receber reserva
[] - ao definir uma reserva para uma mesa ela deve ser removida de outra mesa se for o caso
[] -  entender se tem como ter mesas sem numeros duplicados 

🧩 MVP — Sistema de Reservas de Restaurante
🎯 Objetivo do MVP:

Permitir que clientes reservem mesas de forma simples e que restaurantes possam gerenciar essas reservas, melhorando a experiência e organização, com um fluxo básico, porém funcional, de ponta a ponta.
✅ FUNCIONALIDADES DO MVP
👤 Cliente:

Acessar o site sem login prévio

Criar conta automaticamente ao reservar (via modal)

Buscar restaurantes por nome, localização e tipo de cozinha

Visualizar informações do restaurante (nome, local, tipo, cardápio básico)

Selecionar restaurante, horário e número de pessoas

Enviar solicitação de reserva

Receber confirmação da reserva por e-mail ou tela

    Confirmar presença no local via QR Code (check-in simples)

🍽️ Restaurante:

Criar conta e cadastrar restaurante

Definir mesas e capacidade

Visualizar reservas recebidas

Confirmar, recusar ou cancelar manualmente reservas

Exibir QR Code fixo para check-in dos clientes

    Ver lista de reservas do dia

🔐 Administrador:

Acessar painel para listar restaurantes cadastrados

    Bloquear ou aprovar restaurantes, se necessário (mínimo de controle)

⚙️ Regras Essenciais no MVP:

    Cliente pode ter apenas uma reserva ativa por dia

    Restaurantes podem definir capacidade máxima e horários

    Reserva deve ser confirmada pelo cliente até 45 min antes

    Cancelamento automático se não confirmar até 15 min antes

    Check-in só é válido se estiver dentro do horário da reserva

❌ FUNCIONALIDADES POSTERGADAS (pós-MVP)

Essas funcionalidades são valiosas, mas podem ser adicionadas em fases futuras:

    Avaliações e comentários

    Sistema de penalização para no-show

    Relatórios de ocupação e estatísticas

    Interface para funcionários do restaurante

    Personalização de horários por dia da semana

    Notificações por SMS/WhatsApp

    Múltiplas mesas por reserva

    Garantia via pagamento antecipado

    Modo dark/light, acessibilidade avançada

🗺️ MVP em resumo:

    Um cliente pode buscar e reservar

    Um restaurante pode receber e gerenciar

    A reserva pode ser confirmada e validada no local