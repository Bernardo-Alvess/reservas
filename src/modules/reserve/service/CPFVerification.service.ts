import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CPFVerificationService {
  private readonly apiUrl = 'https://api.cpfhub.io/api/cpf';

  async verifyCPF(cpf: string, birthDate: string): Promise<boolean> {
    Logger.log('Verificando CPF');
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify({ cpf, birthDate }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CPF_API_KEY,
        },
      });

      if (!response.ok) {
        throw new UnauthorizedException('Erro ao verificar CPF');
      }

      const data = await response.json();

      if (data.success) {
        Logger.log('CPF válido');
        return true;
      }

      Logger.log('CPF inválido');
      throw new UnauthorizedException(
        'CPF inválido ou não corresponde à data de nascimento',
      );
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erro ao verificar CPF');
    }
  }
}
