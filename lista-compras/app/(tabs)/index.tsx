import Contenedor from "../../components/Contenedor";
import TituloDeLaPagina from "../../components/TituloDeLaPagina";
import FormularioParaItemNuevo from "../../components/FormularioParaItemNuevo";
import ListaDeCompras from "../../components/ListaDeCompras/ListaDeCompras";
import usarItemsDeCompra from "../../hooks/usarItemsDeCompra";

export default function App() {
  const { items, eliminarItem, cambiarItem, agregarItem } =
    usarItemsDeCompra();

  return (
    <Contenedor>
      <TituloDeLaPagina />

      <ListaDeCompras
        items={items}
        alPresionarSobreUnItem={cambiarItem}
        alMantenerPresionSobreUnItem={eliminarItem}
      />

      <FormularioParaItemNuevo
        alCompletarFormulario={agregarItem} // 🔥 clave
      />
    </Contenedor>
  );
 }