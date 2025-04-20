export const getFoods = async (restaurant, meal, diet, ingredients) => {
    console.log('External function called with values:', restaurant, meal, diet, ingredients);
  
    try {
        const response = await fetch(`http://localhost:3001/${restaurant}`);
        
        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }
    
        const data = await response.json();
        //   console.log('Fetched data from /glasgow:', data);
        
        
        const myMeal = data.find(item => item.mealName === meal);
        if (!myMeal) {
            console.error(`Meal "${meal}" not found in the data.`);
            return [];
        }
        const items = myMeal.items;
        var allergyRemoved = []

        // Filter based on allergens
        items.forEach(item => {
            let shouldInclude = true;

            diet.forEach(d => {
                if (d.includes('No')) {
                    item.allergens.forEach(allergen => {
                        if (allergen === `Contains ${d.split(/ (.+)/)[1].trim()}`) {
                            shouldInclude = false;
                        }
                    });
                } else if (!item.allergens.includes(d)) {
                    shouldInclude = false;
                }
            });

            if (shouldInclude) {
                allergyRemoved.push(item);
            }
        });

        var final = []
        // Filter based on ingredients
        allergyRemoved.forEach(item => {
            const containsIngredient = ingredients.some(ingredient => {
                if (item.ingredients.toLowerCase().includes(ingredient.toLowerCase())) {
                    console.log(`Item ${item.name} contains the ingredient ${ingredient}`);
                    return true;
                }
                return false;
            });

            if (!containsIngredient) {
                final.push(item);
            }
        });

        // allergyRemoved = allergyRemoved.filter(item => {
        //     const itemIngredients = item.ingredients.toLowerCase();
        //     return !ingredients.some(ingredient => itemIngredients.includes(ingredient.toLowerCase()));
        // });
        
        return final;
  
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      return [];
    }
  };
  