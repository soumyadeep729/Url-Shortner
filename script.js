document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const shortenerContainer = document.getElementById('shortener-container');
    const loginForm = document.getElementById('login-form');
    const shortenerForm = document.getElementById('shortener-form');
    const logoutBtn = document.getElementById('logout-btn');
    const urlList = document.getElementById('url-list');
    const resultDiv = document.getElementById('result');
    const loginError = document.getElementById('login-error');

    
    const validUsername = 'Soumyadeep';
    const validPassword = '12345';

    
    if (localStorage.getItem('loggedIn') === 'true') {
        showShortener();
    }

   
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('loggedIn', 'true');
            showShortener();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    
    shortenerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const longUrl = document.getElementById('long-url').value;
        const shortCode = generateShortCode();
        const shortUrl = `short.ly/${shortCode}`;

        
        const urls = JSON.parse(localStorage.getItem('urls') || '[]');
        urls.push({ long: longUrl, short: shortUrl });
        localStorage.setItem('urls', JSON.stringify(urls));

        resultDiv.innerHTML = `<strong>✨ Shortened URL:</strong> ${shortUrl}`;
        resultDiv.classList.remove('result');
        void resultDiv.offsetWidth; 
      resultDiv.classList.add('result');

        displayUrls();
    });

    
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('urls');
        showLogin();
    });

    
    function showShortener() {
        loginContainer.classList.add('hidden');
        shortenerContainer.classList.remove('hidden');
        displayUrls();
    }

    function showLogin() {
        shortenerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        resultDiv.textContent = '';
        urlList.innerHTML = '';
    }

    function generateShortCode() {
        return Math.random().toString(36).substr(2, 6);
    }

    function displayUrls() {
        const urls = JSON.parse(localStorage.getItem('urls') || '[]');
        urlList.innerHTML = '';
        urls.forEach(url => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${url.long} → <a href="${url.long}" target="_blank">${url.short}</a></span>`;
            urlList.appendChild(li);
        });
    }
});
