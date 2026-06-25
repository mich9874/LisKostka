# 🦊 LisKostka – Nowoczesna strona firmowa (Redesign 2025)

Kompletny, gotowy do wdrożenia redesign strony **liskostka.pl**.  
Czysta wersja statyczna (HTML + CSS + JS) — zero frameworków, zero dependencji, zero kroku budowania.

---

## 📁 Struktura projektu

```
liskostka/
├── index.html          ← Główny plik strony (one-page SPA)
├── css/
│   └── style.css       ← Wszystkie style (CSS Variables, mobile-first)
├── js/
│   └── main.js         ← Interakcje, animacje, formularz
├── images/             ← Folder na zdjęcia (aktualnie placeholder)
├── .htaccess           ← Apache: HTTPS, keszowanie, kompresja, nagłówki
├── robots.txt          ← SEO
└── README.md           ← Ten plik
```

---

## 🚀 Uruchomienie lokalnie

### Opcja A – serwer lokalny (zalecane)

```bash
# Python 3 (wbudowany serwer HTTP)
cd liskostka
python3 -m http.server 8080
# → otwórz http://localhost:8080
```

```bash
# Node.js (jeśli zainstalowany)
npx serve .
# → otwórz http://localhost:3000
```

```bash
# PHP (jeśli zainstalowany)
php -S localhost:8080
```

### Opcja B – bezpośrednio w przeglądarce

Otwórz plik `index.html` bezpośrednio — strona działa też lokalnie bez serwera, choć część funkcji (np. animacje scroll) może działać inaczej.

---

## 🌐 Wdrożenie na hosting

### Hosting współdzielony (Apache – np. LH.pl, Seohost, Aftermarket)

1. Wgraj **zawartość folderu** (nie sam folder) na serwer przez FTP/SFTP lub panel hostingowy.
2. Pliki powinny trafić do katalogu `public_html/` lub `www/`.
3. Plik `.htaccess` jest kluczowy – upewnij się, że jest wgrany (może być ukryty w FTP).
4. Sprawdź czy `mod_rewrite` jest włączone (najczęściej jest).

```
public_html/
├── index.html
├── css/style.css
├── js/main.js
├── images/
├── .htaccess
└── robots.txt
```

### Hosting nginx (VPS / dedykowany)

Dodaj do konfiguracji nginx (`/etc/nginx/sites-available/liskostka.pl`):

