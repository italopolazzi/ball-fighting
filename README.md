---
title: "Ball Fighting - Jogo single e multi player programado em JavaScript com a interface em canvas e Vue.js"
resume: Com um design minimalista, dois personagens devem se enfrentar em um campo de batalha, que de tempos em tempos disponibiliza efeitos que devem ser coletados (ou não) para garantir a vitória.
live_demo: https://ball-fighting.web.app/
tags: [GeneticAlgorithm, Game, Vue.js, Vuetify, Canvas]
---

##  Descrição

Um jogo desenvolvido em JavaScript, com o front-end em Vue.js e Vuetify, em que dois personagens devem competir para vencer a batalha.

### Como funciona?

Dois personagens com a mesma quantidade de vida são postos nas extremidades do campo, o jogador deve utilizar as teclas direcionais para iniciar o movimento de seu personagem. Mas atenção! Vá com calma. Os personagens não devem se atacar inicialmente, pois perderão a mesma quantidade de vida quando colidirem entre si, o que resultaria em um empate após o esgotamento das 3 vidas que acompanham cada um. 

#### Okay, então qual o objetivo?

Para que haja um vencedor (e por consequência um perdedor), estes devem coletar efeitos que irão aparecer em tempos e posições aleatórias dentro do campo. os efeitos podem ser positivos para o personagem ou não. Dentre eles há algumas subcategorias, cada um com sua peculiaridade, adicionados para dar dinâmica às partidas.  

#### Quem controla o oponente?

Foram criados dois modos de jogo:
- um jogador versus a máquina ;
- dois jogadores compartilhando a mesma tela.

No modo jogador versus a máquina, utilizei um **algoritmo genético com neuro-evolução** para treinar uma população de agentes reativos. O treino teve como finalidade selecionar uma geração de genomas, utilizados como cérebro do agente reativo e responsáveis por definir quando e como o personagem deve agir, considerando **fugir do oponente** se em desvantagem, **coletar bons efeitos** e **prezar por vitórias**.

