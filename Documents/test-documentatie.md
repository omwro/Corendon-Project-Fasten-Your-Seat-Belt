# Testplan voor Corendon matching webapplicatie
**Team**: Team 3  
**Versie**: 1  
**Datum**: 13-12-2018

**Teamleden**:
- 500802749, [Safak]
- 500802407, [Arfeen]
- [500802898], [Omer]
- [500760138], [Fejsal]
- [500802406], [Mikail]

# Inleiding
Het doel van dit document is dat we een test run gaan maken voor onze webapplicatie en hiervan de resulaten noteren en oplossen

# System Test
Hieronder volgen de test cases die beschikbaar zijn voor een System Test van de website. 

System Tests worden uitgevoerd om te garanderen dat de website in zijn geheel naar behoren functioneert en zijn daarom zeer gedetailleerd uitgewerkt, inclusief alternatieve scenario's waar nodig.

## [ID]: Log in
**Test Case ID:** [ST_001]  
**Test Case Titel:** Gebruiker login  
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: pre-made account gemaakt


### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 1 |klik op 'inloggen' | - | website toont een pagina met daarop een formulier waar je als gebruiker je email, wachtwoord en een knop met "inloggen" krijgt| 
| 2 | vul het formulier in en kik op inloggen | email=test@hotmail.com, wachtwoord=onzin123| website vertoont homepage met als gebruiker de ingevoerde achternaam(rechtsboven)|
 

### Extensie Scenario - [Branch Stap] - [(Gebruiker)foutieve invoer]
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| [Branch Stap].1 | gebruiker vult geen gegevens in en klikt op "inloggen" | - | website geeft een waarschuwing dat je een gebruikersnaam en wachtwoord nodig hebt|
| [Branch Stap].2 | gebruiker vult alleen email en klikt op inloggen | test@hotmail.com | website geeft een waarschuwing dat je een wachtwoord nodig hebt | 
| [Branch Stap].3 | gebruiker vult alleen wachtwoord in en klikt dan op inloggen | onzin123| website geeft een waarschuwing dat je een email nodig hebt  |
| [Branch Stap].4 | gebruiker vult email en wachtwoord in | test@hotmail.com, test123 | website geeft een waarschuwwing dat er een ongeldige email en/of wachtwoord is gegeven |

Ga verder met stap [2].

### Extensie Scenario - [Branch Stap] - [test met de pre-made account]
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| [Branch Stap].1 |gebruiker vult de formulier in en klikt dan op "inloggen" | email=test@hotmail.com, wachtwoord=onzin123| website verwijst de gebruiker naar de home page waar hij als gebruiker is ingelogd(dat is te zien aan de gebruikersnaam rechtsboven)|


## [ID]: Registreren
**Test Case ID:** [ST_002]  
**Test Case Titel:** Gebruiker registreert  
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: Geen

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 1 | Gebruiker klikt op de de knop "klik hier"| - | website verwijst de gebruiker naar de registratie page waar er een formulier is met email,wachtwoord,naam etc|
| 2 |gebruiker vult het formulier in en klikt dan op de knop registreren|Voornaam=Arfeen, Achternaam=Siddique,Geboortedatum=10-01-2000, E-mail=fejsal12@hotmail.com, Wachtwoord=arfeen, Wachtwoord (herhalen)=arfeen123|website verwijst de gebruiker naar de homepage waar hij dan is ingelogd.(te zien aan de achternaam van de gebruiker rechtsboven)|
| 3 | gebruiker vult in de registratie page alles in en klikt op registreren knop | ... | de informatie van de gebruiker is te zien in de profielsetting |

### Extensie Scenario - [Branch Stap] - [(Gebruiker)foutieve invoer]
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| [Branch Stap].1 | gebruiker voert bij email een onzin email in | arfeen!hotmail.com | website geeft een waarschuwing dat je een ongeldige email hebt gegeven|
| [Branch Stap].2 | gebruiker vult bij wachtwoord een wachtwoord in waar hij geen symbolen of andere karakters gebruikt | fejsal| website geeft een waarschuwing dat je een wachtwoord nodig hebt met minimaal aantal karakters | 

