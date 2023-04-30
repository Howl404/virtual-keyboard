const container = document.querySelector('.container');
const text = document.querySelector('.textarea');
let CapsLock = false;
let Shift = false;
let Alt = false;

class Key {
  constructor(firstKey, secondKey) {
    this.firstKey = firstKey;
    this.secondKey = secondKey;
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
  englishKeyName: [
    'Escape', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'Fn', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ContextMenu',
  ],
  russian: [
    'Esc', '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '⬆', 'Shift',
    'Fn', 'Ctrl', 'Win', 'Alt', 'Spacebar', 'Alt', 'Ctrl', '⬅', '⬇', '➡', 'Menu',
  ],
  russianKeyName: [
    'Escape', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'Fn', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ContextMenu',
  ],
};

const clickColor = (e) => {
  e.target.classList.add('active');
  setTimeout(() => {
    e.target.classList.remove('active');
  }, 350);
};

const removeColor = (e) => {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    Shift = false;
    document.querySelector(`.${e.code}`).classList.remove('active');
  } else if (e.code === 'AltLeft' || e.code === 'AltRight') {
    Alt = false;
    document.querySelector(`.${e.code}`).classList.remove('active');
  } else if (e.code !== 'CapsLock') {
    document.querySelector(`.${e.code}`).classList.remove('active');
  }
};

const fillText = (e) => {
  let newStr;
  let position;
  switch (e.target.innerHTML) {
    case 'Enter':
      text.value += '\n';
      clickColor(e);
      text.focus();
      break;
    case 'Tab':
      text.value += '  ';
      clickColor(e);
      text.focus();
      break;
    case 'Spacebar':
      text.value += ' ';
      clickColor(e);
      text.focus();
      break;
    case 'Backspace':
      position = text.selectionStart;
      clickColor(e);
      if (text.selectionStart === 0 && text.selectionEnd === 0) {
        return;
      }
      if (text.selectionStart === text.selectionEnd) {
        newStr = text.value.split('');
        newStr.splice(text.selectionStart - 1, 1);
        text.value = newStr.join('');
        text.focus();
        text.selectionStart = position - 1;
        text.selectionEnd = position - 1;
      } else {
        newStr = text.value.split('');
        newStr.splice(text.selectionStart, text.selectionEnd - text.selectionStart);
        text.value = newStr.join('');
        text.focus();
        text.selectionStart = position;
        text.selectionEnd = position;
      }
      break;
    case 'Del':
      clickColor(e);
      position = text.selectionStart;
      if (position !== text.value.length) {
        if (text.selectionStart === text.selectionEnd) {
          newStr = text.value.split('');
          newStr.splice(text.selectionStart, 1);
          text.value = newStr.join('');
          text.focus();
          text.selectionStart = position;
          text.selectionEnd = position;
        } else {
          newStr = text.value.split('');
          newStr.splice(text.selectionStart, text.selectionEnd - text.selectionStart);
          text.value = newStr.join('');
          text.focus();
          text.selectionStart = position;
          text.selectionEnd = position;
        }
      }
      break;
    case 'Caps':
      if (CapsLock === true) {
        document.querySelector('.CapsLock').classList.remove('active');
        CapsLock = false;
      } else if (CapsLock === false) {
        document.querySelector('.CapsLock').classList.add('active');
        CapsLock = true;
      }
      break;
    case 'Shift':
      clickColor(e);
      break;
    case 'Ctrl': case 'Fn': case 'Win': case 'Menu': case 'Alt':
      clickColor(e);
      break;
    default:
      clickColor(e);
      if (CapsLock === true || Shift === true) {
        text.value += e.target.innerHTML.toUpperCase();
      } else text.value += e.target.innerHTML;

      text.focus();
      break;
  }
};

