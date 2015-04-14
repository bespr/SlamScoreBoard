
# Inhalt

* [Einstellungen / Konfiguration vor dem Contest](#settings)
    * [Allgemein](#settings-general)
    * [Design](#design)
        * [Hintergrundfarbe, Hintergrundbild, Ränder](#design-background)
        * [Markierungen](#design-marks)
    * [Contest - Einstellung Wettbewerb](#contest-conf)
        * [Beispiele](#contest-examples)
            * [Wettbewerb mit 2 Vorrunden mit je 5 Slammer, 3er-Finale und einer 5er-Jury (mit 2 Streichnoten - höchste/tiefste)](#contest-example1)
            * [Cup-Modus (8 - 4 - 2) ausgetragen in 2er-Paarungen](#contest-example2)
        * [Slammer eintragen](#slammer-conf)
    * [Speichern der Resultate](#saving)
* [Tipps](#tips)
    * [Wie versetze ich den Browser in den Vollbildmodus?](#fullscreen)



# Installation / Inbetriebnahme
1. Download der ZIP-Datei (Siehe [hier](https://bespr.github.io/SlamScoreBoard/) für die aktuellen Download-Links)
2. Entpacken
3. `SlamScoreBoard.html` in deinem Lieblingswebbrowser öffnen

<a name="settings"></a>
# Einstellungen / Konfiguration vor dem Contest

<a name="settings-general"></a>
## Allgemein
![start](img/48_icon-home.png)
Wenn du SlamScoreBoard.html in einem Web-Browser öffnest, erscheint der **Start-Bildschirm**. Über den Start-Bildschirm des SBB können Veranstaltungen erfasst, geladen, gespeichert und ausgewählt werden. So können vor einer Veranstalung bereits alle bekannten Details erfasst und anschliessend in eine `.ssb`-Datei gespeichert werden (gespeichert wird ins Standard-Download-Verzeichnis des Webbrowsers). Bitte beachte, dass der Veranstaltungsname auch zur Projektion verwendet wird. Wähle also einen Namen, den du auch projeziert sehen möchtest.

Zum besseren Verständnis der nachfolgenden Schritte sind hier die verschiedenen verfügbaren Bildschirme/Screens aufgelistet. Die ersten 4 Bildschirme sind nicht zur Projektion gedacht, sondern zur Erfassung von Einstellungen und Angaben zur Veranstaltung:

* Start-Bildschirm: Laden / Speichern
* Design-Bildschirm: Darstellungseingeschaften bestimmen
* Veranstaltungs-Konfiguration: Jury und Runden erfassen
* Slammer-Erfassung: Slammer-Namen eintragen

Die nächsten Bildschirme sind zur Projektion gedacht:

* Veranstaltungsbildschirm: Runden, Gruppen, Slammer und total Jurywertung anzeigen, Gruppen erfassen, Slammer Gruppen zuordnen (funktioniert noch nicht), Slammer markieren
* Runden-Bildschirm: Slammer und Jurywertung anzeigen, Slammer Gruppen zuordnen, Jurywertung eingeben, Slammer nach total Jurywertung sortieren, Slammer markieren
* Slammer-Bildschirm: Slammername anzeigen
* Pausen-Bildschirm: Veranstaltungsname und Sponsorenlogos anzeigen, Eingabe und Anzeige zusätzlicher Satz (funktioniert noch nicht).

<a name="design"></a>
## Design

![designConf](img/48_icon-designConf.png) Die **Design-Einstellungen** sind über den Start-Bildschirm erreichbar. Folgende Eigenschaften lassen sich hierbei einfach ändern:

* Schriftart
* Schriftfarbe (inkl. Rahmenfarbe)
* Hintergrundfarbe
* Hintergrundbild
* Farbe der Markierung A (Slammer-Markierung A)
* Farbe der Markierung B (Slammer-Markierung B)
* Ränder
* Sponsorenbilder

<a name="design-background"></a>
### Hintergrundfarbe, Hintergrundbild, Ränder
Sobald ein Hintergrundbild gewählt ist, spielt die Hintergrundfarbe keine Rolle mehr. Wenn man ein Hintergrundbild wählt, dass eine Art Rahmen um den Inhalt darstellt, dann ist es sinnvoll, die Rändereinstellungen so zu wählen, dass der Inhalt mit dem Hintergrundbild harmoniert.

<a name="design-marks"></a>
### Markierungen
Man kann Slammer markieren. SSB stellt zwei Markierungen zur Verfügung, schreibt aber nicht vor, was die beiden Markierungen bedeuten sollen. Das ist dann Sache des Moderatoren im Verlaufe der Veranstaltung. Meistens wird nur eine Markierung gebraucht, welche meistens die Bedeutung "eine Runde weiter" trägt.

### Sponsoren
todo

<a name="contest-conf"></a>
## Contest - Einstellung Wettbewerb

![contestConf](img/48_icon-contestConf.png) Über den Config Contest Screen kann der Wettbewerbsmodus und die Art der Bewertung (z.B. 5er-Jury) angepasst werden. Hierzu kann folgendes bestimmt werden:

* Runden und Gruppen
* Anzahl Jurymitglieder
* Mögliche Stellen nach dem Komma bei Bewertungen
* Streichnoten

<a name="contest-examples"></a>
### Beispiele

<a name="contest-example1"></a>
#### Wettbewerb mit 2 Vorrunden mit je 5 Slammer, 3er-Finale und einer 5er-Jury (mit 2 Streichnoten - höchste/tiefste)
1. Erfasse eine Veranstaltung und gehe zur Veranstalungs-Konfiguration (Konfigurieren).
2. Jurymitglieder auf 5 setzen und je Anzahl Streichnoten nach oben und nach unten auf je 1 setzen.
3. Unter Runden einmal eine Vorrunde und ein Finale erfassen.
4. Gehe zu Slammer-Erfassung und gebe alle Slammer-Namen ein.
5. Gehe zur Veranstaltung und füge zwei Gruppen der Vorrunde hinzu und eine Gruppe der Finalrunde.
6. Falls die Reihenfolge schon steht, erfasse in der Vorrund die Slammer nach deren Auftrittsreihenfolge. Die Finalrunde kannst du natürlich erst während der Veranstaltung mit Slammer komplementieren.
7. Bereit für den Veranstaltungsbeginn.

<a name="contest-example2"></a>
#### Cup-Modus (8 - 4 - 2) ausgetragen in 2er-Paarungen
1. Erfasse eine Veranstaltung und gehe zur Veranstalungs-Konfiguration (Konfigurieren).
2. Jurymitglieder auf 1 oder 0 setzen.
3. Unter Runden einmal eine Viertelfinale, ein Halbfinale und ein Finale erfassen.
4. Gehe zu Slammer-Erfassung und gebe alle Slammer-Namen ein.
5. Gehe zur Veranstaltung und füge vier Grupppen dem Viertelfinale, zwei Gruppen dem Halbfinale und eine Gruppe dem Finale hinzu.
6. Falls die Reihenfolge schon steht, erfasse im Viertelfinale die Slammer nach deren Auftrittsreihenfolge. Die weiteren Runden kannst du natürlich erst während der Veranstaltung mit Slammer komplementieren.
7. Bereit für den Veranstaltungsbeginn.


#### Wettbewerb mit 3 Vorrunden mit je 4 Slammer, kein Finale und 7er-Jury
todo

<a name="slammer-conf"></a>
## Slammer eintragen
![slammerConf](img/48_icon-slammerConf.png) todo

# Bedienung während des Contests
## Laden des Wettbewerbs
![contest](img/48_icon-contest.png) todo

## Bestimmen und ändern der Auftrittsreihenfolge
![addAndRemove](img/48_icon-addAndRemove.png) todo

## Projektion während des Auftritts

## Eingeben der Resultate
![sort](img/48_icon-sort.png) todo

## Bestimmen der Slammer der 2. oder folgenden Runden

## Pause (bzw. vor und während der Veranstaltung)
![pause](img/48_icon-pause.png) todo


<a name="saving"></a>
## Speichern der Resultate

![floppy](img/48_icon-floppy.png) Man kann die mit SSB erstellten `.ssb`-Dateien auf irgendwelche Speichermedien ablegen. Wir empfehlen **Floppy-Disketten**, weswegen wir eine solche auch als Icon für Speichern und Laden verwenden.

<a name="tips"></a>
# Tipps

<a name="fullscreen"></a>
## Wie versetze ich den Browser in den Vollbildmodus?

Du hast’s erlickt: Die Zuschauer sollten nicht deine Bookmarks und deine letzte Google-Suche sehen, sondern den Inhalt des SSB im Vollbildmodus. Wie du deinen **Browser in den Vollbildmodus** versetzen kannst, ist vom Browser und vom Betriebsystem abhängig. Die meisten gehorchen auf eine der beiden Befehle:

* `F11`
* `CTRL` + `⇧` (Umschalttaste) + `F` (bei Mac: `⌘` + `⇧` (Umschalttaste) + `F`)