## [ID]: wachtwoord vergeten
**Test Case ID:** [ST_003]  
**Test Case Titel:** Wachtwoord vergeten 
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: pre-made account(test@hotmail.com)

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-| 
| 1 | gebruiker klikt op de knop "Wachtwoord vergeten?"  | - | website verstuurt de gebruiker naar de wachtwoord vergeten pagina en laat een kleine formulier aan de gebruiker zien |
| 2 | gebruiker vult de formulier(wachtwoord en opnieuw de wachtwoord bij wachtwoord vergeten) in en klikt op "verstuur" | wachtwoord=nieuwtest123| de website verstuurt de gebruiker een bericht met "uw wachtwoord is veranderd",nadat hij op versturen heeft geklikt|
| 3 | gebruiker gaat terug naar homepage en logt in met de nieuwe wachtwoord en klikt op login| Wachtwoord=nieuwtest123, email=test@hotmail.com | de gebruiker wordt nadat hij alles heeft ingevuld en op versturen heeft geklikt terug naar de home page gestuurd waar hij weer is ingelogd als gebruiker(te merken aan de achternaam rechts boven) |


## Extensie Scenario - [Branch Stap] - [foutieve invoering ]
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| [Branch Stap].1 |gebruiker typt een wachtwoord in met geen symbolen of andere tekens en klikt op "verstuur"| Wachtwoord = tester3000| website geeft de gebruiker een waarschuwing dat de wachtwoord niet voldoet aan de requirements van een wachtwoord(bv geen gebruik tekens of geen cijfers) |
| [Branch Stap].2 |de gebruiker typt bij de eerste vak "wachtwoord" de wachtwoord van zijn account en bij de tweede vak"wachtwoord vergeten" dezelfde wachtwoord maar dan met een foutje erin | Wachtwoord=test123,Wachtwoord vergeten= tests123 |de website zal de gebruiker waarschuwen dat de wachtwoorden niet met elkaar over een komen (de gebruiker kan het dan weer proberen tot het goed gaat)|

## [ID]: chat
**Test Case ID:** [ST_004]  
**Test Case Titel:** chat 
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: geen

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-| 
| 1 | gebruiker start een chat met een potentiële partner en typt wat in de input van de chat en drukt dan op enter|input gebruiker = "hallo"|de input van de gebruiker wordt zichtbaar in de chatlogs en hoort aan de rechterzijde van de chatlogs te komen|
| 2 | vervolg van stap 1| " hallo" | gebruiker met wie er wordt gesproken ziet het bericht " hallo " dat gestuurd is naar hem |
 
### Extensie Scenario - [Branch Stap] - [foutjes chat]
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-| 
| [Branch Stap].1 | gebruiker typt wat in de input bar en drukt op enter  | input= "hello"| de tekst komt in de chatlog en de input bar voorheen "hallo" instond is nu weer leeg |
| [Branch Stap].2 | de gebruiker heeft tekst geschreven en  de verzend knop ingedrukt    | input= "hello" | de chatlogs hoort nu automatisch naar beneden te scrollen naar de nieuwe bericht die nu in de chalog is te zien|


## [ID]: homepage
**Test Case ID:** [ST_005]  
**Test Case Titel:**homepage 
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: geen


## Main Scenario
| Stap | Omschrijving |invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker komt zonder account op de home page en klikt op de knop "account maken" | ... | website brengt de gebruiker gelijk naar de registreren pagina waar hij een account kan maken |
| 2 | gebruiker klikt op de knop (met of zonder account) op de knop "kijk naar leuke bestemming"  | ... | de website brengt de gebruiker naar de bestemmingen pagina waar hij uit verschillende bestemmingen kan kiezen |
| 3 | gebruiker (met gemaakte account) klikt op de knop ""zoek een partner"  | ... | website brengt de gebruiker naar de potentiële partners pagina waar de gebruiker kan kiezen met wie hij mogelijk op vakantie wilt|
| 4 | gebruiker klikt op 1 van de meest bezochten bestemmingen die onder in de homepage pagina zitten(die bestaan uit de meest bezochten plekken) | ... | de website verwijst de gebruiker naar de bestemmingen pagina waar de gebruiker op heeft geklikt|

 ## [ID]: Filtersystemen 
**Test Case ID:** [ST_006]  
**Test Case Titel:**Filter
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: is al ingelogd

