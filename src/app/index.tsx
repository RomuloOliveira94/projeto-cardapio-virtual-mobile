import { CategoryButton } from "@/components/caregory-button";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { View, FlatList, SectionList, Text } from "react-native";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { useRef, useState } from "react";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";
export default function Home() {
  const cartStore = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const cartQtyItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    const sectionIndex = CATEGORIES.findIndex((item) => item === category);
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQtyItems={cartQtyItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === selectedCategory}
            onPress={() => handleSelectCategory(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white font-bold font-heading text-xl mt-8 mb-3">
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
