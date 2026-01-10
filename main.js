class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.id = 'generator-btn';

    const numbersContainer = document.createElement('div');
    numbersContainer.id = 'lotto-numbers-container';

    const style = document.createElement('style');
    style.textContent = `
      #generator-btn {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 20px;
        border: none;
        border-radius: 8px;
        background-color: #4CAF50;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s, transform 0.2s;
      }

      #generator-btn:hover {
        background-color: #45a049;
        transform: translateY(-2px);
      }

      #lotto-numbers-container {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .lotto-number {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersContainer);

    button.addEventListener('click', () => {
      numbersContainer.innerHTML = '';
      const numbers = new Set();
      while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
      }

      const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];
      let colorIndex = 0;

      Array.from(numbers).sort((a, b) => a - b).forEach(number => {
        const lottoBall = document.createElement('div');
        lottoBall.classList.add('lotto-number');
        lottoBall.textContent = number;
        lottoBall.style.backgroundColor = colors[colorIndex % colors.length];
        colorIndex++;
        numbersContainer.appendChild(lottoBall);
      });
    });
  }
}

customElements.define('lotto-generator', LottoGenerator);