## [filtersysteem]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | de gebruiker vult het filtersysteem in op basis van zijn informatie en bijzonderheden en klikt op filtreer | ... | de website stuurt je naar de page op basis van de informatie die de gebruiker in de filtersysteem heeft ingevoerd |
| 2 |de gebruiker voert maar 1 onderwerp van de filtersysteem en klikt op filtreer | ... | de website brengt de gebruiker op basis van de ingevoerde onderwerp naar de page die dat onderwerp bevat|
 
# System Test
 ## [ID]: registreren
**Test Case ID:** [ST_001]  
**Test Case Titel:**registreren
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: none

## [registreren]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker ziet formulier om een account te maken voor zich | Voornaam:zemmel, Achternaam:zemmel, Geboortedatum:10-01-2000, email:zemmel@hotmail.com, Wachtwoord:zemmel123 | account wordt aangemaakt en gebruiker krijgt de optie om gelijk in te loggen |
| 2 | gebruiker vult niet het gehele formulier in | geen email gegeven | website geeft foutmelding dat je wat bent vergeten(in dit geval email) |

 ## [ID]: inloggen
**Test Case ID:** [ST_002]  
**Test Case Titel:**inloggen
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: pre-made account

## [inloggen]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker vult inloggegevens in | email: zemmel@hotmail.com, wachtwoord:zemmel123 | gebruiker wordt naar de homepage gebracht gebracht als gebruiker(te zien rechtsboven aan de naam)|
| 2 | gebruiker voert foute wachtwoord in bij email | email: zemmel123@hotmail.com, wachtwoord: blahblah123 | er wordt een foutmelding gegeven dat er een onjuiste wachtwoord | 
| 3 | gebruiker voert onjuiste email bij de wachtwoord| email: blahblah@hotmail.com, wachtwoord:zemmel123 | er wordt een foutmelding gegeven dat er een onjuiste wachtwoord is gegeven |
| 4 | gebruiker klikt (zonder gemaakte account) op de knop " maak een account " | ... | gebruiker wordt naar de registratie page gebracht | 
| 5 | gebruiker log uit | ... | gebruiker ziet de home page met alle functies die je hebt als je niet bent ingelogd(zoals maak een account)|


## [ID]: homepage
**Test Case ID:** [ST_003]  
**Test Case Titel:**homepage
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: pre-made account 

## [homepage]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de knop " kijk naar leuke bestemming"| ... | gebruiker wordt naar de bestemmingen page gebracht |
| 2 | gebruiker klikt op de knop "zoek een partner"| ... | gebruiker wordt naar "Potential Partners" page gebracht |
| 3 | gebruiker klikt op 1 van de meest populaire bestemmingen | ... | gebruiker wordt naar de specifieke bestemming page gebracht(dus als hij op Parijs heeft geklikt dan wordt hij naar Parijs page gebracht ) |

## [ID]: bestemming 
**Test Case ID:** [ST_004]  
**Test Case Titel:**bestemming 
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:--

## [bestemming]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op 1 van de zichtbare bestemmingen | Parijs/Frankrijk | gebruiker wordt naar de bestemmingen page van Parijs/Frankrijk gebracht |
| 2 | gebruiker klikt op de Parijs/Frankrijk bestemmingen page op de knop "boek nu" | ... | gebruiker ziet dat hij toegevoed is aan deze reis |
| 3 | gebruiker vult de filtersysteem in en klikt op de knop "Filter toepassen" | land: Amerika, Populariteit: 5sterren, Prijsklassen: tot 300euro | gebruiker krijgt op basis van de filtersysteem new York/Amerika te zien | 

## [ID]: Potential Partners 
**Test Case ID:** [ST_005]  
**Test Case Titel:**Potential Partners
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:-pre-made account 

## [Potential Partners]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de gebruiker Frank Thijmen| ... | gebruiker wordt naar de pagina van Frank Thijmen gebracht( je ziet al zijn openbare gegevens) |
| 2 | gebruiker klikt op de knop "Verstuur een verzoek" | ... | gebruiker ziet nadat hij op de knop heeft geklikt, dat de knop verdwijnt en dat er staat " verstuurd" |
| 3 | gebruiker gaat naar een gebruiker die al een potentiele partner heeft | ... | gebruiker ziet geen knop met "Verstuur een verzoek" | 

