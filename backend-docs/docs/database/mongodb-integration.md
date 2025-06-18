---
sidebar_position: 1
---

# Integração com MongoDB

Este documento detalha como a API de Reservas integra-se com o MongoDB usando Mongoose como ODM (Object Document Mapper).

## 🗄️ Configuração da Conexão

### Configuração no App Module

```typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // ... outros módulos
  ],
})
export class AppModule {}
```

### Variáveis de Ambiente

```env
# Desenvolvimento Local
MONGODB_URI=mongodb://localhost:27017/reservas

# Produção (MongoDB Atlas)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/reservas?retryWrites=true&w=majority
```

## 📊 Schemas e Models

### User Schema

```typescript
// schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'client' })
  role: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Company Schema

```typescript
// schemas/company.schema.ts
@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop()
  description?: string;

  @Prop()
  logo?: string;

  @Prop({ type: Object })
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
```

### Restaurant Schema

```typescript
// schemas/restaurant.schema.ts
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop()
  description?: string;

  @Prop({ type: [String] })
  images?: string[];

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: Object })
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @Prop({ type: Object })
  openingHours: {
    monday: { open: string; close: string; closed?: boolean };
    tuesday: { open: string; close: string; closed?: boolean };
    wednesday: { open: string; close: string; closed?: boolean };
    thursday: { open: string; close: string; closed?: boolean };
    friday: { open: string; close: string; closed?: boolean };
    saturday: { open: string; close: string; closed?: boolean };
    sunday: { open: string; close: string; closed?: boolean };
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
```

### Table Schema

```typescript
// schemas/table.schema.ts
@Schema({ timestamps: true })
export class Table {
  @Prop({ required: true })
  number: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 20 })
  capacity: number;

  @Prop({ default: 'available' })
  status: string; // available, occupied, reserved, maintenance

  @Prop()
  location?: string; // window, center, terrace, etc.

  @Prop({ default: true })
  isActive: boolean;
}

export const TableSchema = SchemaFactory.createForClass(Table);
```

### Reserve Schema

```typescript
// schemas/reserve.schema.ts
@Schema({ timestamps: true })
export class Reserve {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Table' })
  tableId?: Types.ObjectId;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop()
  customerPhone?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true, min: 1, max: 20 })
  numberOfPeople: number;

  @Prop()
  specialRequests?: string;

  @Prop({ default: 'pending' })
  status: string; // pending, confirmed, cancelled, completed

  @Prop({ type: Object })
  confirmation: {
    clientConfirmed: boolean;
    restaurantConfirmed: boolean;
    confirmedAt?: Date;
  };

  @Prop()
  notes?: string;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);
