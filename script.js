document.querySelectorAll('.flash').forEach((card) => {
card.addEventListener('toggle', () => {
if (
card.open &&
matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
card.scrollIntoView({
behavior: 'smooth',
block: 'nearest'
});
}
});
});

// Learning progress: intentionally local to this browser.
const doneButtons = [
...document.querySelectorAll('.done-btn')
];

const progressBar = document.querySelector('.progress-track i');
const progressText = document.querySelector('[data-progress-text]');

const key = 'html-course-done-v2';

let done = new Set(
JSON.parse(localStorage.getItem(key) || '[]')
);

const paint = () => {
doneButtons.forEach((btn) => {
const on = done.has(btn.dataset.lesson);

btn.classList.toggle('is-done', on);

btn.setAttribute(
'aria-pressed',
String(on)
);

btn.textContent = on
? '✓ تکمیل شد'
: '✓ انجام شد';
});

const pct = Math.round(
done.size / 12 * 100
);

if (progressBar) {
progressBar.style.width =
Math.max(8.33, pct) + '%';
}

if (progressText) {
progressText.textContent =
done.size + ' از ۱۲ درس';
}
};

doneButtons.forEach((btn) => {
btn.addEventListener('click', () => {
const id = btn.dataset.lesson;

if (done.has(id)) {
done.delete(id);
} else {
done.add(id);
}

localStorage.setItem(
key,
JSON.stringify([...done])
);

paint();
});
});

paint();

// Native anchor navigation with a gentle active-state hint.
const lessons = [
...document.querySelectorAll('.lesson')
];

const observer = new IntersectionObserver(
(entries) =>
entries.forEach((e) => {
if (e.isIntersecting) {

document
.querySelectorAll('.toc a')
.forEach((a) =>
a.removeAttribute('aria-current')
);

const a = document.querySelector(
'.toc a[href="#lessons"]'
);

if (a) {
a.setAttribute(
'aria-current',
'page'
);
}
}
}),
{
rootMargin: '-25% 0px -65% 0px'
}
);

lessons.forEach((x) => {
observer.observe(x);
});