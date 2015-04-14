
# Inhalt

* [Einstellungen / Konfiguration vor dem Contest](#settings)
    * [Allgemein](#settings-general)
    * [Design](#design)
        * [Hintergrundfarbe, Hintergrundbild, Ränder](#design-background)
        * [Markierungen](#design-marks)
        * [Sponsoren](#design-sponsoren)
    * [Contest - Einstellung Wettbewerb](#contest-conf)
        * [Beispiele](#contest-examples)
            * [Wettbewerb mit 2 Vorrunden mit je 5 Slammer, 3er-Finale und einer 5er-Jury (mit 2 Streichnoten - höchste/tiefste) inkl. Opferlamm-Text](#contest-example1)
            * [Cup-Modus (8 - 4 - 2) ausgetragen in 2er-Paarungen](#contest-example2)
        * [Slammer eintragen](#slammer-conf)
    * [Speichern der Resultate](#saving)
* [Bedienung während des Contests](#operator-stuff)
    * [Laden des Wettbewerbs](#loading-from-disk)
    * [Bestimmen und ändern der Auftrittsreihenfolge](#slammer-assigning)
    * [Beginn der Veranstalung](#start-of-show)
    * [Eingeben der Resultate](#enter-results)
    * [Bestimmen der Slammer der 2. oder folgenden Runden](#define-next-round)
    * [Pause (bzw. vor und während der Veranstaltung)](#pause)
* [Tipps](#tips)
    * [Wie versetze ich den Browser in den Vollbildmodus?](#fullscreen)
    * [Wie kann ich die Schriftgrösse erhöhen? Ich habe nur 4 Slammer in einer Gruppe. Diese erscheinen viel zu klein.](#correctSize)




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
* Gruppen-Bildschirm: Slammer und Jurywertung anzeigen, Slammer Gruppen zuordnen, Jurywertung eingeben, Slammer nach total Jurywertung sortieren, Slammer markieren
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

<a name="design-sponsoren"></a>
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
#### Wettbewerb mit 2 Vorrunden mit je 5 Slammer, 3er-Finale und einer 5er-Jury (mit 2 Streichnoten - höchste/tiefste) inkl. Opferlamm-Text
1. Erfasse eine Veranstaltung und gehe zur Veranstalungs-Konfiguration (Konfigurieren).
2. Jurymitglieder auf 5 setzen und je Anzahl Streichnoten nach oben und nach unten auf je 1 setzen.
3. Unter Runden einmal eine Vorrunde und ein Finale erfassen.
4. Gehe zu Slammer-Erfassung und gebe alle Slammer-Namen ein.
5. Gehe zur Veranstaltung und füge drei Gruppen der Vorrunde hinzu und eine Gruppe der Finalrunde. Wobei die erste Gruppe der Vorrunde nur das Opferlamm enthält.
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
![slammerConf](img/48_icon-slammerConf.png) Alle Namen der Slammer können vorab eingetragen werden über den Bildschirm Slammer-Erfassen. Hierzu trage einfach den Namen ins entsprechende Feld ein und drücke dann die Tab-Taste oder klicke mit der Maus irgendwo auf den Bildschirm.

<a name="saving"></a>
## Speichern der Resultate

![floppy](img/48_icon-floppy.png) Man kann die mit SSB erstellten `.ssb`-Dateien auf irgendwelche Speichermedien ablegen. Wir empfehlen **Floppy-Disketten**, weswegen wir eine solche auch als Icon für Speichern und Laden verwenden.

<a name="operator-stuff"></a>
# Bedienung während des Contests

<a name="loading-from-disk"></a>
## Laden des Wettbewerbs
![contest](img/48_icon-contest.png) Im Start-Bildschirm über den Button "Daten aus einer Datei lesen" die entsprechende ssb einlesen, falls nicht schon gemacht. Dann über Button "Auswählen" die gewünschte Veranstaltung laden.

<a name="slammer-assigning"></a>
## Bestimmen und ändern der Auftrittsreihenfolge
![addAndRemove](img/48_icon-addAndRemove.png) Falls die Slammer bereits Gruppen zugewiesen sind, kannst du die Auftrittsreihenfolge anpassen in dem du im Veranstaltungsbildschrim auf eine Gruppe klickst und anschliessend im Gruppen-Bildschirm per drag und drop die Reihenfolge der gelisteten Namen anpasst. Falls noch keine Namen erfasst sind, klicke auf "Slammer hinzufügen", dann erscheint ein Drop-down-Menu, mit welchem du Slammer einer Gruppe zuteilen kannst. Ebenfalls kannst du so Slammer aus einer Gruppe entfernen ("hinfort" Button)

<a name="start-of-show"></a>
## Beginn der Veranstalung
Üblicherweise wird der Pausen-Bildschirm gezeigt vor Veranstaltungsbeginn, nach Veranstaltungsende und während der Pause. Vom Pausenbildschirm gelangst du zur Gruppe oder zur Veranstaltung. Bei Beginn der Veranstaltung wähle "Zurück zur Veranstalung". Dadurch wird der Veranstaltungsbildschirm angezeigt, welcher eine Übersicht über alle Runden und Gruppen gibt. Kurz vor Beginn des ersten Auftritts kann dann in den Gruppen-Bildschirm gewechselt werden und von da in den Slammer-Bildschirm, welcher während des Auftritts projeziert wird.

<a name="enter-results"></a>
## Eingeben der Resultate
![sort](img/48_icon-sort.png) Ausser im Cup-Modus ist es zu empfehlen, die Resultat im Gruppen-Bildschirm einzugeben. Nach einem Auftritt wechsle in den Gruppen-Bildschirm zurück ("zurück zur Gruppe"). Dort kannst du die Bewertung eingeben. Wichtig: Dezimalstellen mit Punkt abtrennen, weiter mit Tab-Taste oder Maus.
Das Total wird berechnet sobald ins alle Wertungen eingegeben sind und z.B. ins Totalfeld geklickt wurde. Nun kannst du falls gewünscht die bereits bewerteten Slammer aufsteigend nach Punktetotal sortieren ("Slammer sortieren").

<a name="define-next-round"></a>
## Bestimmen der Slammer der 2. oder folgenden Runden
Todo

<a name="pause"></a>
## Pause (bzw. vor und während der Veranstaltung)
![pause](img/48_icon-pause.png) todo


<a name="tips"></a>
# Tipps

<a name="fullscreen"></a>
## Wie versetze ich den Browser in den Vollbildmodus?

Du hast’s erlickt: Die Zuschauer sollten nicht deine Bookmarks und deine letzte Google-Suche sehen, sondern den Inhalt des SSB im Vollbildmodus. Wie du deinen **Browser in den Vollbildmodus** versetzen kannst, ist vom Browser und vom Betriebsystem abhängig. Die meisten gehorchen auf eine der beiden Befehle:

* `F11`
* `CTRL` + `⇧` (Umschalttaste) + `F` (bei Mac: `⌘` + `⇧` (Umschalttaste) + `F`)

<a name="correctSize"></a>
## Wie kann ich die Schriftgrösse erhöhen? Ich habe nur 4 Slammer in einer Gruppe. Diese erscheinen viel zu klein.

SlamScoreBoard ist darauf ausgerichtet, dass es mit einem [Full-HD](http://de.wikipedia.org/wiki/Full_HD)-Beamer und mit ca. 8 bis 14 Slammer in einer Gruppe gut aussieht.

Wir haben darauf geachtet, dass es auch bei anderer Auflösung noch ansprechend aussieht, aber je exotischer die Anzahl Slammer oder die Beamer-Auflösung, desto schwieriger wird eine optimale Darstellung. Daneben gibt es natürlich noch weitere Faktoren, die für ein designtechnisch unausgewogenes Bild sorgen können, z.B. eine sehr grosse Anzahl Jurymitglieder, oder Slammernamen die aus gigantisch vielen Buchstaben bestehen.

Ein paar Tricks gibts natürlich dennoch:

* Die meisten Browser bieten **Zoom** an (`CTRL` + Maus-Scrollrad zum Zoomen, `CTRL` + `0` zum Zurücksetzen)
* Manchmal kommt es vor, dass der Inhalt mehr Platz beansprucht, als der Webbrowser auf einmal anzeigen kann. Dann erscheint rechts ein für Beamer-Anwendungen sehr hässlicher **Scrollbalken**. Webkit-Browsern (z.B. [Chrome](https://www.google.de/chrome/browser/desktop/)) bieten uns Entwicklern die Möglichkeit, diese Scrollbalken auszublenden. Andere Browser (Firefox, Opera, Internet Explorer) bieten leider keine solche Möglichkeit. Also: **Chrome verwenden**!