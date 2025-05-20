/**
 * Базовый класс для предметов в инвентаре.
 */
class InventoryItem {
    /**
     * Создает новый предмет инвентаря.
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {string} rarity - Редкость предмета (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает информацию о предмете.
     * @returns {string} Информация о предмете.
     */
    getInfo() {
        return `Item: ${this.name}, Weight: ${this.weight}kg, Rarity: ${this.rarity}`;
    }
    
    /**
     * Изменяет вес предмета.
     * @param {number} newWeight - Новый вес предмета.
     */
    setWeight(newWeight) {
        if (newWeight > 0) {
            this.weight = newWeight;
        } else {
            console.log("Weight must be a positive number.");
        }
    }
}

/**
 * Класс, представляющий обычный предмет, наследуется от InventoryItem.
 */
class Item extends InventoryItem {
    constructor(name, weight, rarity) {
        super(name, weight, rarity);
    }
}

/**
 * Класс, представляющий оружие, наследуется от InventoryItem.
 */
class Weapon extends InventoryItem {
    /**
     * Создает новое оружие.
     * @param {string} name - Название оружия.
     * @param {number} weight - Вес оружия.
     * @param {string} rarity - Редкость оружия.
     * @param {number} damage - Урон оружия.
     * @param {number} durability - Прочность оружия (от 0 до 100).
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Использует оружие, уменьшая прочность на 10.
     */
    use() {
        console.log(super.name)
        if (this.durability > 0) {
            this.durability -= 10;
        } else {
            console.log("Weapon is broken.");
        }
    }

    /**
     * Ремонтирует оружие, восстанавливая его прочность до 100.
     */
    repair() {
        this.durability = 100;
    }
}

// Пример использования
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo()); // Вывод: Item: Steel Sword, Weight: 3.5kg, Rarity: rare
sword.setWeight(4.0);
console.log(sword.getInfo()); // Вывод: Item: Steel Sword, Weight: 4.0kg, Rarity: rare

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability); // должно уменьшиться
bow.repair();