A biblioteca utilizada para o treino foi a [Neataptic](https://wagenaartje.github.io/neataptic/). Esta exporta uma classe NEAT, que contém todo um aparato de funções para, dadas entradas e um determinado escore, otimizar as saídas da rede neural baseado numa função de aptidão. 

> Não é o objetivo deste texto explicar conceitos de algoritmos evolutivos, portanto irei reservar-me a apresentar pequenos detalhes sobre o seu funcionamento e descrever como foi feita sua implementação no jogo.

##  Estória de usuário

* O agente deve ter percepção completa sobre o ambiente
* O agente deve escolher entre capturar um efeito, perseguir ou fugir do oponente
* Cada personagem deve possuir no máximo 3 vidas
* Cada vida tem uma porcentagem
* Se a porcentagem ultrapassar 100, então mais 1 vida dever ser adicionada
* Se a porcentagem zerar, então 1 vida deve ser excluída
* O campo de batalha deve ser do tamanho do viewport
* Cada efeito deve ser disponibilizado em cores diferentes sem repetição
* O jogador pode escolher a cor do personagem
* Os personagens não podem ter a mesma cor
* O controle do personagem deve ser realizado pelo teclado
* O teclado deve ser utilizado para controlar o personagem em todas as direções
* O jogador deve poder mudar as teclas de sua preferência para controle do personagem
* O personagem não pode ultrapassar os limites do campo
* Paineis devem mostrar status do jogo, como vidas disponíveis dos personagens
* Efeitos devem ser gerados em posições aleatórias no campo
* Efeitos devem ser disponibilizados para coleta dado um determinado período de tempo
* Apenas um efeito deve ser disponibilizado por vez
* Se o efeito disponibilizado não for coletado este deve ser excluído

## Detalhes de implementação

### Estrutura de pasta do projeto

```

├── assets/             # ativos do projeto
├── components/         # UI componentes
├── game/               # os arquivos de lógica do jogo (mais detalhado adiante)
├── plugins/            # extenções do Vue, como Vuetify e EventBus
├── router/             # arquivos de configuração de rotas
├── store/              # store Vuex para centralização de dados 
├── views/              # componentes renderizados em cada rota
├── main.js             # arquivo de entrada do Webpack
├── App.vue             # componente/template principal


game/                   # os arquivos de lógica do jogo
├── defaults/           # valores padrões utilizados nas classes do jogo 
├── population/         # arquivos contendo populações geradas pelo treinamento da rede neural
├── scripts/            # classes e funções principais
│   └── Battle/         # classes de batalha, responsáveis por gerenciar os elementos do jogo e atualizar a tela
│   └── Canvas/         # classes de elementos desenhaveís e do próprio campo de batalha
│   └── Characters/     # classes de personagens do jogo, cada um representa uma cor
│   └── Effects/        # classes abstratas de efeitos e seus subtipos
│   └── engines/        # métodos disparados por eventos do teclado para controlar os personagens
│   └── functions/      # métodos úteis de cálculo e importações
│   └── objects/        # objetos úteis 
│   └── Players/        # classes dos jogadores humano e agente reativo
└── vendor/             # códigos de terceiros
    └── neataptic.js    # o algoritmo genetico utilizado para treinar a rede neural e ativar o genoma do agente
```

###  Efeitos e suas classes

Efeitos são elementos que surgem no campo de batalha em posições aleatórias e devem ser coletados para garantir a vitória ou a derrota. São eles que agregam dinâmica ao jogo, pois dão vantagens ou desvantagem perante ao oponente. Eles foram categorizados em algumas classes e possuem ciclo de vida.

####  Ciclo de vida dos efeitos

O ciclo de vida serve para iniciar e cancelar modificações feitas pelo efeito sobre o personagem alvo. São disparados na colisão direta entre efeito *versus* personagem ou indireta entre personagem hospedeiro *versus* oponente. Ambas situações executarão a chamada do método **apply**.

As fases do ciclo são:

*  **Inicialização**: instalação no hospedeiro e destruição do efeito anterior (se existir)
*  **Modificação**: persistência das propriedades originais do personagem alvo e aplicação das modificações neste
*  **Execução**: esta fase é assíncrona, deve ser usada em efeitos que precisam cumprir modificações não imediatas ou repetitivas no alvo antes de serem destruídos
*  **Destruição**: cancelamento do efeito e limpeza de modificações

Abaixo o método apply, com os métodos que compõem o ciclo de vida:

```js
async apply(character) {
    this.$start(character)
    this.$mod()
    await this.$run()
    this.$destroy()
}

$start(character) {
    // can't be overrided

    this.setCharacterOwner(character)

    this.destroyPreviousEffect(character)

    character.setCurrentEffect(this)
}
$mod() {
    if (!this.performed_table.$mod) {
        this.beforeMod()
        this.mod()
        this.performed_table.$mod = true
    }
}

async $run() {
    if (!this.performed_table.$run) {
        await this.run()
        this.performed_table.$run = true
    }
}

$destroy() {
    if (!this.performed_table.$destroy) {
        this.beforeDestroy()
        this.destroy()
        this.destroyed()
        this.performed_table.$destroy = true
    }
}
```

####  Tipos abstratos dos efeitos

*  **Infecciosos**: são aplicados imediatamente após serem coletados e podem ser replicados no oponente na colisão de personagens, o efeito é cancelado após determinado período de tempo
*  **Temporários** : são aplicados imediatamente após serem coletados e realizam modificações no coletante dado um período de tempo específico
*  **Intervalares**: são aplicados imediatamente após serem coletados e realizam modificações no coletante dado um intervalo de tempo específico
*  **Canceladores**: não afeta o personagem, apenas remove o efeito atual se existir
*  **Instantâneos**: efeitos dessas classe são aplicado imediatamente após serem coletados e realizam modificações no coletante apenas uma vez
*  **Transferíveis**: não são aplicados imediatamente após serem coletados, o personagem que coletar um efeito desta classe precisa colidir com o oponente para transferir o efeito para este
*  **Contadores**: são aplicados imediatamente e modificam o personagem hospedeiro em um número determinado de vezes

####  Tipos específicos de efeitos

*  **Cure**: Usado apenas para remover o efeito anterior sem modificar nada
*  **Virus**: Diminui a porcentagem da vida do personagem infectado
*  **Death**: Remove todas as vidas do personagem causando derrota imediata
*  **LessLifes**: Remove uma determinada quantidade de vidas ao personagem
*  **MoreLifes**: Adiciona uma determinada quantidade de vidas ao personagem
*  **Immunity**: Mantém as vidas e suas porcentagens estáticas
*  **Revival**: Adiciona unidades à porcentagem de vida
*  **Bolt**: Aumenta a velocidade do personagem
*  **Ice**: Fixa a posição do personagem
*  **Invisible**: Torna a cor do personagem transparente (invisível)
*  **Turtle**: Diminui a velocidade do personagem
*  **Curse**: Remove vidas do personagem oponente
*  **Benediction**: Adiciona vidas ao personagem oponente

###  Batalha e suas responsabilidades

A classe do tipo **Battle** é uma abstração de uma batalha, é responsável por reunir jogadores, gerar efeitos, esperar ações dos jogadores, emitir atualizações para a interface, desenhar no canvas, verificar colisões e montar os resultados.

``` js
    run() {
        const battle = this
        return new Promise((resolve, reject) => {
            try {
                const animate = () => {
                    battle.canvas.clearBattleCanvas()
                    if (battle.battleEnded()) {
                        resolve(battle.players)
                        return;
                    } else {
                        requestAnimationFrame(animate)
                        VueEventBus.$emit("battleRunning", battle)
                        battle.updateGameElements()
                        battle.listenForPlayerControls()
                        battle.collideElements()
                        battle.drawBattle()
                    }
                }
                animate()
            } catch (error) {
                reject(error)
            }
        })
    }
```
####  Batalha homem *versus* inteligência artificial

Focarei aqui na classe de batalha de um jogador, que acontece com um jogador humano contra a máquina (agente reativo). Essa possui dois métodos extras, um responsável por atualizar o ambiente para o jogador da máquina e o outro por requisitar aos jogadores que realizem uma ação.

``` js
class BattleOfflineSinglePlayer extends Battle {
    constructor(players, canvas) {
        super(players, canvas)
        this.updateEnvironmentForAgentPlayers(this.players)
    }

    updateEnvironmentForAgentPlayers(players) {
        for (let index in players) {
            const player = players[index]
            if (player instanceof AgentPlayer) player.setEnvironment(this)
        }
    }

    listenForPlayerControls() {
        this.players.forEach(player => player.requireAction())
    }
}
```

###  O jogador artificialmente inteligente

A máquina aqui é representada pela classe AgentPlayer e é uma especificação da classe Player. É a classe que vai receber o comportamento de uma inteligência artificial do jogo. Criado como um agente reativo, possui percepção completa do ambiente (dados da batalha e do oponente).

A cada atualização da batalha será requisitado ao agente que tome uma decisão baseado no estado atual do ambiente. Esta decisão será processada com base nas suas percepções, que são métodos que retornam boleanos, indicando verdadeiro ou falso para as seguintes questões:

* "estou hospedando um efeito que é considerado bom para coletar?"
* "estou hospedando um efeito que é considerado bom para atacar?"
* "há no campo um efeito bom para ser coletado?"
* "há no campo um efeito bom para atacar?"
* "estou próximo ao meu oponente?"
* "meu oponente está próximo ao efeito?"
* "estou próximo ao efeito?"
* "estou em vantagem no jogo?"
* "estou em vantagem com o efeito que hospedo?"
* "estou em vantagem pelo total de vidas?"

Cada boleano retornado pelos métodos é então normalizado em 0 (false) e 1 (true). Esse *array* de binários é utilizado como entrada para ativação do genoma/cérebro do agente. A saída é um *array* contendo 4 números indicando, respectivamente, o quão vantajoso é **perseguir o efeito**, **perseguir o oponente**, **fugir do oponente** ou **ficar quieto**. Sabendo qual ação terá melhor benefício, dado a sua percepção atual, o agente escolhe então a com maior magnitude.

Estes comportamentos foram codificados na forma dos métodos *perceive*, *decide* e *act*, como mostrado abaixo:

``` js
class AgentPlayer extends Player {
    constructor(character, genome, nickname = "agent_player") {
        super(character, nickname)
        this.opponent = null
        this.environment = null
        this.brain = genome
        this.mapAgentModules(agent_modules)
    }

    requireAction() {
        this.update()
    }

    setEnvironment(environment) {
        this.opponent = environment.players.find(player => player !== this)
        this.environment = environment
    }

    perceive() {
        const boolToInt = bool => {
            return bool ? 1 : 0;
        }

        const booleans = [
            this.isAgentEffectGoodToCollect(),
            this.isAgentEffectGoodToAttack(),
            this.isEnvironmentEffectGoodToCollect(),
            this.isEnvironmentEffectGoodToAttack(),
            this.isOpponentEffectGoodToAttack(),
            this.isOpponentNear(),
            this.isOpponentNearEffect(),
            this.isEffectNear(),
            this.isAgentAtAdvantage(),
            this.isAgentAtAdvantageByEffects(),
            this.isAgentAtAdvantageByLifes(),
        ]
        const booleans_to_int = booleans.map(bool => boolToInt(bool))
        const input = [...booleans_to_int]
        return input
    }

    decide(perception) {
        const higherIndex = output => {
            let higher_index = 0
            for (let index in output) {
                const current = output[index]
                const higher = output[higher_index]
                higher_index = current > higher ? index : higher_index
            }
            return higher_index
        }
        
        const output = this.brain.activate(perception)
        return Number.parseInt(higherIndex(output))
    }

    act(decision) {
        switch (decision) {
            case 0:
                this.chaseTheEffect()
                break;
            case 1:
                this.chaseTheOpponent()
                break;
            case 2:
                this.runOfTheOpponent()
                break;
        }
    }

    update() {
        const perception = this.perceive()
        const decision = this.decide(perception)
        this.act(decision)
    }
}
```

<figure>
    <img  src="/img/ball/treinando-a-rede-neural.gif"  alt="">
    <figcaption>Figura 1 - Interface de treinamento preenchida com a população de uma geração de agentes sendo treinados.</figcaption>
</figure>

###  O treinamento da rede neural

A classe AgentPlayer requisita um genoma para tomar decisões dada uma percepção. Este faz parte de uma população de N indivíduos previamente treinados com o auxílio da biblioteca Neataptic. Essa expõe uma classe [NEAT](https://en.wikipedia.org/wiki/Neuroevolution_of_augmenting_topologies) que contém todo um aparato de funções para, dadas entradas e um determinado escore, otimizar as saídas da rede neural baseado numa função de aptidão.

Para treinar os genomas foram criadas novas classes adaptadas do agente (TrainerAgentPlayer), do personagem (TrainerCharacter) e da batalha (TrainerBattle), além de uma extra (Trainer), onde a instância desta é responsável por: inicializar batalhas, observar as melhores pontuações, definir recompensas e penalidades, além de realizar a seleção e mutação de novas gerações.

``` js
class Trainer {
    constructor() {
        this.info = {
            high_score: 0,
            chase_effect: 0,
            chase_opponent: 0,
            run_away: 0,
            win: 0,
            lose: 0,
            tied: 0
        }
        this.neat = new Neat(
            INPUT_NODES,
            OUTPUT_NODES,
            null, {
                ...
                popsize: POPULATION_AMOUNT,
                mutationRate: MUTATION_RATE,
                elitism: Math.round(ELITISM_PERCENT * POPULATION_AMOUNT),
                network: new Architect.Random(
                    INPUT_NODES,
                    START_HIDDEN_SIZE,
                    OUTPUT_NODES
                )
            }
        );

        if (USE_TRAINED_POP) this.neat.population = loadPopulation(POPULATION_AMOUNT);
        this.listenForKeydownToSaveNeatProgress()
        this.iterateEvaluations()
    }

    ...

    setHighScore(score) {
        this.info.high_score = score > this.info.high_score ? score : this.info.high_score;
    }


    startHighScore(genomes) {
        const trainer = this
        genomes.forEach(genome => {
            if (genome.score) trainer.setHighScore(genome.score)
        })
    }

    updateInfoWithBattlesResults(battles_results) {
        const trainer = this
        battles_results.forEach(pair => {
            pair.forEach(agent_player => {
                switch (agent_player.result) {
                    case "Lose":
                        agent_player.brain.score -= 2000
                        trainer.info.lose += 1
                        break;
                    case "Tied":
                        agent_player.brain.score -= 1000
                        trainer.info.tied += 1
                        break;
                    case "Win":
                        agent_player.brain.score *= agent_player.lifeScoreNormalized()
                        trainer.info.win += 1
                        break;
                }
                trainer.setHighScore(agent_player.brain.score)
            })
        })
    }

    /** End the evaluation of the current generation */
    endEvaluation() {
        this.neat.sort();
        const new_population = [];

        // Elitism
        for (let i = 0; i < this.neat.elitism; i++) {
            new_population.push(this.neat.population[i]);
        }

        // Breed the next individuals
        for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
            new_population.push(this.neat.getOffspring());
        }

        // Replace the old population with the new population
        this.neat.population = new_population;
        this.neat.mutate();

        this.neat.generation++;
    }
}
```

Durante a fase de treinamento, as redes neurais precisam ter os pesos entre as conexões entre neurônios ajustados, buscando melhorar a eficiência das saídas esperadas dada uma entrada. Nos algoritmos [NEAT](https://en.wikipedia.org/wiki/Neuroevolution_of_augmenting_topologies) esses ajustes são feitos gradualmente, pois utilizam o conceito de evolução por aumento de topologias.

O principal requisito deste algoritmo evolutivo, para realização dos ajustes, é o fornecimento de um escore, que define o quão habilitado um genoma é comparado com outros indivíduos da mesma espécie. Este também servirá para filtrar quais indivíduos devem passar para a próxima geração, por meio de uma técnica de elitismo, descartando os menos aptos.

Para esta implementação, o escore de cada agente foi definido pelo acúmulo: dos valores atribuídos a cada tipo de efeito coletado (que podem ser negativos ou positivos); das ações executadas dada uma percepção do ambiente (recompensado ou penalizado); e do resultado final contra o oponente (empatou, venceu ou perdeu).

Exemplos de acúmulo de escore:

- Capturou um efeito do tipo Virus, então remova 3 pontos do escore;
- Decidiu perseguir o oponente, mesmo estando em desvantagem, então remova 1 ponto do escore;
- Venceu a batalha, então multiplique o escore pelo total de vidas que restaram para o personagem.

Para definir as recompensas e penalidades, por executar ações, foi criada uma tabela de decisão.

A distribuição de recompensas e penalidades ficou definido pela criação de uma tabela de decisão.

Dado a complexidade 2<sup>n</sup> para se implementar uma tabela que atenda aos 11 boleanos citados anteriormente, optou-se por gerar uma versão com menos variáveis.

O impacto disso poderia ser um agente treinado com menos percepção do ambiente e por consequência menos inteligente.

Esta abstração fez-se necessária para não tomar muito tempo do desenvolvimento do jogo, já que a meta não era criar um jogador capaz de superar o humano, mas sim adicionar certa competitividade com reações racionais do agente inteligente.

<figure>
    <img  src="/img/ball/tabela-de-decisão-de-recompensas-e-penalidades.jpg"  alt="">
    <figcaption>Figura 2 - Tabela de decisão simplificada das recomenpensas e penalidades aplicadas ao escore do agente.</figcaption>
</figure>

``` js

class TrainerAgentPlayer extends AgentPlayer {
    constructor(character, genome, trainer) {
        super(character, genome)
        this.trainer = trainer
        this.brain.score = 0
    }

    act(decision) {
        let acc = 0

        if(decision === 0){
              // chaseTheEffect
            this.trainer.info.chase_effect += 1
            if (this.isEnvironmentEffectGoodToCollect()) {
                acc += 1
            }

            if (this.isAgentEffectGoodToAttack()) {
                acc -= 1
            }
        } else if (decision === 1){
            // chaseTheOpponent
            this.trainer.info.chase_opponent += 1
            if (this.isAgentAtAdvantage()) {
                acc += 1
            }
            if (this.isOpponentEffectGoodToAttack()) {
                acc -= 1
            }
        } else if (decision === 2) {
            // runOfTheOpponent
            this.trainer.info.run_away += 1
            if (this.isAgentAtAdvantage()) {
                acc -= 1
            }

            if (this.isOpponentNear()) {
                acc += 1
            }
        } else {
            // doNothing
            this.trainer.info.do_nothing += 1
        }


        const effect = this.character.effect
        if (effect) {
            acc += effect.power
        }

        this.brain.score += acc
        this.trainer.setHighScore(this.brain.score)
        super.act(decision)
    }
}

```

Os indivíduos de cada geração são distribuídos em pares, assim para uma população de 100 genomas, 50 batalhas devem ser criadas. 
Durante a execução dos treinamentos alguns agentes podem terminar a batalha muito rápido (capturando o efeito Death, por exemplo)	ou ficarem indefinidamente jogando se não realizarem ataques e coletarem efeitos, já que o jogo não possui algum tipo de tempo limite. 
Para isso a classe TrainerBattle utiliza uma propriedade extra chamada *fitness*, utilizada justamente para controlar o limite de iterações que os agentes terão para tentar alcançar o objetivo de conseguirem o melhor escore. Esta variável se inicia com um valor inteiro que é decremento a cada iteração, enquanto avalia-se o esgotamento da mesma. Determinado que o fitness está liquidado, então ambos jogadores devem ser considerados perdedores. O impacto disso é que irão receber um escore negativo e por consequência suas changes de reprodução minimizadas.

###  Resultados

Foram realizados treinos com um total de 1000 gerações e os resultados apontaram que, inicialmente, cada geração conseguia superar o maior escore das gerações passadas. A partir de certo ponto o aprendizado se manteve estável, sem grandes melhorias no higher score.
A última geração foi então persistida para ser utilizada durante o jogo.

### Trabalhos futuros

Algumas funcionalidades novas e correções que podem/devem ser implementadas:
* Completar a tabela de decisão com mais entradas para melhorar as percepções do agente e torná-lo mais racional;
* Adição de animações, skins, efeitos sônoros, etc;
* Mais um modo de jogo multiplayer cliente-servidor utilizando Socket.io;
* Suporte para telas pequenas.
e tudo que a critividade permitir...
