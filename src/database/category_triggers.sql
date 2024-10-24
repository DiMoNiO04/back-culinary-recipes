-- Функция для увеличения счетчика при добавлении рецепта
CREATE OR REPLACE FUNCTION increment_category_count() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE categories SET count = count + 1 WHERE id = NEW.categoryId;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Функция для уменьшения счетчика при удалении рецепта
CREATE OR REPLACE FUNCTION decrement_category_count() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE categories SET count = count - 1 WHERE id = OLD.categoryId;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Триггер для добавления рецепта
CREATE TRIGGER after_recipe_insert
AFTER INSERT ON recipes
FOR EACH ROW
EXECUTE FUNCTION increment_category_count();

-- Триггер для удаления рецепта
CREATE TRIGGER after_recipe_delete
AFTER DELETE ON recipes
FOR EACH ROW
EXECUTE FUNCTION decrement_category_count();
