function shuffleNumbers() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

    const container = document.getElementById('numberContainer');
    
    container.innerHTML = '';
    
    for (let number of numbers) {
        const div = document.createElement('div');
        div.className = 'number';
        div.textContent = number;
        container.appendChild(div);
    }
}