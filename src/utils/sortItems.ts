import { Cellphone } from "@/global/store";

export default function sortItems(items: Cellphone[], type: string) {
    const sortedItems = [...items];

    if (type === "name-asc") {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "name-desc") {
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === "price-asc") {
        sortedItems.sort((a, b) => a.options[0].price - b.options[0].price);
    } else if (type === "price-desc") {
        sortedItems.sort((a, b) => b.options[0].price - a.options[0].price);
    }

    return sortedItems;
}
