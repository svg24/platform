const header = document.querySelector('.header');
let tempHeader = null as HTMLElement | null;

function isHeaderFixed(): boolean {
  return !!(header?.classList.contains('header_fixed'));
}

function fixHeader(): void {
  header?.classList.add('header_fixed');
}

function unfixHeader(): void {
  header?.classList.remove('header_fixed');
}

function createTempHeader(): void {
  tempHeader = document.createElement('div');
  tempHeader.style.height = `${header?.clientHeight}px`;

  header?.before(tempHeader);
}

function removeTempHeader(): void {
  tempHeader?.remove();
}

if (window.innerHeight < document.body.clientHeight) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      if (isHeaderFixed()) return;
      createTempHeader();
      fixHeader();
      return;
    }

    if (isHeaderFixed()) {
      removeTempHeader();
      unfixHeader();
    }
  });
}
