let menuData = null;

// Function to load menu data
async function loadMenuData() {
    try {
        const response = await fetch('menu.json');
        menuData = await response.json();
        renderMenus();
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

// Function to render menus
function renderMenus() {
    renderMainMenu();
    renderDessertMenu();
}

// Function to render main menu
function renderMainMenu() {
    const mainMenuContainer = document.getElementById('main-menu');
    const mainMenu = menuData.categories.find(cat => cat.name === "MAIN MENU");
    
    if (mainMenu) {
        mainMenuContainer.innerHTML = '';
        mainMenu.items.forEach(item => {
            const menuItem = createMenuItem(item);
            mainMenuContainer.appendChild(menuItem);
        });
    }
}

// Function to render dessert menu
function renderDessertMenu() {
    const dessertMenuContainer = document.getElementById('dessert-menu');
    const dessertMenu = menuData.categories.find(cat => cat.name === "DESSERT MENU");
    
    if (dessertMenu) {
        dessertMenuContainer.innerHTML = '';
        dessertMenu.items.forEach(item => {
            const menuItem = createMenuItem(item);
            dessertMenuContainer.appendChild(menuItem);
        });
    }
}

// Function to create a menu item
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = `menu-item ${item.available ? '' : 'unavailable'}`;

    const itemDetails = document.createElement('div');
    itemDetails.className = 'item-details';

    // Add item image
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;
    image.className = 'item-image';
    itemDetails.appendChild(image);

    // Add item text container
    const itemText = document.createElement('div');
    itemText.className = 'item-text';

    const name = document.createElement('span');
    name.className = 'item-name';
    name.textContent = item.name;
    itemText.appendChild(name);

    itemDetails.appendChild(itemText);
    menuItem.appendChild(itemDetails);

    const price = document.createElement('span');
    price.className = 'item-price';
    price.textContent = `$${item.price.toFixed(2)}`;
    menuItem.appendChild(price);

    return menuItem;
}

// Function to render popular items
function renderPopularItems() {
    const popularContainer = document.getElementById('popular-items');
    popularContainer.innerHTML = '<h2>POPULAR CHOICES</h2>';

    menuData.popular_items.forEach(item => {
        const popularItem = document.createElement('div');
        popularItem.className = `popular-item ${item.available ? '' : 'unavailable'}`;

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        const details = document.createElement('div');
        details.className = 'popular-item-details';

        const name = document.createElement('div');
        name.className = 'popular-item-name';
        name.textContent = item.name;

        const description = document.createElement('div');
        description.className = 'popular-item-description';
        description.textContent = item.description;

        const price = document.createElement('div');
        price.className = 'popular-item-price';
        price.textContent = `$${item.price.toFixed(2)}`;

        details.appendChild(name);
        details.appendChild(description);
        details.appendChild(price);

        popularItem.appendChild(img);
        popularItem.appendChild(details);
        popularContainer.appendChild(popularItem);
    });
}

// Function to show status message
function showStatusMessage() {
    const message = document.getElementById('status-message');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

// Function to update time display
function updateTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    const now = new Date();
    
    // Format time as HH:MM
    timeElement.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    // Format date as Day, Month Date
    dateElement.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}

// Function to display popular dish of the day
function displayPopularDish() {
    const popularDishDisplay = document.getElementById('popularDishDisplay');
    const currentHour = new Date().getHours();
    let popularDish;

    // Determine popular dish based on time of day
    if (currentHour >= 6 && currentHour < 11) {
        popularDish = {
            name: "Breakfast Special",
            description: "Fresh pancakes with maple syrup",
            price: "$8.99",
            available: true,
            image: "img/b1.jpeg"
        };
    } else if (currentHour >= 11 && currentHour < 15) {
        popularDish = {
            name: "Lunch Special",
            description: "Grilled chicken sandwich with fries",
            price: "$12.99",
            available: true,
            image: "img/b2.jpeg"
        };
    } else if (currentHour >= 15 && currentHour < 22) {
        popularDish = {
            name: "Dinner Special",
            description: "Herb-crusted salmon with roasted vegetables",
            price: "$24.99",
            available: true,
            image: "img/b3.jpeg"
        };
    } else {
        popularDish = {
            name: "Late Night Snack",
            description: "Cheese and crackers platter",
            price: "$6.99",
            available: false,
            image: "img/b4.jpeg"
        };
    }

    // Create and populate the dish card
    const dishCard = document.createElement('div');
    dishCard.className = `popular-dish-card ${!popularDish.available ? 'unavailable' : ''}`;
    
    dishCard.innerHTML = `
        <div class="popular-dish-image">
            <img src="${popularDish.image}" alt="${popularDish.name}">
        </div>
        <div class="popular-dish-content">
            <h4>${popularDish.name}</h4>
            <p class="description">${popularDish.description}</p>
            <p class="price">${popularDish.price}</p>
        </div>
        ${!popularDish.available ? '<div class="unavailable-overlay">Currently Unavailable</div>' : ''}
    `;

    popularDishDisplay.innerHTML = '';
    popularDishDisplay.appendChild(dishCard);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMenuData().then(() => {
        renderMenus();
        displayPopularDish();
    });
    updateTimeDisplay();
    
    // Update time every minute
    setInterval(updateTimeDisplay, 60000);
    
    // Refresh menu data and popular dish every 5 minutes
    setInterval(() => {
        loadMenuData().then(() => {
            renderMenus();
            displayPopularDish();
        });
    }, 300000);

    // Update popular dish display every hour
    displayPopularDish();
    setInterval(displayPopularDish, 3600000); // Update every hour
}); 