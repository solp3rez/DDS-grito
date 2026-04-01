import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

export default function Contenedor({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
});