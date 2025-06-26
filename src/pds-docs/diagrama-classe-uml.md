# Diagrama de Classes UML - Sistema Reserva Fácil

```mermaid
classDiagram
    class Company {
        -ObjectId _id
        -string name
        -string email
        -string cnpj
        -string password
        -string phone
        -Date createdAt
        -Date updatedAt
        +createCompany(createCompanyDto: CreateCompanyDto) Promise~Company~
        +updateCompany(updateCompanyDto: UpdateCompanyDto, id: string) Promise~Company~
        +findCompanyByEmail(email: string) Promise~Company~
        +findCompanyByCnpj(cnpj: string) Promise~Company~
        +listCompanies() Promise~Company[]~
    }

    class User {
        -ObjectId _id
        -string email
        -string name
        -string location
        -UserTypeEnum type
        -string password
        -ObjectId restaurantId
        -ObjectId companyId
        -boolean active
        -Date createdAt
        -Date updatedAt
        +createUser(user: CreateUserDto, password?: string) Promise~User~
        +updateUserPassword(user: CreateUserDto, password: string) Promise~User~
        +changeStatusUser(userId: string) Promise~User~
        +changeRoleUser(userId: string, type: UserTypeEnum) Promise~User~
        +deleteUser(userId: string) Promise~void~
        +findUserByEmail(email: string) Promise~User~
    }

    class Restaurant {
        -ObjectId _id
        -string name
        -string phone
        -AddressDto address
        -string description
        -string type
        -int maxClients
        -int maxReservationTime
        -WorkHoursDto[] workHours
        -ObjectId companyId
        -boolean isActive
        -ProfileImageDto profileImage
        -MenuDto menu
        -GalleryDto[] gallery
        -string qrCode
        -Date createdAt
        -Date updatedAt
        +createRestaurant(restaurantDto: CreateRestaurantDto) Promise~Restaurant~
        +updateRestaurant(id: string, updateDto: UpdateRestaurantDto) Promise~Restaurant~
        +findRestaurantById(id: string) Promise~Restaurant~
        +findRestaurantsByLocation(location: string) Promise~Restaurant[]~
        +searchRestaurantsByName(name: string) Promise~Restaurant[]~
        +uploadProfileImage(file: Express.Multer.File) Promise~string~
        +generateQrCode() Promise~string~
    }

    class Table {
        -ObjectId _id
        -int tableNumber
        -int numberOfSeats
        -boolean isReserved
        -ObjectId currentReservation
        -ObjectId restaurantId
        +createTable(tableDto: CreateTableDto) Promise~Table~
        +updateTable(id: string, updateDto: UpdateTableDto) Promise~Table~
        +findTablesByRestaurant(restaurantId: string) Promise~Table[]~
        +checkTableAvailability(tableId: string, startTime: Date, endTime: Date) Promise~boolean~
        +reserveTable(tableId: string, reservationId: string) Promise~Table~
        +releaseTable(tableId: string) Promise~Table~
    }

    class Reserve {
        -ObjectId _id
        -ObjectId clientId
        -ObjectId restaurantId
        -boolean clientConfirmed
        -boolean restaurantConfirmed
        -Date startTime
        -Date endTime
        -int tableNumber
        -int amountOfPeople
        -ObjectId tableId
        -ReserveStatus status
        -string canceledBy
        -Date canceledAt
        -string email
        -string notes
        -string name
        -Date checkedInAt
        -boolean checkedIn
        -boolean reminderSent
        -Date createdAt
        -Date updatedAt
        +createReserve(reserveDto: CreateReserveDto) Promise~Reserve~
        +confirmReservation(reserveId: string, userType: string) Promise~Reserve~
        +cancelReservation(reserveId: string, canceledBy: string) Promise~Reserve~
        +checkInReservation(reserveId: string) Promise~Reserve~
        +findReservesByClient(clientId: string) Promise~Reserve[]~
        +findReservesByRestaurant(restaurantId: string) Promise~Reserve[]~
        +sendReminderEmail(reserveId: string) Promise~void~
        +autoConfirmReservations() Promise~void~
    }

    class ReserveReminderService {
        +sendConfirmationReminder() Promise~void~
        +cancelUnconfirmedReservations() Promise~void~
    }

    class MailerService {
        +sendReservationConfirmation(reserve: Reserve) Promise~void~
        +sendCancellationNotification(reserve: Reserve) Promise~void~
        +sendReminderEmail(reserve: Reserve) Promise~void~
    }

    class AuthService {
        +login(email: string, password: string) Promise~string~
        +validateToken(token: string) Promise~User | Company~
        +generateToken(user: User | Company) string
        +hashPassword(password: string) Promise~string~
        +comparePasswords(password: string, hash: string) Promise~boolean~
    }

    %% Relacionamentos
    Company ||--o{ User : companyId
    Company ||--o{ Restaurant : companyId
    User ||--o{ Reserve : clientId
    Restaurant ||--o{ Table : restaurantId
    Restaurant ||--o{ Reserve : restaurantId
    Table ||--o{ Reserve : tableId
    Reserve --> ReserveReminderService : uses
    Reserve --> MailerService : uses
    User --> AuthService : authenticates
    Company --> AuthService : authenticates

    %% Enums
    class UserTypeEnum {
        <<enumeration>>
        ADMIN
        WORKER
        USER
        COMPANY
    }

    class ReserveStatus {
        <<enumeration>>
        PENDING
        CONFIRMED
        CANCELLED
    }

    User --> UserTypeEnum : type
    Reserve --> ReserveStatus : status
```

## Descrição das Classes Principais

### Company
Representa as empresas que gerenciam restaurantes no sistema. Contém métodos para CRUD básico e autenticação.

### User
Representa todos os tipos de usuários do sistema (clientes, funcionários, admins, empresas). Inclui métodos para gerenciamento de conta e autenticação.

### Restaurant
Entidade central que representa os restaurantes. Inclui funcionalidades para upload de imagens, geração de QR codes e busca por localização/nome.

### Table
Representa as mesas dos restaurantes. Controla disponibilidade e reservas ativas.

### Reserve
Núcleo do sistema de reservas. Gerencia todo o ciclo de vida de uma reserva, desde criação até check-in.

### Serviços Auxiliares
- **ReserveReminderService**: Gerencia lembretes automáticos e cancelamentos
- **MailerService**: Responsável pelo envio de e-mails
- **AuthService**: Gerencia autenticação e autorização 