# Diagrama Entidade-Relacionamento (ER) - Sistema Reserva Fácil

```mermaid
erDiagram
    COMPANY {
        ObjectId _id PK
        string name
        string email UK
        string cnpj UK
        string password
        string phone
        Date createdAt
        Date updatedAt
    }

    USER {
        ObjectId _id PK
        string email UK
        string name
        string location
        UserTypeEnum type
        string password
        ObjectId restaurantId FK
        ObjectId companyId FK
        boolean active
        Date createdAt
        Date updatedAt
    }

    RESTAURANT {
        ObjectId _id PK
        string name
        string phone
        AddressDto address
        string description
        string type
        int maxClients
        int maxReservationTime
        WorkHoursDto[] workHours
        ObjectId companyId FK
        boolean isActive
        ProfileImageDto profileImage
        MenuDto menu
        GalleryDto[] gallery
        string qrCode
        Date createdAt
        Date updatedAt
    }

    TABLE {
        ObjectId _id PK
        int tableNumber
        int numberOfSeats
        boolean isReserved
        ObjectId currentReservation FK
        ObjectId restaurantId FK
    }

    RESERVE {
        ObjectId _id PK
        ObjectId clientId FK
        ObjectId restaurantId FK
        boolean clientConfirmed
        boolean restaurantConfirmed
        Date startTime
        Date endTime
        int tableNumber
        int amountOfPeople
        ObjectId tableId FK
        ReserveStatus status
        string canceledBy
        Date canceledAt
        string email
        string notes
        string name
        Date checkedInAt
        boolean checkedIn
        boolean reminderSent
        Date createdAt
        Date updatedAt
    }

    %% Relacionamentos
    COMPANY ||--o{ USER : "possui funcionários"
    COMPANY ||--o{ RESTAURANT : "gerencia"
    USER ||--o{ RESERVE : "faz reservas"
    RESTAURANT ||--o{ TABLE : "possui mesas"
    RESTAURANT ||--o{ RESERVE : "recebe reservas"
    TABLE ||--o{ RESERVE : "pode ter reservas"
    RESERVE ||--|| TABLE : "reserva mesa específica"
```

## Descrição dos Relacionamentos

- **COMPANY ↔ USER**: Uma empresa pode ter vários funcionários/usuários (1:N)
- **COMPANY ↔ RESTAURANT**: Uma empresa pode gerenciar vários restaurantes (1:N)  
- **USER ↔ RESERVE**: Um usuário pode fazer várias reservas (1:N)
- **RESTAURANT ↔ TABLE**: Um restaurante possui várias mesas (1:N)
- **RESTAURANT ↔ RESERVE**: Um restaurante pode receber várias reservas (1:N)
- **TABLE ↔ RESERVE**: Uma mesa pode ter várias reservas em diferentes horários (1:N)
- **RESERVE ↔ TABLE**: Uma reserva específica ocupa uma mesa específica (N:1)

## Enums e Tipos Especiais

- **UserTypeEnum**: `'admin' | 'worker' | 'user' | 'company'`
- **ReserveStatus**: `'Pendente' | 'Confirmada' | 'Cancelada'`
- **AddressDto**: Objeto contendo dados do endereço
- **WorkHoursDto**: Array de horários de funcionamento por dia da semana
- **ProfileImageDto**: Dados da imagem de perfil do restaurante
- **MenuDto**: Cardápio do restaurante
- **GalleryDto**: Galeria de fotos do restaurante 