## [ID]: Contact  
**Test Case ID:** [ST_006]  
**Test Case Titel:**Contact 
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:--

## [Contact]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de knop "soort probleem" en klikt op chat en voert wat voor klacht hij heeft | "chat achtergrond is grappig" | gebruiker krijgt een bericht dat zijn bericht verstuurd is en krijgt de mogelijkheid om terug te gaan naar de homepage |
| 2 | gebruiker kiest niks bij "soort probleem " en schrijft weer een bericht | "chat achtergrond is grappig" | gebruiker krijgt een waarschuwing dat je wat bent vergeten |
| 3 | gebruiker kiest bij "soort probleem " chat en schrijft niks in de bijlagen | ... | gebruiker krijgt een waarschuwing dat hij wat vergeten is | 

## [ID]: Help
**Test Case ID:** [ST_007]  
**Test Case Titel:**Help
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:--

## [Help]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de eerste probleem | ... | gebruiker krijgt het antwoord beneden de vraag te zien |

## [ID]: Profile page 
**Test Case ID:** [ST_008]  
**Test Case Titel:**Help
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:--

## [profile page]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de knop profile page(rechtsboven bij de profile foto) | ... | gebruiker komt op zijn eigen page waar zijn informatie staat |
| 2 | gebruiker klikt op de knop "bewerk mijn pagina" | ... | gebruiker komt op een pagina waar hij zijn profile gegevens kan veranderen |
| 3 | gebruiker veranderd gegevens land en telefoonnummer  en klikt op de knop "Aanpassen"| land: nederland, tel:0612345844 | gebruiker ziet op zijn profile page dat zijn gegevens zijn veranderd |
 
## [ID]: Berichten  
**Test Case ID:** [ST_009]  
**Test Case Titel:**berichten
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:andere gebruiker

## [berichten]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 |  gebruiker Omer stuurt naar gebruiker test een verzoek | ... | test gebruiker ziet in berichten Omer zijn verzoek en kan het accepteren of declineren | 

## [ID]: Chat 
**Test Case ID:** [ST_010]  
**Test Case Titel:**Chat
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities:--

## [berichten]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker stuur een bericht naar Omer | hallo | Omer en de gebruiker zien in hun chatbox het woordje hallo te voorschijn komen |
| 2 | gebruiker voegt iemand toe als vriend | Edward toegevoegd | gebruiker ziet Edward nu in zijn Potentiële Partners list bij chat, en kan een chat beginnen |
| 3 | gebruiker klikt op "Verstuur" zonder wat te typen | ... | gebruiker krijgt niks in de chat te zien | 

## [ID]: Admin
**Test Case ID:** [ST_011]  
**Test Case Titel:**Admin
**Test Prioriteit (Hoog/Gemiddeld/Laag): Hoog 
**Gerelateerde requirements:--  
**Pre-condities: Admin account 

## [Admin]
| Stap | Omschrijving | invoer| Verwacht resultaat |
|-|-|-|-|
| 1 | gebruiker klikt op de knop " inloggen als admin" en logt in | email: omer@erdem.nl, ww: wachtwoord | gerbuiker komt op de admin homepage | 
| 2 |  Admin klikt op de knop "gebruikers" | ... | gebruiker komt op de page waar hij kan zien waar de meeste gebruikers vandaan komen (in een staag grafiek) |
| 3 | Admin klikt op de knop "Plaatsen " | ... | gebruiker komt op de page waar hij kan zien welke plaatsen het meest bezcht zijn | 
| 4 | Admin klikt op de knop "Landen " | ... | Admin komt op de page waar hij kan zien welke landen het meest worden bezocht |
| 5 | Admin klikt op de knop "bestemmingen " | ... | Admin komt op de page waar hij alle bestemming details kan zien en veranderen/verwijderen | 





 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# Smoke Test
Hieronder volgen de test cases die beschikbaar zijn voor een Smoke Test van de website. 

Smoke Tests worden uitgevoerd na uitrol van een nieuwe versie om te garanderen dat de belangrijkste onderdelen van de website nog steeds functioneel zijn. Deze test cases zijn een stuk minder gedetailleerd dan System Tests omdat ze snel uit te voeren moeten zijn, liefst binnen 20 minuten.

# Smoke test1

