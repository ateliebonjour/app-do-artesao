function changeText() {
    const hello = document.getElementById('hello');
    if (hello.textContent === 'Hello World') {
        hello.textContent = 'Olá Mundo!';
    } else {
        hello.textContent = 'Hello World';
    }
}
