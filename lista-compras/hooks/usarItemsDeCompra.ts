import { useState } from "react";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function usarItemsDeCompra() {
  const [items, setItems] = useState<Item[]>([]);

  const agregarItem = (texto: string) => {
    const textoLimpio = texto.trim();
    if (!textoLimpio) return;

    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: textoLimpio, // ✅ name
        done: false,       // ✅ done
      },
    ]);
  };

  const cambiarItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, done: !it.done } : it
      )
    );
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return { items, agregarItem, cambiarItem, eliminarItem };
}