## [inloggen]
| Stap | Omschrijving | Verwacht resultaat | 
|-|-|-|
| 1 | gebruiker inloggen met als "test@hotmail.com" met wachtwoord "onzin123" |   de gebruiker is ingelogd als gebruiker = Kreuger| 
| 2 |  inloggen als admin met "????" met wachtwoord = "????"  |de gebruiker is ingelogd als admin ????   | 
| 3 | wachtwoord vergeten met "test@hotmail.com"   | er wordt een email gestuurd naar test@hotmail.com dat   verwijst naar de wachtwoord veranderen pagina  | 

## [rest website]
| Stap | Omschrijving | Verwacht resultaat |
|-|-|-|
| 1 | filtersysteem wordt ingevuld  | website laat verwachte resultaten zien die in de filtersysteem zijn ingevuld | 
| 2 |  home page laat meest populaire bestemmingen zien | bestemmingen zijn de  meest populairste  | 
| 3 | er word input in de chat gestuurd |het wordt zichtbaar in de chatlog als gebruiker 1 | 
| 4 | er wordt verzoek gestuurd naar een potentiële partner | gebruiker naar wie het gestuurd werd krijgt een verzoek | 

# Smoke test 2

## [website]
| Stap | Omschrijving | Verwacht resultaat |
|-|-|-|
| 1 | gebruiker logt in met "test@hotmail.com", WW = "onzin123" | gebruiker is ingelogd als Kreuger | 
| 2 | gebruiker gebruikt het filter systeem in bestemmingen | gebruiker krijgt de verwachte resultaten op basis van de input |
| 3 | gebruiker gebruikt het filter systeem in Potentiële Partners | gebruiker krijgt op basis van de input de verwachte resultaten | 
| 4 | gebruiker stuurt een verzoek naar iemand | de persoon naar wie het werd verstuurd krijgt zijn verzoek binnen |
| 5 | gebruiker dient een klacht in | klacht wordt verstuur | pass
| 6 | gebruiker bewerkt zij n eigen profiel | veranderingen worden opgeslagen en zijn zichtbaar | 

# Smoke test 3
| Stap | Omschrijving | Verwacht resultaat | 
|-|-|-|
| 1 | admin logt in met account"email@hotmail.com" ww= wachtwoord123 | hij komt bij berichten pagina |
| 2 | chat verstuurd bericht van gebruiker | het komt in de chatlogs van de website | 
| 3 | filtersysteem wordt aangepast aan wensen van de gebruiker | krijgt resultaten op basis van de input van de gebruiker |  
| 4 | gebruiker vult registratie pagina,klikt op registreer | wordt verbonden naar home page als gebruiker |  
| 5 | gebruiker stuurt iemand een verzoek | andere gebruiker krijgt zijn verzoek in berichten |  

# Smoke test 4 
| Stap | Omschrijving | Verwacht resultaat | extra|
|-|-|-|-|
| 1 | gebruiker maakt account op de registratie pagina | gebruiker komt op de homepage met account | ... |
| 2 | gebruiker logt in met gemaakte account | gebruiker komt op de homepage met account | ... |
| 3 | gebruiker klikt op zoek een partner knop | gebruiker komt op de potentiële partner pagina | ... |
| 4 | gebruiker verstuurt een verzoek naar een potentiële partner | er staat dat zijn verzoek is gestuurd | andere gebruiker krijgt zijn verzoek binnen |  
| 5 | gebruiker filtreert op de bestemmingen pagina(hij gebruikt de filtreer functie ) | de verwachte resultaten op basis van de gebruiker is te zien | ... | 
| 6 | gebruiker gaat naar de potentiële partner pagina | gebruiker ziet alle potentiële partners met hun info | ... |
| 7 | gebruiker klikt op een potentiële partner | hij ziet de gegevens van de persoon(die openbaar zijn) | ... |
| 8 | gebruiker bewerkt zijn profiel | de bewerkte informatie is nu te zien(door iedereen als hij dat heeft aangegeven) | ... |
| 9 | gebruiker gaat naar berichten page | hij ziet berichten die naar hem zijn gestuurd en kan sommigen accepteren of weigeren | ... |
| 10 | gebruiker gaat naar chat en verstuurt een bericht | de gebruiker zelf en zijn vriend zien allebei het berichtje dat werd gestuurd | ... |



