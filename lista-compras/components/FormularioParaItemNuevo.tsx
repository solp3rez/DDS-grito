import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

export default function FormularioParaItemNuevo({
  alCompletarFormulario,
}: {
  alCompletarFormulario: (texto: string) => void;
}) {
  const [texto, setTexto] = useState("");

  const agregar = () => {
    const textoLimpio = texto.trim();

    if (!textoLimpio) return; // evitasmos aregar espacio

    alCompletarFormulario(textoLimpio); // ✅ PASA EL TEXTO
    setTexto(""); // 🧹 limpia el input
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={agregar} // ✅ enter también agrega
      />

      <Pressable style={styles.addBtn} onPress={agregar}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addTxt: {
    color: "#fff",
    fontWeight: "600",
  },
});