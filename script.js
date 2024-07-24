
const itemQuantities = {"Chips": 10,"Cola": 15,"Chocolate": 20,"Pizza": 25,"Fries": 30,"Pepsi": 35,"Frooti": 40,"Popcorn": 45,"IceCream": 50};
const itemCosts = {"Chips": 50,"Cola": 40,"Chocolate": 20,"Pizza": 70,"Fries": 60,"Pepsi": 30,"Frooti": 30,"Popcorn": 45,"IceCream": 40};

function displayPurchaseForm() {
    let purchaseForm = document.getElementById('purchase-form');
    purchaseForm.classList.remove('hidden');
    purchaseForm.style.display = 'block';
}

function updateItemValues() {
    let items = document.querySelectorAll('.item');
    items.forEach(itemElement => {
        let itemName = itemElement.querySelector('.name').textContent.replace('Name: ', '');
        if (itemCosts[itemName]) {
            itemElement.querySelector('.PerQuantity').textContent = itemCosts[itemName];
            itemElement.querySelector('.CurrentAvailable').textContent = itemQuantities[itemName];
        }
    });
}

updateItemValues();  

function generateBill() {
    let itemSelect = document.getElementById('item-name');
    let selectedItem = itemSelect.value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let amountEntered = parseFloat(document.getElementById('amount').value);

    if (!selectedItem || isNaN(quantity) || isNaN(amountEntered) || quantity < 0 || amountEntered < 0) {
        alert("Please fill in all fields correctly.");
        return;
    }
    let cost = itemCosts[selectedItem];
    let currentQuantity = itemQuantities[selectedItem];
    let totalCost = cost * quantity;
    let balanceAmount = amountEntered - totalCost;
    if (quantity > currentQuantity) {
        alert("Not enough quantity available.");
        return;
    }
    if (amountEntered < totalCost) {
        alert("Not enough money.");
        return;
    }
    itemQuantities[selectedItem] -= quantity;
    let itemElement = document.getElementById('item-' + selectedItem.toLowerCase());
    if (itemElement) {
        itemElement.querySelector('.CurrentAvailable').textContent = itemQuantities[selectedItem];
    }
    document.getElementById('bill-item').textContent = `Item: ${selectedItem}`;
    document.getElementById('bill-quantity').textContent = `Quantity: ${quantity}`;
    document.getElementById('bill-total-cost').textContent = `Total Cost: ${totalCost}`;
    document.getElementById('bill-balance').textContent = `Balance Amount: ${balanceAmount}`;
    document.getElementById('bill-popup').style.display = 'block';

    document.getElementById('full-content').classList.add('blur');
}

function closeBillPopup() {
    document.getElementById('bill-popup').style.display = 'none';
    document.getElementById('full-content').classList.remove('blur');
}










