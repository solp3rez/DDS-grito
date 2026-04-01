import { FlatList, Text } from "react-native";
import ItemDeCompra from "./ItemDeCompra";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function ListaDeCompras({
  items,
  alPresionarSobreUnItem,
  alMantenerPresionSobreUnItem,
}: {
  items: Item[];
  alPresionarSobreUnItem: (id: string) => void;
  alMantenerPresionSobreUnItem: (id: string) => void;
}) {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <ItemDeCompra
          item={item}
          alPresionar={alPresionarSobreUnItem}
          alMantener={alMantenerPresionSobreUnItem}
        />
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Sin productos. ¡Agregá el primero!
        </Text>
      }
    />
  );
}