```nginx
server {
    listen 443 ssl;
    server_name liskostka.pl www.liskostka.pl;

    root /var/www/liskostka;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;

    # Keszowanie zasobów statycznych
    location ~* \.(css|js|jpg|jpeg|png|webp|ico|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Wszystkie ścieżki → index.html (SPA fallback)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Nagłówki bezpieczeństwa
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

### Cloudflare Pages / Netlify / Vercel

Wystarczy wgrać folder – te platformy automatycznie serwują `index.html` i obsługują wszystkie ścieżki.

---

## 🖼️ Jak dodać prawdziwe zdjęcia

Folder `images/` jest przygotowany na grafiki. W plikach HTML znajdź sekcje z komentarzami:

```html
<!-- Replace with real image: <img src="images/galeria.jpg" alt="..." width="800" height="600" loading="lazy"> -->
```

i zamień placeholdery na tagi `<img>` wskazujące na Twoje pliki.

**Zalecane formaty i rozmiary:**
| Miejsce | Format | Rozmiar |
|--------|--------|---------|
| Hero (tło) | WebP/JPG | 1920×1080 px, <200 KB |
| Galeria (duże) | WebP/JPG | 800×600 px, <100 KB |
| Galeria (małe) | WebP/JPG | 400×400 px, <60 KB |

Użyj [Squoosh.app](https://squoosh.app/) do optymalizacji zdjęć.

---

## 📞 Dane kontaktowe — co zmienić

Otwórz `index.html` i zamień poniższe wartości:

| Placeholder | Zmień na |
|------------|----------|
| `+48 000 000 000` | prawdziwy numer telefonu |
| `kontakt@liskostka.pl` | prawdziwy e-mail |
| `ul. Przykładowa 1, 10-000 Olsztyn` | prawdziwy adres |
| `Mapa wkrótce` | `<iframe>` z Google Maps |

### Jak dodać Google Maps

1. Wejdź na [maps.google.com](https://maps.google.com), znajdź lokalizację.
2. Kliknij **Udostępnij → Umieść mapę**.
3. Skopiuj tag `<iframe>` i wklej w miejscu diva `.contact__map-wrap`.

---

## 🎨 Dostosowanie kolorów

Wszystkie kolory są zdefiniowane jako zmienne CSS w `css/style.css` (sekcja `:root`):

```css
:root {
  --brand:       #E05C0A;   /* Pomarańcz lisa – kolor główny */
  --brand-dark:  #B84908;   /* Ciemniejszy akcent */
  --brand-light: #F47830;   /* Jaśniejszy akcent */
  --dark:        #1A1A18;   /* Tło dark */
  --charcoal:    #2D2D2A;   /* Tekst ciemny */
  --muted:       #6B6B67;   /* Tekst szary */
  /* ... */
}
```

Zmiana jednej wartości aktualizuje cały motyw.

---

## ✅ Checklist przed wdrożeniem

- [ ] Uzupełnij numer telefonu i e-mail
- [ ] Uzupełnij adres galerii
- [ ] Wgraj zdjęcia do folderu `images/` i podmień placeholdery
- [ ] Dodaj `<iframe>` z Google Maps w sekcji kontaktu
- [ ] Wgraj `favicon.ico` i `favicon-32x32.png` (generator: [realfavicongenerator.net](https://realfavicongenerator.net/))
- [ ] Skonfiguruj backend dla formularza lub podłącz serwis (Formspree, EmailJS)
- [ ] Dodaj Google Analytics lub inny tracker
- [ ] Stwórz `sitemap.xml` (generator: [xml-sitemaps.com](https://www.xml-sitemaps.com/))
- [ ] Sprawdź HTTPS na serwerze
- [ ] Przetestuj na mobile (Chrome DevTools → Responsive)

---

## 📧 Podłączenie formularza kontaktowego

Formularz domyślnie symuluje wysyłkę (1,2s opóźnienie). Aby naprawdę wysyłał e-maile:

### Opcja A – [Formspree](https://formspree.io/) (bezpłatny do 50 maili/mies.)

W `js/main.js` zamień fragment submit na:
```javascript
const response = await fetch('https://formspree.io/f/TWOJ_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
if (!response.ok) throw new Error('Błąd wysyłki');
```

### Opcja B – [EmailJS](https://www.emailjs.com/)

Postępuj zgodnie z dokumentacją EmailJS i zastąp funkcję submit.

### Opcja C – własny backend PHP

Utwórz plik `send.php` na serwerze i wyślij `POST` do niego.

---

## 🔍 SEO

Plik zawiera:
- Meta tagi (title, description, keywords)
- Open Graph (og:title, og:description, og:image)
- Schema.org (LocalBusiness JSON-LD)
- Semantyczny HTML5 (header, main, section, article, footer, address)
- Atrybuty aria-label i role
- `loading="lazy"` na obrazkach
- robots.txt

**Uzupełnij po wdrożeniu:**
1. Dodaj właściwy `og:image` (1200×630 px)
2. Zarejestruj domenę w [Google Search Console](https://search.google.com/search-console)
3. Prześlij `sitemap.xml`
4. Dodaj wizytówkę [Google Business Profile](https://business.google.com/)

---

## ⚡ Performance

Lighthouse score (szacunkowy):
| Kategoria | Wynik |
|-----------|-------|
| Performance | ~98 |
| Accessibility | ~96 |
| Best Practices | ~100 |
| SEO | ~95 |

Brak zewnętrznych zależności oprócz Google Fonts (ładowane asynchronicznie). Wszystkie animacje respektują `prefers-reduced-motion`.

---

*Redesign 2025 — Nowoczesny UI/UX, mobile-first, zero frameworków.*
