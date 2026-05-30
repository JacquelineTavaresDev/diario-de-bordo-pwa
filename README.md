# Diário de Bordo PWA

Aplicação desenvolvida como Progressive Web App (PWA) para registro de anotações de viagem.

## Funcionalidades

* Adicionar entradas com título, descrição e data.
* Visualizar registros cadastrados.
* Excluir entradas.
* Armazenamento local utilizando LocalStorage.
* Funcionamento offline através de Service Worker.
* Instalação como aplicativo em dispositivos compatíveis.

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Service Worker
* Web App Manifest

## Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/JacquelineTavaresDev/diario-de-bordo-pwa.git
```

2. Abra a pasta do projeto.

3. Execute um servidor local.

Exemplo utilizando VS Code:

* Instale a extensão Live Server.
* Clique com o botão direito em `index.html`.
* Selecione "Open with Live Server".

## Como Testar o PWA

1. Abra o projeto pelo navegador.
2. Acesse as Ferramentas do Desenvolvedor (F12).
3. Vá para a aba Application.
4. Verifique:

   * Manifest
   * Service Workers
   * Cache Storage

## Teste Offline

1. Abra o projeto.
2. Pressione F12.
3. Vá em Network.
4. Marque a opção Offline.
5. Recarregue a página.

O aplicativo deverá continuar funcionando utilizando os arquivos armazenados em cache.
