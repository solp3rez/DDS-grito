import { Text, StyleSheet } from "react-native";

export default function TituloDeLaPagina() {
  return <Text style={styles.title}>Lista de Compras</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
});