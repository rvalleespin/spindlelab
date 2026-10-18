return [...document.querySelectorAll('code')].map(e=>[e.textContent.slice(0,30), getComputedStyle(e).fontFamily, getComputedStyle(e).fontSize, getComputedStyle(e).fontWeight]);
