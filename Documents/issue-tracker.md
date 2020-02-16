# [chat]
### Main Scenario
| nummer | issue | probleem | hoe verbeterd |   
|-|-|-|-| 
| 1 | reload functie | chat reload, maar alles verdwijnt en je weer op je vriendnaam klikken om de nieuwe bericht te krijgen | reload query opgelost en ervoor gezorgd dat het niet te vaak reload |
| 2 | relaties met gebruiker en vriend | er werd geen relatie tussen personen gemaakt waardoor er ook geen chatberichtenId werd gemaakt|we hebben hiervoor een query gemaakt die er voor zorgt als je op een nieuwe vriend(naam klikt) dat er een nieuwe chatberichten-ID word gemaakt  |
| 3 | algemene query fouten | query functioneerde niet goed waardoor er veel problemen kwamen naarmate er meer werd gecodeerd | verbeterd met de hulp van Omer(query's zo verbeterd dat ze likken en in de console log te zien zijn) |
| 4  | kan niet zien wie je vriend is in vriendenlijst | gebruiker kan niet zien met wie hij praat als hij op een vriendnaam klikt | .active code toegevoegd in de chat.css zodat het nu duidelijk is met wie je praat |


# [berichten]
### Main Scenario
| nummer | issue | probleem | hoe verbeterd|   
|-|-|-|-| 
| 1 | responsiveness | Bij het verkleinen van de pagina naar andere resoluties ontstond bij een te smalle pagina het probleem dat informatie op de pagina onder elkaar kwam te staan. | De divs die onder elkaar springen te totale lengte van de pagina geven met width: calc(). Dit heeft het probleem opgelost zodat de divs niet meer onder elkaar springen. |
| 2 | informatie |informatie die te lang is, bijvoorbeeld zinnen, springt buiten de vakken en zorgt voor onduidelijkheid en lelijk design | De vakken uitgebreid waar zinnen en/of veel informatie in komt te staan.| 


# [registreren]
### Main Scenario
| nummer | issue | probleem | hoe verbeterd|   
|-|-|-|-| 
|1|Foutieve invoer email|Als je een ongeldige email invoerde werd dat geaccepteerd ondanks het feit dat het geen geldige email is|If-statements gebruikt om te kijken of het "@" en ".com" of ".nl" bevat|
|2|Ongeldige geboortedatum|Accounts aanmaken waarbij je 2 jaar oud bent of dergelijke; er wordt niet gekeken naar foutive invoer|Er wordt gechecked of de verschil tussen vandaag en de ingevoerde datum groter of gelijkk is aan 18|
|3|Niet de zelfde wachtwoorden|Er wordt twee keer gevraagd naar de gewenste wachtwoord van de gebruiker en kon de gebruiker bij de 2de invoer iets ander dan bij de 1ste invoer invullen zonder dat er een probleem kwam|Nu wordt er gekeken of de wachtwoorden overeenkomen|
