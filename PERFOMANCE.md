# React performance

## Reconciliation

- React funcionamento

- Sempre que um estado de um component sofre alteração, a DOM desse component vai ser recriado. não necessariamente a DOM vai ser recriado so zero.

- Sempre que o component pai renderizar os filhos também entram no novo fluxo de renderização.

-- Shallow Compare

```ts
function App() {
  // Component PAI
  const [items, setItems] = useState<string[]>([]);

  function addItemToList() {
    setItems([...items, `Item ${items.length}`]);
  }

  return (
    <div className="App">
      <div>
        <button onClick={addItemToList} type="button">
          add
        </button>
        <ul>
          /* Components filhos */
          {items.map((item) => (
            <Item key={item} title={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- Renderização

  - [x] Component cria o seu HTML
  - [x] Verificar se existe uma mudança do HTML criado para o anterior.
  - [x] Aplica o algoritmo de reconciliação _(diffing)_ para verificar mudanças

  - (diffing) algoritmo que calcula as diferenças de alteração do estado.

### Memo

- vai dizer ao component _X_ que, quando o component _Pai_ mudar, antes do component _X_ entrar no fluxo de renderização, faça uma comparação das propriedades e estados desse component _X_, e se não houver alteração nao vai entrar no fluxo de renderização.

- useCases

  - [x] Pure Functional Components
  - [x] Renders too often
  - [x] Re-renders with same props
  - [x] Medium to big sizes

  - **1** quando o component não utiliza de props externa para funcionar.
  - **2** quando o component renderiza muitas vezes.
  - **3** quando o component renderiza muitas vezes e sempre com as mesmas propriedades.
  - **4** quando os components são muito grandes.

### useMemo

- sempre que o react entra no fluxo de renderização, todo o código, **funções** são _criadas/recalculadas do zero_, mesmo se a _função_ não mudar.

- vai fazer com que calculos dentro do component não precisam ser recalculados caso a infomação que eles precisam nao tenha sido alterado.

```ts
// vai ser recalculado sempre que entrar no fluxo de renderização
const countItemsWithOne = items.filter((item) => item.includes("1")).length;

// Só vai ser recalculado se os [items] mudarem
const countItemsWithOne = useMemo(
  () => items.filter((item) => item.includes("1")).length,
  [items]
);
```

### useCallback
