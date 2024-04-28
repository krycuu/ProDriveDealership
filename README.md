
# ProDrive Dealership

Aplikacja do sprzedaży samochodów 


## Autor

- [@krycuu](https://github.com/krycuu)


## Uruchamianie projektu lokalnie

1. Najpierw sklonuj ten projekt na swój komputer. Możesz to zrobić za pomocą polecenia git clone w terminalu:


```bash
  git clone https://github.com/krycuu/ProDriveDealership.git
```
2. Po pobraniu projektu przejdź do jego katalogu w terminalu za pomocą komendy cd:

```bash
  cd ProDriveDealership
```

3. Uruchomienie Projektu

Projekt składa się z plików HTML, CSS i JavaScript, które są gotowe do uruchomienia w przeglądarce internetowej. Aby uruchomić projekt, wystarczy odpalić cały folder ProDriveDealership np. przy pomocy Visual Studio Code i urochomić Live Server.


## Instrukcja użytkowania
Aplikacja umożliwia zakup jednego spośród sześciu dostępnych samochodów.

### Wybór samochodu
- Korzystając z wyszukiwarki po prawej stronie w sekcji 'Nasza Oferta', możesz znaleźć interesujący Cię samochód.
- Po najechaniu na dane auto, karta odwraca się, ukazując jego parametry oraz przycisk "Wybierz". Po kliknięciu na niego, zostaniesz przekierowany do sekcji poniżej w celu finalizacji transakcji.
### Formularz zakupowy
- Formularz zakupowy wymaga od użytkownika podania kilku danych, takich jak rodzaj finansowania, imię, datę dostawy oraz opcjonalnie akcesoria.
- Pod formularzem znajduje się przycisk "Powrót do wyboru", który usuwa wypełnione dane i przenosi do sekcji powyżej - 'Nasza Oferta'.
### Podsumowanie zakupu
- Wybrane auto z sekcji "Nasza oferta" przenosi się do sekcji "Formularz zakupowy".
- Po prawej stronie sekcji znajduje się podsumowanie, które pokazuje cenę auta, akcesoriów oraz cenę całkowitą.
- Przycisk "Zakup" finalizuje zakup, przenosząc na górę strony pop-up z podsumowaniem transakcji.

## Dodatkowe uwagi
1. Dane są zapisywane w local storage, dlatego po odświeżeniu strony nie są usuwane.
2. Dane są usuwane dopiero po kliknięciu przycisku "Powrót do wyboru" lub po zamknięciu pop-up z podsumowaniem.
3. Formularz posiada walidację, która blokuje finalizację transakcji w przypadku nieuzupełnienia wszystkich pól. Dodatkowy warunek dotyczy pola "Imię i nazwisko", które musi być odzielone spacją.
4. Najbliższa data dostawy, jaką można ustawić, to 14 dni od dnia, w którym dokonuje się transakcji.
5. Nie można ponownie dodać tych samych akcesoriów.


## Kompatybilność z różnymi rozdzielczościami ekranu
- Aplikacja została zaprojektowana i przetestowana pod kątem kompatybilności z różnymi rozdzielczościami ekranu, w tym również na urządzeniach o nietypowych proporcjach ekranu, takich jak Galaxy Z Fold.


