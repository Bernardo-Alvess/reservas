import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          🍽️ {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            🚀 Começar Agora - 5 min ⏱️
          </Link>
          <Link
            className="button button--outline button--lg margin-left--md"
            to="/docs/api-reference/overview">
            📚 Explorar API
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Módulos</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Endpoints</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>TypeScript</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>99%</div>
            <div className={styles.statLabel}>Cobertura</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.quickStartCard}>
              <h2>⚡ Início Rápido</h2>
              <p>Configure e execute a API em menos de 5 minutos:</p>
              <div className={styles.codeBlock}>
                <pre>
                  <code>
{`# Clone o repositório
git clone https://github.com/seu-usuario/api-reservas.git

# Instale as dependências
cd api-reservas && yarn install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em modo desenvolvimento
yarn start:dev`}
                  </code>
                </pre>
              </div>
              <div className={styles.quickStartLinks}>
                <Link to="/docs/getting-started/installation">
                  📦 Guia Completo de Instalação
                </Link>
                <Link to="/docs/getting-started/environment-setup">
                  ⚙️ Configuração do Ambiente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const techStack = [
    {
      name: 'NestJS',
      description: 'Framework Node.js progressivo e escalável',
      icon: '🏗️',
      color: '#ea2845'
    },
    {
      name: 'MongoDB',
      description: 'Banco de dados NoSQL flexível e poderoso',
      icon: '🗄️',
      color: '#47A248'
    },
    {
      name: 'TypeScript',
      description: 'JavaScript tipado para maior produtividade',
      icon: '📘',
      color: '#3178C6'
    },
    {
      name: 'JWT',
      description: 'Autenticação segura e stateless',
      icon: '🔐',
      color: '#000000'
    },
    {
      name: 'Swagger',
      description: 'Documentação automática da API',
      icon: '📋',
      color: '#85EA2D'
    },
    {
      name: 'Jest',
      description: 'Framework de testes abrangente',
      icon: '🧪',
      color: '#C21325'
    }
  ];

  return (
    <section className={styles.techStack}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">🛠️ Stack Tecnológica</h2>
        <div className="row">
          {techStack.map((tech, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className={styles.techCard}>
                <div className={styles.techIcon} style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function APIHighlightsSection() {
  return (
    <section className={styles.apiHighlights}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h2>🎯 Destaques da API</h2>
            <ul className={styles.highlightsList}>
              <li>
                <strong>🤖 Atribuição Automática:</strong> Algoritmo inteligente 
                que seleciona a melhor mesa baseado em capacidade e disponibilidade
              </li>
              <li>
                <strong>⚡ Performance Otimizada:</strong> Tempo de resposta 
                médio menor que 200ms para operações CRUD
              </li>
              <li>
                <strong>🔒 Segurança Robusta:</strong> JWT com refresh tokens, 
                rate limiting e validação rigorosa
              </li>
              <li>
                <strong>📊 Monitoramento:</strong> Health checks, métricas 
                e logs estruturados
              </li>
              <li>
                <strong>🧪 Testes Abrangentes:</strong> Cobertura de testes 
                unitários, integração e E2E
              </li>
            </ul>
          </div>
          <div className="col col--6">
            <div className={styles.codeExample}>
              <h3>💡 Exemplo de Uso</h3>
              <pre>
                <code>
{`// Criar uma nova reserva
POST /api/reserves
{
  "restaurantId": "507f1f77bcf86cd799439011",
  "numberOfPeople": 4,
  "reserveDate": "2024-01-15",
  "reserveTime": "19:30",
  "specialRequests": "Mesa próxima à janela"
}

// Resposta automática
{
  "id": "507f1f77bcf86cd799439012",
  "tableId": "507f1f77bcf86cd799439013",
  "tableNumber": 12,
  "status": "confirmed",
  "message": "Mesa atribuída automaticamente"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentação completa da API de Reservas - Sistema de gerenciamento de restaurantes com NestJS e MongoDB">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickStartSection />
        <TechStackSection />
        <APIHighlightsSection />
      </main>
    </Layout>
  );
}
