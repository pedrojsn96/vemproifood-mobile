## Vem pro iFood Mobile Test

Mentos é um cara muito ocupado na vida, e preocupado com as condições climáticas. Constantemente, toma decisões na sua vida baseado nas previsões de tempo.

Você como um jovem visionário, pensando em atender pessoas como Mentos, irá fazer um app que baseado nas condições climáticas fará recomendações de pratos ele deveria pedir no iFood.

👨🏼‍🦱🌧🍕☀️🍦

### Especificações

Use a API do OpenWeather para conseguir consumir as informações de clima

Exemplo:
http://api.openweathermap.org/data/2.5/forecast?q=Campinas,br&appid=a67ef818d8c8e3945f7eee5f541c47e5

if clima = Rain {
recomendar uma Pizza 🍕
} else {
recomendar um Sorvete 🍦
}

### Extras

Se chegar até aqui foi muito fácil temos alguns desafios extras para vocês:

- Login com redes sociais
- Mapa
- Local Push notification
- Deeplink para o iFood (ifood://)
- Compartilhamento

<br/>
<b>------------------------------------------------------------------------------------------------------------------------------------------------</b>
<br/>

### DEV Notes

O desafio e seus extras pontos, tirando o Deeplink, foram feitos. \n Abaixo irei falar sobre alguns pontos quanto ao DEV dessa desafio.

### Versão do node usada 🤔?

8.11.3

### npm our yarn 🤔?

yarn 💜

### Porque não foi feito o Deeplink para o iFood 🤔?

Entendo sim oq seria um Deeplink, no caso aqui deveria ser feito, quando ele clica-se no botão <b>Comprar no iFood</b>, ele deveria abrir o app do iFood, porem, como informado tentei usar o nickname do Deeplink informado <b>ifood://</b>, porem não obtive sucesso, acredito que para abrir de app (RN) para outro app, ele precisa de mais algum parâmetro, pois quando eu manda pelo, ele chegava no browser como <b>ifood//</b>, sem o <b>:</b> no caso, então, resolvi focar nos demais extras. Porem, no click do botão de
<b>Comprar no iFood</b> coloquei ele para abrir a pagina web do iFood na rota [lista-restaurantes](https://www.ifood.com.br/lista-restaurantes) que já ajuda, embora não seja o ideal, pois não seria um real Deeplink, ao meu ver, é melhor do que nada.

### Notificação APENAS no Android, Porque 🤔?

Como você(s) deve(m) saber, para fazer o Push Notification no iOS, é necessário possuir uma conta de DEV (💸 💵), para conseguir os <b>Certificados e Profiles</b>, como não tenho essa conta DEV (💸 💵), então não deu para eu fazer , pois até mesmo para testar e necessário estar no Device, coisa que sem a conta de DEV (💸 💵) não é possível.
Resumindo, Notificações apenas no Android, pois nele consigo de forma free \o/

<br/>

## Tech Stack

- [React Native](https://github.com/facebook/react-native)

## Libs usadas

- [React Native Device Info](https://github.com/react-native-community/react-native-device-info) > Nota: Para pegar algmas informações do device em uso (Ex: hasNotch = iPhone X +++)
- [React Native FBSDK](https://github.com/facebook/react-native-fbsdk) > Nota: Para conseguir o login com o facebokk #RedeSocial
- [React Native Location](https://github.com/timfpark/react-native-location#readme) > Nota: Para pegar a localização do Usuário
- [React Native Maps](https://github.com/react-native-community/react-native-maps) > Nota: Para fazer uso do mapa
- [React Native OneSignal](https://github.com/geektimecoil/react-native-onesignal) > Nota: PushNotification
- [React Native Share](https://github.com/react-native-community/react-native-share#static-values-for-social) > Nota: Para compartilhar informações usando o modulo nativo de compartilhamento
- [React Navigation](https://reactnavigation.org/) > Nota: Navegação entre telas no app.

<br/>

### Rodando o projeto localmente

- `git clone https://github.com/samuelmataraso/vemproifood-mobile.git`
- `yarn`

<b>Android 🤖</b>

Se você não tiver a variável de ambiente `ANDROID_HOME`, antes de rodar `react-native run-android`, não esqueça disso!:

- Na pasta android, crie um arquivo chamado `local.properties`
- Dentro do arquivo, adicione essa linha `sdk.dir = /Users/youruser/Android/sdk/patch`

<b>iOS 🍎</b>

Depois da atualização do XCode 10, pode-se dizer que o comando `react-native link` está instável, com isso, algumas libs, estão ainda se adaptando a ele, umas delas seria a lib do facebook [React Native FBSDK](https://github.com/facebook/react-native-fbsdk), com isso, para rodar o projeto no seu Mac sem problemas (Sem dar o BUILD FAILED depois de executado o `react-native-run-ios`), e necessário fazer os seguintes pontos antes:

`0 -` Baixe o Facebook SDK [Facebook SDK](https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip), depois de feito download, faço o `unzip` dele, pegue a pasta que foi gerada e troque o nome da PASTA para `FacebookSDK`, depois de trocado o nome, pegue a pasta toda e copie ela para a pasta `Documentos` `/Users/youruser/Documents` do seu Mac, de forma que a pasta fique nesse diretório: `/Documents/FacebookSDK` <br/>
`1 -` Vá em `/Users/youruser/vemproifood-mobile/ios` <br/>
`2 -` Abra o arquivo `vemproifood.xcodeproj` <br/>
`3 -` Com o seu projeto aberto no XCode, no menu lateral esquerdo, click no seu projeto (o la de cima mesmo, o primeiro da lista, com icone da appstore) <br/>
`4 -` Depois de clicado,irá abrir uma página no meio da tela, nela procure pela guia `Build Settings` <br/>
`5 -` Depois de aberto essa Aba, dentro dela, terá subAbas, selecione `All` e `Levels` <br/>
`6 -` Depois de selecionado essas subAbas, va na barra de busca abaixo das subAbas e procure por `framework search` <br/>
`7 -` Depois de procurado e achado,na linha do nome `Framework Search Paths`, click na linha abaixo da coluna com nome `vemproifood` <br/>
`8 -` Ao clicar, será aberto uma janelinha, nela provavelmente vai ter uma linha desse modo ou parecido: `~/Documents/FacebookSDK`, se não tiver, tudo bem, se tiver, click nessa linha e troque `~/Documents/FacebookSDK` por `$(HOME)/Documents/FacebookSDK` e caso não tenha, apenas adicione essa linha `$(HOME)/Documents/FacebookSDK` <br/>
`9 -` Feito esse processo, vamos fazer esse mesmo processo feito agora, so que no arquivo `RCTFBSDK.xcodeproj`, que fica na pasta `Libraries`, vc ve essa pasta no menu esquero, uma pasta amarela com esse nome, abre ela e vc achara o arquivo xcodeproj do fbdk, achando ele, click nele. <br/>
`10 -` Achou ele ? Clicou nele ? faça novamente os passos 4 á 8. <br/>
`11 -` Feito isso, já estará tudo salvo. <br/>

Depois de todo esse processo pra <b>Android 🤖</b> e principalmente <b>iOS 🍎</b>, você poderá executar o projeto, usando um dos seguintes códigos: <br/>

- `react-native run-ios` ou `react-native run-android`

<br/>

<!-- about me -->

## About me @Dev

Me segue no Twitter: [@samuelmataraso](https://twitter.com/samuelmataraso) <br/>
Acesse meu Site: [samuelmataraso.com](https://samuelmataraso.com)

<a href="https://twitter.com/samuelmataraso" target="_blank">
<img src="https://twitter.com/samuelmataraso/profile_image?size=original" height="100" /></a>

<!-- about me  END -->
