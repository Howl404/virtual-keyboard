const container = document.querySelector('.container');
const text = document.querySelector('.textarea');

class Key {
  constructor(firstKey, secondKey, type) {
    this.firstKey = firstKey;
    this.secondKey = secondKey;
    this.type = type;
  }
}
let keyboardLanguage;

if (localStorage.getItem('language') === null) {
  keyboardLanguage = 'english';
} else keyboardLanguage = localStorage.getItem('language');

const keyboardLayouts = {
  english: [
    'Esc', '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
    'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⬆', 'Shift',
    'Fn', 'Ctrl', 'Win', 'Alt', 'Spacebar', 'Alt', 'Ctrl', '⬅', '⬇', '➡', 'Menu',
  ],
  englishSecond: [
    'Esc', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'Del',
    'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '⬆', 'Shift',
    'Fn', 'Ctrl', 'Win', 'Alt', 'Spacebar', 'Alt', 'Ctrl', '⬅', '⬇', '➡', 'Menu',
  ],
  russian: [],
  russianSecond: [],
};

const createKeyboard = (language) => {
  const nodes = [];
  if (language === 'english') {
    for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
      const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishSecond[i], null);
      nodes.push(key);
    }
  } else {
    for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
      const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russian[i], null);
      nodes.push(key);
    }
  }
  container.replaceChildren();
  for (let i = 0; i < nodes.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('key');
    div.classList.add(`key${nodes[i].firstKey}`);
    if (nodes[i].firstKey === 'Shift') {
      div.classList.add(`Shift${i}`);
    }
    div.innerHTML = nodes[i].firstKey;

    div.addEventListener('click', (e) => {
      let newStr;
      let position;
      switch (e.target.innerHTML) {
        case 'Enter':
          text.value += '\n';
          text.focus();
          break;
        case 'Tab':
          text.value += '  ';
          text.focus();
          break;
        case 'Spacebar':
          text.value += ' ';
          text.focus();
          break;
        case 'Backspace':
          position = text.selectionStart;
          if (text.selectionStart === 0) {
            return;
          }
          if (text.selectionStart === text.selectionEnd) {
            newStr = text.value.split('');
            console.log(newStr);
            newStr.splice(text.selectionStart - 1, 1);
            console.log(newStr);
            text.value = newStr.join('');
            text.focus();
            text.selectionStart = position - 1;
            text.selectionEnd = position - 1;
          } else {
            console.log(text.selectionStart);
            console.log(text.selectionEnd);
            newStr = text.value.split('');
            console.log(newStr);
            newStr.splice(text.selectionStart, text.selectionEnd - text.selectionStart);
            console.log(newStr);
            text.value = newStr.join('');
            text.focus();
            text.selectionStart = position;
            text.selectionEnd = position;
            console.log(text.selectionStart);
          }

          break;
        default:
          text.value += e.target.innerHTML;
          text.focus();
          break;
      }
    });

    container.appendChild(div);
  }
};

createKeyboard(keyboardLanguage);
