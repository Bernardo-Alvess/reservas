# Diagrama de Sequência UML - Processo de Criação e Confirmação de Reserva

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as API Gateway
    participant RS as Reserve Service
    participant TS as Table Service
    participant RestS as Restaurant Service
    participant DB as MongoDB
    participant MS as Mailer Service
    participant RRS as Reminder Service

    Note over C, RRS: Fluxo de Criação de Reserva

    %% 1. Busca de Restaurantes
    C->>+API: GET /restaurants/search?location=X&name=Y
    API->>+RestS: searchRestaurants(location, name)
    RestS->>+DB: find({ location, name, isActive: true })
    DB-->>-RestS: restaurants[]
    RestS-->>-API: restaurants[]
    API-->>-C: Lista de restaurantes disponíveis

    %% 2. Verificação de Disponibilidade
    C->>+API: GET /restaurants/:id/availability?date=X&people=Y
    API->>+TS: checkAvailability(restaurantId, date, people)
    TS->>+DB: find({ restaurantId, isReserved: false, numberOfSeats >= people })
    DB-->>-TS: availableTables[]
    TS-->>-API: availableSlots[]
    API-->>-C: Horários e mesas disponíveis

    %% 3. Criação da Reserva
    C->>+API: POST /reserves { restaurantId, startTime, endTime, amountOfPeople, email, name }
    API->>+RS: createReserve(createReserveDto)
    
    %% Validações
    RS->>+RestS: findRestaurantById(restaurantId)
    RestS->>+DB: findById(restaurantId)
    DB-->>-RestS: restaurant
    RestS-->>-RS: restaurant
    
    RS->>+TS: checkTableAvailability(restaurantId, startTime, endTime, amountOfPeople)
    TS->>+DB: find({ restaurantId, numberOfSeats >= amountOfPeople, isReserved: false })
    DB-->>-TS: availableTables[]
    TS-->>-RS: selectedTable
    
    %% Criação da reserva
    RS->>+DB: create({ clientId, restaurantId, tableId, status: 'PENDING', ... })
    DB-->>-RS: newReserve
    
    %% Atualização da mesa
    RS->>+TS: reserveTable(tableId, reserveId)
    TS->>+DB: updateOne({ _id: tableId }, { isReserved: true, currentReservation: reserveId })
    DB-->>-TS: updateResult
    TS-->>-RS: success
    
    RS-->>-API: createdReserve
    API-->>-C: Reserva criada com sucesso
    
    %% 4. Envio de E-mail de Confirmação
    RS->>+MS: sendReservationConfirmation(reserve)
    MS-->>-RS: emailSent
    
    Note over C, RRS: Fluxo de Confirmação de Reserva

    %% 5. Agendamento de Lembrete
    RS->>+RRS: scheduleReminder(reserveId, reminderTime)
    RRS-->>-RS: reminderScheduled

    %% 6. Envio de Lembrete (15 min antes)
    Note right of RRS: Cron Job executa 15 min antes da reserva
    RRS->>+RS: findReservesToRemind()
    RS->>+DB: find({ startTime: { $lte: now + 15min }, reminderSent: false })
    DB-->>-RS: reservesToRemind[]
    RS-->>-RRS: reservesToRemind[]
    
    loop Para cada reserva
        RRS->>+MS: sendReminderEmail(reserve)
        MS-->>C: E-mail de lembrete
        MS-->>-RRS: emailSent
        
        RRS->>+RS: updateReminderSent(reserveId)
        RS->>+DB: updateOne({ _id: reserveId }, { reminderSent: true })
        DB-->>-RS: updateResult
        RS-->>-RRS: updated
    end

    %% 7. Confirmação pelo Cliente
    C->>+API: PUT /reserves/:id/confirm
    API->>+RS: confirmReservation(reserveId, 'client')
    RS->>+DB: findById(reserveId)
    DB-->>-RS: reserve
    
    alt Reserva encontrada e válida
        RS->>+DB: updateOne({ _id: reserveId }, { clientConfirmed: true, status: 'CONFIRMED' })
        DB-->>-RS: updateResult
        RS-->>-API: reserveConfirmed
        API-->>-C: Confirmação realizada com sucesso
        
        %% Notificação para o restaurante
        RS->>+MS: sendConfirmationToRestaurant(reserve)
        MS-->>-RS: emailSent
    else Reserva não encontrada ou expirada
        RS-->>-API: error: "Reserva não encontrada ou expirada"
        API-->>-C: Erro na confirmação
    end

    %% 8. Cancelamento Automático (se não confirmada)
    Note right of RRS: Cron Job executa a cada minuto
    RRS->>+RS: cancelUnconfirmedReservations()
    RS->>+DB: find({ startTime: { $lte: now }, clientConfirmed: false, status: 'PENDING' })
    DB-->>-RS: unconfirmedReserves[]
    
    loop Para cada reserva não confirmada
        RS->>+DB: updateOne({ _id: reserveId }, { status: 'CANCELLED', canceledBy: 'system', canceledAt: now })
        DB-->>-RS: updateResult
        
        %% Liberar mesa
        RS->>+TS: releaseTable(tableId)
        TS->>+DB: updateOne({ _id: tableId }, { isReserved: false, currentReservation: null })
        DB-->>-TS: updateResult
        TS-->>-RS: tableReleased
        
        %% Notificar cliente
        RS->>+MS: sendCancellationNotification(reserve, 'Não confirmada a tempo')
        MS-->>C: E-mail de cancelamento
        MS-->>-RS: emailSent
    end
    RS-->>-RRS: cancellationsCompleted

    %% 9. Check-in (Opcional)
    Note over C, RRS: Fluxo de Check-in no Restaurante
    C->>+API: PUT /reserves/:id/checkin
    API->>+RS: checkInReservation(reserveId)
    RS->>+DB: updateOne({ _id: reserveId }, { checkedIn: true, checkedInAt: now })
    DB-->>-RS: updateResult
    RS-->>-API: checkedIn
    API-->>-C: Check-in realizado com sucesso
```

## Descrição do Fluxo

### 1. Busca de Restaurantes
O cliente busca restaurantes por localização e/ou nome através da API.

### 2. Verificação de Disponibilidade
Antes de criar a reserva, o sistema verifica mesas disponíveis para a data, horário e número de pessoas.

### 3. Criação da Reserva
- Validação do restaurante e disponibilidade da mesa
- Criação da reserva com status 'PENDING'
- Reserva da mesa selecionada
- Envio de e-mail de confirmação

### 4. Sistema de Lembretes
- Agendamento automático de lembrete para 15 minutos antes da reserva
- Envio de e-mail de lembrete via cron job

### 5. Confirmação pelo Cliente
- Cliente confirma a reserva através do link no e-mail ou interface
- Status da reserva muda para 'CONFIRMED'
- Restaurante é notificado da confirmação

### 6. Cancelamento Automático
- Cron job verifica reservas não confirmadas
- Reservas não confirmadas até 15 minutos antes são automaticamente canceladas
- Mesa é liberada e cliente é notificado

### 7. Check-in (Opcional)
- Cliente pode fazer check-in quando chegar ao restaurante
- Registro do horário de chegada

## Pontos Críticos

- **Timeout de Confirmação**: 15 minutos antes do horário da reserva
- **Liberação de Mesa**: Automática quando reserva é cancelada
- **Notificações**: E-mails em todas as etapas importantes
- **Atomicidade**: Operações de reserva e liberação de mesa são atômicas 