let menuData = null;

// Function to load menu data
async function loadMenuData() {
    try {
        const response = await fetch('menu.json');
        menuData = await response.json();
        renderMenu();
        renderPopularItems();
        showStatusMessage();
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

// Function to render menu sections
function renderMenu() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');

    // Clear existing content
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    // Render categories (split between left and right columns)
    const midPoint = Math.ceil(menuData.categories.length / 2);
    
    // Left column categories
    menuData.categories.slice(0, midPoint).forEach(category => {
        leftColumn.appendChild(createMenuSection(category));
    });

    // Right column categories
    menuData.categories.slice(midPoint).forEach(category => {
        rightColumn.appendChild(createMenuSection(category));
    });
}

// Function to create a menu section
function createMenuSection(category) {
    const section = document.createElement('div');
    section.className = 'menu-section';
    
    const title = document.createElement('h2');
    title.textContent = category.name;
    section.appendChild(title);

    const items = document.createElement('div');
    items.className = 'menu-items';

    category.items.forEach(item => {
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

        items.appendChild(menuItem);
    });

    section.appendChild(items);
    return section;
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMenuData();
    updateTimeDisplay();
    
    // Update time every minute
    setInterval(updateTimeDisplay, 60000);
    
    // Refresh menu data every 5 minutes
    setInterval(loadMenuData, 300000);
}); 