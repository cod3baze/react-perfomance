import { useMemo, useState } from "react";
import { Item } from "./components/Item";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  function addItemToList() {
    setItems([...items, `Item ${items.length}`]);
  }

  const countItemsWithOne = useMemo(
    () => items.filter((item) => item.includes("1")).length,
    [items]
  );

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItemToList} type="button">
          add
        </button>
        <ul>
          {items.map((item) => (
            <Item key={item} title={item} />
          ))}
        </ul>
      </div>
      <div>Contagem: {countItemsWithOne}</div>
    </div>
  );
}

export default App;