const changeColor = (e) => {
  if (e.code === 'CapsLock') {
    if (CapsLock === true) {
      document.querySelector(`.${e.code}`).classList.remove('active');
      CapsLock = false;
    } else if (CapsLock === false) {
      document.querySelector(`.${e.code}`).classList.add('active');
      CapsLock = true;
    }
  } else if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    Shift = true;
    if (Shift === true && Alt === true) {
      if (keyboardLanguage === 'english') {
        keyboardLanguage = 'russian';
        localStorage.setItem('language', 'russian');
        const nodes = [];
        if (keyboardLanguage === 'english') {
          for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
            const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishKeyName[i]);
            nodes.push(key);
          }
        } else {
          for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
            const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russianKeyName[i]);
            nodes.push(key);
          }
        }
        container.replaceChildren();
        for (let i = 0; i < nodes.length; i += 1) {
          const div = document.createElement('div');
          div.classList.add('key');
          div.classList.add(`${nodes[i].secondKey}`);
          div.innerHTML = nodes[i].firstKey;
          div.addEventListener('click', fillText);
          document.addEventListener('keydown', changeColor);
          document.addEventListener('keyup', removeColor);
          container.appendChild(div);
        }
      } else {
        keyboardLanguage = 'english';
        localStorage.setItem('language', 'english');
        const nodes = [];
        if (keyboardLanguage === 'english') {
          for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
            const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishKeyName[i]);
            nodes.push(key);
          }
        } else {
          for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
            const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russianKeyName[i]);
            nodes.push(key);
          }
        }
        container.replaceChildren();
        for (let i = 0; i < nodes.length; i += 1) {
          const div = document.createElement('div');
          div.classList.add('key');
          div.classList.add(`${nodes[i].secondKey}`);
          div.innerHTML = nodes[i].firstKey;
          div.addEventListener('click', fillText);
          document.addEventListener('keydown', changeColor);
          document.addEventListener('keyup', removeColor);
          container.appendChild(div);
        }
      }
    } else {
      document.querySelector(`.${e.code}`).classList.add('active');
    }
  } else if (e.code === 'AltLeft' || e.code === 'AltRight') {
    Alt = true;
    document.querySelector(`.${e.code}`).classList.add('active');
    if (Shift === true && Alt === true) {
      if (keyboardLanguage === 'english') {
        keyboardLanguage = 'russian';
        const nodes = [];
        if (keyboardLanguage === 'english') {
          for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
            const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishKeyName[i]);
            nodes.push(key);
          }
        } else {
          for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
            const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russianKeyName[i]);
            nodes.push(key);
          }
        }
        container.replaceChildren();
        for (let i = 0; i < nodes.length; i += 1) {
          const div = document.createElement('div');
          div.classList.add('key');
          div.classList.add(`${nodes[i].secondKey}`);
          div.innerHTML = nodes[i].firstKey;
          div.addEventListener('click', fillText);
          document.addEventListener('keydown', changeColor);
          document.addEventListener('keyup', removeColor);
          container.appendChild(div);
        }
      } else {
        keyboardLanguage = 'english';
        const nodes = [];
        if (keyboardLanguage === 'english') {
          for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
            const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishKeyName[i]);
            nodes.push(key);
          }
        } else {
          for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
            const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russianKeyName[i]);
            nodes.push(key);
          }
        }
        container.replaceChildren();
        for (let i = 0; i < nodes.length; i += 1) {
          const div = document.createElement('div');
          div.classList.add('key');
          div.classList.add(`${nodes[i].secondKey}`);
          div.innerHTML = nodes[i].firstKey;
          div.addEventListener('click', fillText);
          document.addEventListener('keydown', changeColor);
          document.addEventListener('keyup', removeColor);
          container.appendChild(div);
        }
      }
    }
  } else {
    document.querySelector(`.${e.code}`).classList.add('active');
    if (e.code === 'Tab') {
      if (document.activeElement === document.querySelector('.textarea')) {
        text.value += ' ';
      }
      e.preventDefault();
    } else if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      e.preventDefault();
      text.value += `${document.querySelector(`.${e.code}`).innerHTML}`;
    }
  }
};

const createKeyboard = (language) => {
  const nodes = [];
  if (language === 'english') {
    for (let i = 0; i < keyboardLayouts.english.length; i += 1) {
      const key = new Key(keyboardLayouts.english[i], keyboardLayouts.englishKeyName[i], null);
      nodes.push(key);
    }
  } else {
    for (let i = 0; i < keyboardLayouts.russian.length; i += 1) {
      const key = new Key(keyboardLayouts.russian[i], keyboardLayouts.russianKeyName[i], null);
      nodes.push(key);
    }
  }
  container.replaceChildren();
  for (let i = 0; i < nodes.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('key');
    div.classList.add(`${nodes[i].secondKey}`);
    div.innerHTML = nodes[i].firstKey;

    div.addEventListener('click', fillText);
    document.addEventListener('keydown', changeColor);
    document.addEventListener('keyup', removeColor);

    container.appendChild(div);
  }
};

createKeyboard(keyboardLanguage);