```

## 🔗 Diagrama de Relacionamentos

```mermaid
erDiagram
    Company {
        ObjectId id PK
        string name
        string cnpj UK
        string description
        string logo
        object address
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    Restaurant {
        ObjectId id PK
        ObjectId companyId FK
        string name
        string description
        array images
        string phone
        string email
        object address
        object openingHours
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    Table {
        ObjectId id PK
        ObjectId restaurantId FK
        string number
        number capacity
        string status
        string location
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    User {
        ObjectId id PK
        string name
        string email UK
        string password
        string role
        string phone
        string avatar
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    Reserve {
        ObjectId id PK
        ObjectId userId FK
        ObjectId restaurantId FK
        ObjectId tableId FK
        string customerName
        string customerEmail
        string customerPhone
        date date
        string time
        number numberOfPeople
        string specialRequests
        string status
        object confirmation
        string notes
        date createdAt
        date updatedAt
    }

    Company ||--o{ Restaurant : "owns"
    Restaurant ||--o{ Table : "has"
    Restaurant ||--o{ Reserve : "receives"
    Table ||--o{ Reserve : "assigned_to"
    User ||--o{ Reserve : "makes"
```

## 🔍 Operações CRUD Básicas

### Criar Documento

```typescript
// Exemplo: Criar uma nova reserva
@Injectable()
export class ReserveService {
  constructor(
    @InjectModel(Reserve.name) private reserveModel: Model<ReserveDocument>,
  ) {}

  async create(createReserveDto: CreateReserveDto): Promise<Reserve> {
    const createdReserve = new this.reserveModel(createReserveDto);
    return createdReserve.save();
  }
}
```

### Buscar Documentos

```typescript
// Buscar todas as reservas de um restaurante
async findByRestaurant(restaurantId: string): Promise<Reserve[]> {
  return this.reserveModel
    .find({ restaurantId })
    .populate('userId', 'name email')
    .populate('tableId', 'number capacity')
    .populate('restaurantId', 'name')
    .sort({ date: 1, time: 1 })
    .exec();
}

// Buscar com filtros específicos
async findAvailableTables(
  restaurantId: string,
  date: Date,
  time: string,
  numberOfPeople: number,
): Promise<Table[]> {
  // Buscar mesas reservadas no horário
  const reservedTables = await this.reserveModel
    .find({
      restaurantId,
      date,
      time,
      status: { $in: ['confirmed', 'pending'] },
    })
    .select('tableId')
    .exec();

  const reservedTableIds = reservedTables.map(r => r.tableId);

  // Buscar mesas disponíveis
  return this.tableModel
    .find({
      restaurantId,
      capacity: { $gte: numberOfPeople },
      isActive: true,
      _id: { $nin: reservedTableIds },
    })
    .sort({ capacity: 1 })
    .exec();
}
```

### Atualizar Documento

```typescript
async update(id: string, updateReserveDto: UpdateReserveDto): Promise<Reserve> {
  return this.reserveModel
    .findByIdAndUpdate(id, updateReserveDto, { new: true })
    .populate('tableId')
    .exec();
}

// Atualização específica para confirmação
async confirmReservation(
  id: string,
  type: 'client' | 'restaurant',
): Promise<Reserve> {
  const updateField = 
    type === 'client' 
      ? { 'confirmation.clientConfirmed': true }
      : { 'confirmation.restaurantConfirmed': true };

  return this.reserveModel
    .findByIdAndUpdate(
      id,
      {
        ...updateField,
        'confirmation.confirmedAt': new Date(),
      },
      { new: true }
    )
    .exec();
}
```

### Remover Documento

```typescript
async remove(id: string): Promise<void> {
  await this.reserveModel.findByIdAndDelete(id).exec();
}

// Soft delete (manter histórico)
async softDelete(id: string): Promise<Reserve> {
  return this.reserveModel
    .findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    )
    .exec();
}
```

## 📈 Estratégias de Indexação

### Índices Básicos

```typescript
// Após definir o schema, adicionar índices
UserSchema.index({ email: 1 }, { unique: true });
CompanySchema.index({ cnpj: 1 }, { unique: true });
RestaurantSchema.index({ companyId: 1 });
TableSchema.index({ restaurantId: 1, number: 1 }, { unique: true });
ReserveSchema.index({ restaurantId: 1, date: 1, time: 1 });
ReserveSchema.index({ userId: 1 });
ReserveSchema.index({ tableId: 1, date: 1 });
```

### Índices Compostos

```typescript
// Para consultas de disponibilidade
ReserveSchema.index({ 
  restaurantId: 1, 
  date: 1, 
  time: 1, 
  status: 1 
});

// Para busca de mesas disponíveis
TableSchema.index({ 
  restaurantId: 1, 
  capacity: 1, 
  isActive: 1 
});
```

## 🔄 Transações

### Exemplo: Reserva com Atribuição de Mesa

```typescript
async createReservationWithTable(
  createReserveDto: CreateReserveDto,
): Promise<Reserve> {
  const session = await this.connection.startSession();

  try {
    const result = await session.withTransaction(async () => {
      // 1. Verificar disponibilidade da mesa
      const availableTables = await this.findAvailableTables(
        createReserveDto.restaurantId,
        createReserveDto.date,
        createReserveDto.time,
        createReserveDto.numberOfPeople,
      );

      if (availableTables.length === 0) {
        throw new ConflictException('Nenhuma mesa disponível');
      }

      // 2. Selecionar a menor mesa adequada
      const selectedTable = availableTables[0];

      // 3. Criar a reserva
      const reservation = new this.reserveModel({
        ...createReserveDto,
        tableId: selectedTable._id,
        status: 'confirmed',
      });

      return reservation.save({ session });
    });

    return result;
  } finally {
    await session.endSession();
  }
}
```

## 🔧 Configuração dos Módulos

### Exemplo: Reserve Module

```typescript
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reserve.name, schema: ReserveSchema },
      { name: Table.name, schema: TableSchema },
    ]),
    UserModule,
    RestaurantModule,
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
  exports: [ReserveService],
})
export class ReserveModule {}
```

## 🛠️ Validação e Middleware

### Middleware de Schema

```typescript
// Middleware para hash de senha
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Middleware para validação de data
ReserveSchema.pre('save', function(next) {
  if (this.date < new Date()) {
    return next(new Error('Data da reserva não pode ser no passado'));
  }
  next();
});
```

### Métodos Virtuais

```typescript
// Virtual para nome completo
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual para status da reserva
ReserveSchema.virtual('isConfirmed').get(function() {
  return this.confirmation?.clientConfirmed && 
         this.confirmation?.restaurantConfirmed;
});
```

## 📊 Agregações

### Relatório de Reservas por Período

```typescript
async getReservationStats(restaurantId: string, startDate: Date, endDate: Date) {
  return this.reserveModel.aggregate([
    {
      $match: {
        restaurantId: new Types.ObjectId(restaurantId),
        date: { $gte: startDate, $lte: endDate },
      }
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          status: "$status"
        },
        count: { $sum: 1 },
        totalPeople: { $sum: "$numberOfPeople" }
      }
    },
    {
      $sort: { "_id.date": 1 }
    }
  ]);
}
```

## 🚀 Próximos Passos

- [Sistema de Autenticação](../authentication/overview)
- [APIs RESTful](../api-reference/overview)
- [Testes](../testing/overview) 