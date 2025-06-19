import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🤖 Atribuição Automática Inteligente',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Algoritmo avançado que seleciona automaticamente a melhor mesa 
        baseado na capacidade, localização e disponibilidade. Otimize o uso 
        do seu restaurante sem intervenção manual.
      </>
    ),
  },
  {
    title: '🔒 Segurança Enterprise',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Autenticação JWT robusta com refresh tokens, rate limiting, validação 
        rigorosa de dados e logs de auditoria. Sua API protegida com as 
        melhores práticas de segurança.
      </>
    ),
  },
  {
    title: '⚡ Performance e Escalabilidade',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Arquitetura modular com NestJS, cache inteligente, otimizações de 
        banco de dados e monitoramento em tempo real. Pronto para crescer 
        com o seu negócio.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.sectionHeader}>
              <Heading as="h2" className={styles.sectionTitle}>
                🌟 Por que escolher nossa API?
              </Heading>
              <p className={styles.sectionSubtitle}>
                Desenvolvida especificamente para restaurantes que buscam 
                automatização, eficiência e uma experiência superior para seus clientes.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="row">
          <div className="col col--12">
            <div className={styles.ctaSection}>
              <h3>🚀 Pronto para revolucionar seu restaurante?</h3>
              <p>
                Comece agora mesmo com nossa documentação completa e exemplos práticos.
                A configuração leva apenas alguns minutos!
              </p>
              <div className={styles.ctaButtons}>
                <a 
                  href="/docs/getting-started/installation" 
                  className="button button--primary button--lg"
                >
                  📦 Instalar Agora
                </a>
                <a 
                  href="/docs/api-reference/reservations" 
                  className="button button--secondary button--lg"
                >
                  📋 Ver Exemplos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
