import { Category } from "./resources/Category";
import { Item } from "./resources/Item";
import { ItemList } from "./resources/ItemList";
import { List } from "./resources/List";

Item.belongsToMany(List, { through: ItemList });
List.belongsToMany(Item, { through: ItemList });
Category.hasMany(Item);
Item.belongsTo(Category);
