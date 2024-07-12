# BOP Land - Frontend

Este pequeno projeto faz parte da entrega do MVP da disciplina: Arquitetura de Software cursada na Pós-Graduação em Engenharia de Software da PUC-RJ

O projeto é uma aplicação web chamada BOP Land onde um usuário pode logar, criar e aprovar testes de BOP de forma simples e interativa. Como contexto de negócio o BOP (Blowout Preventer) é um equipamento de segurança de poço fundamental em intervenções em poços de petróleo. Este é composto por várias válvulas e preventores que podem ser fechadas para vedar, controlar e monitorar poços de petróleo. O teste completo desse equipamento é fundamental para garantia de seu funcionamento e vedação.

Visando auxiliar na tomada de decisão para aprovação do teste, foi feito um acesso a uma API externa do CPTEC-INPE com a previsão do tempo nos próximos 7 dias baseado na locação onde o BOP está instalado. Esta API está disponível de forma gratuita e sem chave de acesso através de [http://servicos.cptec.inpe.br/XML/#req-previsao-7-dias](http://servicos.cptec.inpe.br/XML/#req-previsao-7-dias)

O objetivo aqui é apresentar uma single page application (SPA).

As principais tecnologias que serão utilizadas aqui são:

- [React](https://react.dev/)
- [React-router](https://reactrouter.com/en/main)
- [Bootstrap](https://getbootstrap.com/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Chart.js](https://www.chartjs.org/)

## Como executar o front

**Primeiro será necessário a execução da API.** No projeto da API você encontra as intruções para a execução.

Será necessário ter o [Docker](https://www.docker.com/) instalado.

Após clonar o repositório, é necessário ir ao diretório raiz desse projeto pelo terminal para poder executar os comandos descritos abaixo.

```
docker build -t front .
```

```
docker run -p 5175:5175 front
```

Abra o [http://localhost:5175/#/](http://localhost:5175/#/) no navegador.
