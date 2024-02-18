import Button from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "5585981337203";

export default function Cart() {
  const [address, setAdress] = useState("");
  const navigation = useNavigation();
  const cartStore = useCartStore();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleOrder() {
    if (address.trim().length === 0) {
      Alert.alert("Pedido", "Informe os dados de entrega");
    }

    const products = cartStore.products
      .map(
        (product) =>
          `\n ${product.quantity} x ${product.title} - ${formatCurrency(
            product.price
          )}`
      )
      .join("");

    const message = `Pedido relizado com sucesso!🤤\n\nPedido:\n ${products}\n\n🏠 Endereço: ${address}\n\n🛵 Previsão de entrega: 40-50 mins\n\nTotal:${total}\n\n💳 Forma de Pagamento:Cartão`;

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    setAdress("");
    navigation.goBack();
  }

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl text-center">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega"
              onChangeText={setAdress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPressOut={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar" href="/" />
      </View>
    </View>
  );
}
